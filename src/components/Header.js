/* eslint-disable no-unused-vars */
import {useContext} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo512.png'

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
        <div className="links-container">
          <div className="buttons">
          {token !== null && 
          <>
          <div className="horizontal-container">
            <p className='username'>{user.username}</p>
            <button className='new-blog-btn'>
              <Link to="/blog/new/">
                <span className="material-symbols-outlined">edit_square</span>
              </Link>
            </button>

            <button 
              className='auth-btn sign-out-btn'
              onClick={logoutUser}>
              Sign Out
            </button>
          </div>
          </>
          }
          </div>
          <Link className='link' to='/contact'>Contact</Link>
        </div>
    </div>
  )
}

export default Header