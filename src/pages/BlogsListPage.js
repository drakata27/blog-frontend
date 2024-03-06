import React, {useState, useEffect} from 'react'
import BlogItem from '../components/BlogItem'

import Loader from "react-spinners/PacmanLoader";

const BlogsListPage = () => {
    let [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        getBlogs()
    }, [])

    let getBlogs = async ()=> {
        let response = await fetch('https://blog-backend-drab.vercel.app/api/blogs/')
        let data = await response.json()
        setBlogs(data)
        setLoading(false)
    }

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