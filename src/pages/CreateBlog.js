import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import modules from '../utils/quilModules'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
    const [cover, setCover] = useState()

    const [blog, setBlog] = useState({
        title: '',
        subtitle: '',
        cover: cover,
        body: '',
    });


    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlog({ ...blog, [name]: value });
    };

    const createBlog = async () => {
        try {
            const formData = new FormData();
            formData.append('title', blog.title);
            formData.append('subtitle', blog.subtitle);
            formData.append('body', blog.body);
            if (cover) {
                formData.append('cover', cover);
            } else {
                formData.append('cover', '/covers/default.jpg');
            }

            const response = await fetch(`/api/blogs/`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('Error creating blog. Server responded with:', response.status, response.statusText);
                return;
            }

            const data = await response.json();
            console.log('Blog created successfully:', data);
            navigate('/')
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    
    let handleSubmit = ()=> {
        console.log('body', blog);
        if (blog.title.trim() !== '' &&
            blog.subtitle.trim() !== '') {
            createBlog();
        } else {
            alert('Blog contents cannot be empty');
        }        
    }


    const [inputKey, setInputKey] = useState(Date.now()); 
    
    const clearImage = () => {
        setInputKey(Date.now());
    }
        

    return (
        <div className='blog-form'>
            <input
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
            
            <div className='cover-container '>
                <h2>Upload Cover</h2>
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

            <button onClick={handleSubmit}>Publish</button>
        </div>
    );
};

export default CreateBlog;
