import React, {useState, useEffect} from 'react'
import BlogItem from '../components/BlogItem'

import Loader from "react-spinners/PacmanLoader";

const BlogsListPage = () => {
    let [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const url = 'https://blog-backend-drab.vercel.app/api/blogs/'
    // const url = 'http://127.0.0.1:8000/api/blogs/' Testing
    const token = localStorage.getItem("authTokens")
    const [clicked, setClicked] = useState(true)



    useEffect(()=>{
        setLoading(true)
        let getBlogs = async ()=> {
            let response = await fetch(url)
            let data = await response.json()
    
            if (token === null || !clicked) {
                setBlogs(data.filter(blog => !blog.is_draft));
            } else {
                setBlogs(data)
                setClicked(true)
            }
    
            setLoading(false)
        }
        getBlogs()
    }, [token, clicked])

    const handlePreviewClick = () => {
        setClicked(prevState => !prevState);
    };

  return (
    <div className='blogs-list-container'>
        {
            token != null ?
            clicked === true ?
                <button 
                style={{backgroundColor : "red"}} 
                className='anonymuous-preveiw-btn nav-menu-list'
                onClick={handlePreviewClick}>
                <span class="material-symbols-outlined">
                    domino_mask
                </span> OFF
                </button> : 
                <button
                style={{backgroundColor : "green"}} 
                className='anonymuous-preveiw-btn nav-menu-list'
                onClick={handlePreviewClick}>
                <span class="material-symbols-outlined">
                    domino_mask
                </span> ON
                </button> :
            <div></div>

        }
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