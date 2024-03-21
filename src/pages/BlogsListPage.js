import React, {useState, useEffect} from 'react'
import BlogItem from '../components/BlogItem'

import Loader from "react-spinners/PacmanLoader";

const BlogsListPage = () => {
    let [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const url = 'https://blog-backend-drab.vercel.app/api/blogs/'
    // const url = 'http://127.0.0.1:8000/api/blogs/' Testing
    const token = localStorage.getItem("authTokens")

    useEffect(()=>{
        setLoading(true)
        let getBlogs = async ()=> {
            let response = await fetch(url)
            let data = await response.json()
    
            if (token === null) {
                setBlogs(data.filter(blog => !blog.is_draft));
            } else {
                setBlogs(data)
            }
    
            setLoading(false)
        }
        getBlogs()
    }, [token])

  return (
    <div className='blogs-list-container'>
        <h1>Latest</h1>
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
        <div className='blogs-list'>
            {blogs.map((blog, index) => (
                <BlogItem key={index} blog={blog} />
            ))}
        </div>
        }
    </div>
  )
}

export default BlogsListPage