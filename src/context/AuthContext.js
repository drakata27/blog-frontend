import {createContext, useState, useEffect} from 'react'
import {jwtDecode} from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
const swal = require('sweetalert2')

const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({ children }) => {
    
    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem('authTokens')) 
            : null 
    )

    const [user, setUser] = useState(()=> 
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    )

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const loginUser = async (email, password) => {
        const response = await fetch('https://blog-backend-drab.vercel.app/api/token/', {
            method : 'POST',
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({email, password})
        })

        const data = await response.json()
        console.log('data', data);

        if (response.status===200){
            console.log('Logged in');
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            navigate('/')
            swal.fire({
                title: 'You have been logged in',
                icon: 'success',
                toast: 'true',
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            })
        } else {
            console.log('Server issue: '+ response.status);
            swal.fire({
                title: 'Email or Password is wrong',
                icon: 'error',
                toast: 'true',
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            })
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate('/')
        swal.fire({
            title: 'You have been logged out',
            icon: 'success',
            toast: 'true',
            timer: 2000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false
        })
    }

    const contextData = {
        user,
        setUser,
        authTokens,
        loginUser,
        logoutUser,
    }

    useEffect(()=> {
        if(authTokens){
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}