/* eslint-disable no-unused-vars */
import {useContext} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

import {jwtDecode} from 'jwt-decode'
import AuthContext from '../context/AuthContext'

const Header = () => {
  const {user, logoutUser} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  if (token) {
    const decoded = jwtDecode(token)
    var user_id = decoded.user_id
  }

  return (
    <div className='app-header'> 
        <div className='logo'>
            <a href="/">
              <img src={Logo} alt='logo' />
            </a>
        </div>
        
        <div className="buttons">
        {token !== null && 
        <>
        <div className="horizontal-container">
          <p className='username'>Hello, {user.username}</p>
          <button className='new-blog-btn'>
            <Link to="/blog/new/">
              <span className="material-symbols-outlined">edit_square</span>
            </Link>
          </button>

          <button 
            className='auth-btn'
            onClick={logoutUser}>
            Sign Out
          </button>
        </div>
        </>
        }
        </div>
    </div>
  )
}

export default Header