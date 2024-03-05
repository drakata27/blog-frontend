import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
  const {loginUser} = useContext(AuthContext)

  const handleSubmit = (e) => {
     e.preventDefault()
     const email = e.target.email.value
     const password = e.target.password.value
     email.length > 0 && loginUser(email, password)
  }


  return (
    <div>
      <>
        <form onSubmit={handleSubmit}> 
        <div className="input-container">
            <label 
                className="email-label" 
                htmlFor="form2Example17">
                Email address
            </label>
            <input
                name='email'
                type="email"
                id="form2Example17"
                className="email-input"
            />

        </div>

        <div className="input-container">
            <label className="password-label" htmlFor="form2Example27">
                Password
            </label>
            <input
                name='password'
                type="password"
                id="form2Example27"
                className=""
            />
            </div>


            <button
                className="btn form-btn"
                type="submit"
            >
                Login
            </button>
        </form>
      </>
    </div>
  )
}

export default LoginPage