import React, {useState, useEffect} from 'react'
import BlogItem from '../components/BlogItem'

const BlogsListPage = () => {
    let [blogs, setBlogs] = useState([])

    useEffect(()=>{
        getBlogs()
    }, [])

    let getBlogs = async ()=> {
        let response = await fetch('/api/blogs/')
        let data = await response.json()
        setBlogs(data)
    }

  return (
    <div className='blogs-list-container'>
        <h1>Latest</h1>
        <div className='blogs-list'>
            {blogs.map((blog, index) => (
                <BlogItem key={index} blog={blog} />
            ))}
        </div>
    </div>
  )
}

export default BlogsListPage