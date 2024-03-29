import React from 'react'
import { Link } from 'react-router-dom'
import Placeholder from '../assets/placeholder.jpg'
import {getTime} from '../utils/getTime'

const BlogItem = ({blog}) => {
  console.log(getTime(blog.updated) === getTime(blog.created));
  return (
    <Link to={`/blog/${blog.id}`}>
        <div className="blog-item">

          <div>
            {blog.cover ? (
              <img className='cover' src={blog.cover}  alt='blog' />
            ) : (
              <img className='cover' src={Placeholder} alt='blog' />
            )}
          </div>

          <div>
            <h1 className='blog-title'>{blog.title}</h1>
            <h2 className='blog-subtitle'><span>{blog.subtitle}</span></h2>
            
            <div className="horizontal-container">

              { 
                getTime(blog.updated) > getTime(blog.created) ? 
                <>
                  <p className='published'>
                    Published <span>{getTime(blog.created)}</span>
                  </p> 
                  <p className='published'>
                    Updated <span>{getTime(blog.updated)}</span>
                  </p>
                </>
                :
                <p className='published'>
                  Published <span>{getTime(blog.created)}</span>
                </p>
              }
              {
                blog.is_draft ?
                <p>
                  <span class="material-symbols-outlined"> 
                    draft
                  </span> 
                </p> : <></>
              }
            </div>
          </div>
          <hr />
        </div>
      </Link>
  )
}

export default BlogItem