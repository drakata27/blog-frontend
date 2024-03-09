import React, { useRef, useState } from 'react'
import {Link} from 'react-router-dom'

import GitHub from '../assets/github.png'
import LinkedIn from '../assets/linkedin.png'
import Mail from '../assets/mail.png'

import emailjs from '@emailjs/browser';

import Loader from "react-spinners/ScaleLoader";

const Contact = () => {
  const form = useRef();
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const serviceId = process.env.REACT_APP_SERVICE_ID;
  const templateId = process.env.REACT_APP_TEMPLATE_ID;

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const sendEmail = (e) => {
    setLoading(true)
    e.preventDefault();
    const { user_name, user_email, message } = e.target.elements;
    if (!user_name.value || !user_email.value || !message.value) {
      setErrorMessage('Please fill out all fields.');
      setLoading(false)
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          e.target.reset()
          setErrorMessage('');
          setLoading(false)
          alert('Message sent successfully!')
        },
        (error) => {
          console.log('FAILED...', error.text);
          setErrorMessage('Failed to send email');
          setLoading(false)
        },
      );
  };

  return (
    <div className='contact-container-main'>
    <h1>Contact</h1>
    <div className='contact-container'>

      <div className='contact-links'>
        <div className='links'>
          <Link to='https://www.linkedin.com/in/aleksandar-drakaliyski/' target="_blank"><img className='social-icon' src={LinkedIn} alt='linkedin'/></Link>
          <Link to='https://github.com/drakata27' target="_blank"><img className='social-icon' src={GitHub} alt='github'/></Link>
          <Link to='mailto:aleks.draka02@gmail.com' target="_blank"><img className='social-icon' src={Mail} alt='mail'/></Link>
        </div>

        <div className='links-text'>
          <p><Link to='https://www.linkedin.com/in/aleksandar-drakaliyski/' target="_blank">Aleksandar Drakaliyski</Link></p>
          <p><Link to='https://github.com/drakata27' target="_blank">drakata27</Link></p>
          <p><Link to='mailto:aleks.draka02@gmail.com' target="_blank">aleks.draka02@gmail.com</Link></p>
        </div>
      </div>

      <div className='contact-form-container'>
        <h2>Leave a message!</h2>
      <form className='contact-form' ref={form} onSubmit={sendEmail}>
          <input type="text" name="user_name"  placeholder='Name'/>
          <input type="email" name="user_email" placeholder='Email'/>
          <textarea name="message" placeholder='Your message...'/>

        {
          loading ?
          <Loader
                color={"green"}
                loading={loading}
                size={30}
                aria-label="Loading Spinner"
            />
            :
            <button className='btn' type="submit">Send</button>
        }

      </form>
      {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
    </div>
  )
}

export default Contact