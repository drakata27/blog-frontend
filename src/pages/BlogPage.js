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

const BlogPage = () => {
    let {id} = useParams();

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
        const getBlog = async () => {
          if (id==='new') return

          let response = await fetch(`/api/blogs/${id}/`);
          let data = await response.json();
          setBlog(data);
        };
        getBlog();
      }, [id]);

      let deleteBlog = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this blog?");

        if (isConfirmed) {
          try {
            const response = await fetch(`/api/blogs/${id}/`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              }
            })
  
            if (!response.ok) {
              console.error('Error deleting blog. Server responded with:', response.status, response.statusText);
              return;
            }
  
            const data = await response.json();
            console.log('Blog deleted successfully:', data);
            navigate('/')
          } catch(error) {
            console.error('Error deleting blog:', error);
          }
        } 
      }

  return (
    <div className='blog-page'>
        <h1>{blog?.title}</h1>
        <h2>{blog?.subtitle}</h2>
        
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
        dangerouslySetInnerHTML={{__html:blog?.body}}></div>

        {/* <div className='socials'>
          <Link to='https://www.linkedin.com/in/aleksandar-drakaliyski/'><img className='social-icon' src={LinkedIn} alt='linkedin'/></Link>
          <Link to='https://github.com/drakata27'><img className='social-icon' src={GitHub} alt='github'/></Link>
        </div> */}
    </div>
  )
}

export default BlogPage


