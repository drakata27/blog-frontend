import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import modules from '../utils/quilModules'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Loader from "react-spinners/GridLoader";
const swal = require('sweetalert2')

const CreateBlog = () => {
    const [cover, setCover] = useState()
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(false)

    const [blog, setBlog] = useState({
        title: '',
        subtitle: '',
        cover: cover,
        body: '',
        is_draft: checked
    });


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

    const createBlog = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('title', blog.title);
            formData.append('subtitle', blog.subtitle);
            formData.append('body', blog.body);
            formData.append('is_draft', blog.is_draft);
            if (cover) {
                formData.append('cover', cover);
            } else {
                formData.append('cover', '/covers/default.jpg');
            }
            
            // const url = `https://blog-backend-drab.vercel.app/api/blogs/`
            const url = `http://127.0.0.1:8000/api/blogs/`
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('Error creating blog. Server responded with:', response.status, response.statusText);
                
                swal.fire({
                    title: 'Error: ' + response.statusText,
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
                title: 'Blog created successfully!',
                icon: 'success',
                toast: 'true',
                timer: 5000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            })

            setLoading(false)
            navigate('/')
        } catch (error) {
            console.error('Error creating blog:', error);
            swal.fire({
                title: 'Error creating blog: ' + error,
                icon: 'error',
                toast: 'true',
                timer: 5000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            })
        }
    };

    
    let handleSubmit = ()=> {
        if (blog.title.trim() !== '' &&
            blog.subtitle.trim() !== '') {
            createBlog();
        } else {
            swal.fire({
                title: 'Blog contents cannot be empty',
                icon: 'error',
                toast: 'true',
                timer: 5000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            })
        }        
    }


    const [inputKey, setInputKey] = useState(Date.now()); 
    
    const clearImage = () => {
        setInputKey(Date.now());
        swal.fire({
            title: 'Image was cleared',
            icon: 'success',
            toast: 'true',
            timer: 5000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false
        })
    }
        

    return (
        <div className=''>
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
                          onChange={handleInputChange}
                      />
                      <input
                          className='subtitle-input'
                          type='text'
                          name='subtitle'
                          placeholder='Subtitle...'
                          value={blog.subtitle}
                          onChange={handleInputChange}
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
                      
                      <div className='cover-container '>
                          <h2>Cover</h2>
                          <input 
                              type='file' 
                              accept='image/*' 
                              key={inputKey} 
                              value={undefined} 
                              onChange={(e)=> setCover(e.target.files[0])}/>
                          <button onClick={clearImage} className='remove-btn'>Remove</button>
                      </div>
                      
                      <ReactQuill 
                          className='editor-input'
                          modules={modules}
                          theme="snow" 
                          value={blog.body} 
                          placeholder='Type here...'
                          onChange={body => handleInputChange({ target: { value: body, name: 'body' } })}
                      />
          
                      <button className='upload-btn' onClick={handleSubmit}>Publish</button>
                  </div>
            }
        </div>
    );
};

export default CreateBlog;
