import React from 'react'

import GitHub from '../assets/github.png'
import LinkedIn from '../assets/linkedin.png'
import Mail from '../assets/mail.png'
import Web from '../assets/web.png'

import {Link} from 'react-router-dom'

const Footer = () => {
  let currentYear = new Date().getFullYear();
  return (
    <div className='footer'>
      <div className="vertical-container">
        <p>Copyright © {currentYear} Aleksandar Drakaliyski</p>
        <div className='socials-footer'>
          <Link to='https://www.linkedin.com/in/aleksandar-drakaliyski/' target="_blank"><img className='social-icon' src={LinkedIn} alt='linkedin'/></Link>
          <Link to='https://github.com/drakata27' target="_blank"><img className='social-icon' src={GitHub} alt='github'/></Link>
          <Link to='mailto:aleks.draka02@gmail.com' target="_blank"><img className='social-icon' src={Mail} alt='mail'/></Link>
          <Link to='https://www.aleksdraka.online/' target="_blank"><img className='social-icon' src={Web} alt='website'/></Link>
        </div>
      </div>
    </div>
  )
}

export default Footer