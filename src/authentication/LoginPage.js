import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Loader from "react-spinners/ScaleLoader";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LoginPage = () => {
  useGSAP(()=>{
    gsap.fromTo('.login-form', {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      delay: 0.15,
      stagger: 0.1
    })
  }, [])


  const {loginUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };


  return (
    <div>
      <>
        <form className='login-form' onSubmit={handleSubmit}> 
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

          {
            loading ?
            <Loader
                color={"green"}
                loading={loading}
                size={30}
                aria-label="Loading Spinner"
            />
            :
            <button
                className="btn form-btn"
                type="submit">
                Login
            </button>
          }

        </form>
      </>
    </div>
  )
}

export default LoginPage