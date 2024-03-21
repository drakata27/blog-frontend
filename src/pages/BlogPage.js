/* eslint-disable no-unused-vars */
import {React, useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import Paceholder from '../assets/placeholder.jpg'
import Profile from '../assets/profile-photo.jpg'
import GitHub from '../assets/github.png'
import LinkedIn from '../assets/linkedin.png'

import {getTime} from '../utils/getTime'
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'

import Loader from "react-spinners/PacmanLoader";

const swal = require('sweetalert2')

const BlogPage = () => {
    let {id} = useParams();
    const [loading, setLoading] = useState(false)

    const [blog, setBlog] = useState({
      title: '',
      subtitle: '',
      body: '',
  });

  const token = localStorage.getItem("authTokens")

  if (token) {
    const decoded = jwtDecode(token)
    var user_id = decoded.user_id
  }

    const navigate = useNavigate();

    useEffect(() => {
      setLoading(true)
        const getBlog = async () => {
          if (id==='new') return

          let response = await fetch(`https://blog-backend-drab.vercel.app/api/blogs/${id}/`);
          let data = await response.json();
          setBlog(data);
          setLoading(false);
        };
        getBlog();
      }, [id]);

      let deleteBlog = async () => {
        setLoading(true)
        const isConfirmed = window.confirm("Are you sure you want to delete this blog?");

        if (isConfirmed) {
          try {
            const response = await fetch(`https://blog-backend-drab.vercel.app/api/blogs/${id}/`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              }
            })
  
            if (!response.ok) {
              console.error('Error deleting blog. Server responded with:', response.status, response.statusText);
              
              swal.fire({
                title: 'Error deleting blog: ' + response.statusText,
                icon: 'error',
                toast: 'true',
                timer: 5000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            })
              
              setLoading(false)
              return;
            }
            
            swal.fire({
              title: 'Blog deleted successfully' ,
              icon: 'success',
              toast: 'true',
              timer: 5000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false
          })

            setLoading(false)
            navigate('/')
          } catch(error) {
            console.error('Error deleting blog:', error);
            swal.fire({
              title: 'Error: ' + error,
              icon: 'error',
              toast: 'true',
              timer: 3000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false
          })
            setLoading(false)
          }
        } 
      }

  return (
    <div className='blog-page'>
      {
        loading ? 
        <div className='loader-container'>
            <Loader
                color={"orange"}
                loading={loading}
                size={90}
                aria-label="Loading Spinner"
            />
          </div>
          :
        <div>
          <h1 className='blog-title'>{blog?.title}</h1>
          <h2 className='blog-subtitle'>{blog?.subtitle}</h2>
          
          <div className='horizontal-container'>
            <div className='author-container'>
              <img src={Profile} alt='author'/>
              <p>Aleksandar Drakaliyski</p>
  
              <div className='socials'>
                <Link to='https://www.linkedin.com/in/aleksandar-drakaliyski/' target="_blank"><img className='social-icon' src={LinkedIn} alt='linkedin'/></Link>
                <Link to='https://github.com/drakata27' target="_blank"><img className='social-icon' src={GitHub} alt='github'/></Link>
              </div>
  
            </div>
          </div>
  
          <div className='horizontal-container'>
            <p>{getTime(blog?.created)}</p>
  
          {token !== null &&
            <>
              <div>
                {
                  blog.is_draft ?
                    <p>
                      <span class="material-symbols-outlined"> 
                        draft
                      </span> 
                    </p> :
                    <p></p>
                }

                <button className='edit-btn'>
                  <Link to={`/blog/${id}/edit`}>
                  <span className="material-symbols-outlined">
                    edit
                  </span>
                  </Link>
                </button>
  
                <button 
                  className='delete-btn'
                  onClick={deleteBlog}>
                    <span className="material-symbols-outlined">
                      delete
                    </span>
                </button>
              </div>
            </>
          }
  
          </div>
  
          <div className='img-container'>
            {blog.cover ? (
                <img className='cover' src={blog.cover}  alt='blog' />
              ) : (
                <img className='cover' src={Paceholder} alt='blog' />
              )}
          </div>
  
          <div 
          className='ql-editor' 
          style={{ border: 'none' }}
          dangerouslySetInnerHTML={{__html:blog?.body}}></div>
        </div>
      }
    </div>
  )
}

export default BlogPage


