import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import modules from '../utils/quilModules'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Loader from "react-spinners/GridLoader";

const swal = require('sweetalert2')

const UpdateBlog = () => {
  let {id} = useParams();
  const [loading, setLoading] = useState(false)
  const [cover, setCover] = useState()
  const [checked, setChecked] = useState(false)

  const [blog, setBlog] = useState({
    title: '',
    subtitle: '',
    cover: cover,
    body: '',
    is_draft: checked
  });

  const url = `https://blog-backend-drab.vercel.app/api/blogs/${id}/edit`
  // const url = `http://127.0.0.1:8000/api/blogs/${id}/edit`

  useEffect(() => {
    setLoading(true)
    const fetchBlog = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error('Error fetching blog data:', response.status, response.statusText);
          
          swal.fire({
            title: 'Error fetching data: ' + response.statusText,
            icon: 'error',
            toast: 'true',
            timer: 5000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false
        })
          
          return;
        }
        const data = await response.json();
        setBlog(data);
        setChecked(data.is_draft);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching blog data:', error);

        swal.fire({
          title: 'Error fetching data: ' + error,
          icon: 'error',
          toast: 'true',
          timer: 5000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false
      })
        setLoading(false)
      }
    };
    fetchBlog();
  }, [id, url]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setBlog({ ...blog, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setChecked(checked);
    setBlog({ ...blog, is_draft: checked });
  };

  const updateBlog = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('subtitle', blog.subtitle);
    formData.append('body', blog.body);
    formData.append('body', blog.body);
    formData.append('is_draft', blog.is_draft);
    if (cover) {
      formData.append('cover', cover);
    } 

    const urlUpdate = `https://blog-backend-drab.vercel.app/api/blogs/${id}/edit`
    // const urlUpdate = `http://127.0.0.1:8000/api/blogs/${id}/edit`
    
    try {
        const response = await fetch(urlUpdate, {
          method: "PUT",
          body: formData
        });

        if (!response.ok) {
            console.error('Error updating blog. Server responded with:', response.status, response.statusText);
            
            swal.fire({
              title: 'Error updating blog: ' + response.statusText,
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

        const data = await response.json();
        setBlog(data)
        console.log('Blog updated successfully:', data);

        swal.fire({
          title: 'Blog updated successfully!',
          icon: 'success',
          toast: 'true',
          timer: 5000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false
      })

        setLoading(false)
        navigate(`/blog/${id}`)
    } catch (error) {
        console.error('Error updating blog:', error);
        swal.fire({
          title: 'Error updating blog: ' + error,
          icon: 'error',
          toast: 'true',
          timer: 5000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false
      })
        setLoading(false)
    }
};

let uploadCover = async () => {
  setLoading(true)
  const formData = new FormData();
  formData.append('cover', cover);

  const urlUpdate = `https://blog-backend-drab.vercel.app/api/blogs/${id}/edit`
  // const urlUpdate = `http://127.0.0.1:8000/api/blogs/${id}/edit`

  const response = await fetch(urlUpdate, {
    method: "PUT",
    body: formData,
  })

  if (cover) {
    const data = await response.json();
    setBlog({ ...blog, cover: data.cover });
  }
  swal.fire({
    title: 'Cover was uploaded',
    icon: 'success',
    toast: 'true',
    timer: 5000,
    position: 'top-right',
    timerProgressBar: true,
    showConfirmButton: false
  })

  setLoading(false)
}

return (
  <div>
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
      <div className='blog-form'>
          <input
              className='title-input'
              type='text'
              name='title'
              placeholder='Title...'
              value={blog.title}
              onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'title' } })}
          />
          <input
              className='subtitle-input'
              type='text'
              name='subtitle'
              placeholder='Subtitle...'
              value={blog.subtitle}
              onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'subtitle' } })}
          />

          <div className="horizontal-container" style={{marginTop: '2rem'}}>
            <input
                style={{marginTop: '0'}}
                type="checkbox"
                checked={checked} 
                onChange={handleCheckboxChange}
            />
            <p>Draft</p>
          </div>

          <div className="cover-preview">
            <img src={blog.cover} alt="cover" />
          </div>

          <div className='cover-container '>
              <h2>Cover</h2>
              <input 
                  type='file' 
                  accept='image/*' 
                  value={undefined} 
                  onChange={(e)=> setCover(e.target.files[0])}/>
              <button onClick={uploadCover} className='upload-btn'>Uplaod</button>
          </div>

          <ReactQuill 
              className='editor-input'
              modules={modules}
              theme="snow" 
              value={blog.body} 
              placeholder='Type here...'
              onChange={body => handleInputChange({ target: { value: body, name: 'body' } })}
          />

          <button className='upload-btn' onClick={updateBlog}>Save</button>
      </div>
    }
  </div>
);
}

export default UpdateBlog