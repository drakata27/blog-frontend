import React, { useRef, useState } from 'react'
import {Link} from 'react-router-dom'

import GitHub from '../assets/github.png'
import LinkedIn from '../assets/linkedin.png'
import Mail from '../assets/mail.png'

import emailjs from '@emailjs/browser';

import Loader from "react-spinners/ScaleLoader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const swal = require('sweetalert2')


const Contact = () => {
  // Animation
  useGSAP(()=>{
    gsap.fromTo('.contact-container-main', {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      delay: 0.2,
      stagger: 0.1
    })
  }, [])


  const form = useRef();
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const serviceId = process.env.REACT_APP_SERVICE_ID;
  const templateId = process.env.REACT_APP_TEMPLATE_ID;

  const [loading, setLoading] = useState(false)

  const sendEmail = (e) => {
    setLoading(true)
    e.preventDefault();
    const { user_name, user_email, message } = e.target.elements;
    if (!user_name.value || !user_email.value || !message.value) {
      swal.fire({
        title: 'Please fill out all of the fields',
        icon: 'error',
        toast: 'true',
        timer: 2000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false
    })
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
          swal.fire({
            title: 'Your message has been sent successfully!',
            icon: 'success',
            toast: 'true',
            timer: 2000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false
        })
          setLoading(false)
        },
        (error) => {
          console.log('FAILED...', error.text);
          swal.fire({
            title: 'Failed to send email',
            icon: 'error',
            toast: 'true',
            timer: 2000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false
        })
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
      </div>
    </div>
    </div>
  )
}

export default Contact