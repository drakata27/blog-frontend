import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import modules from '../utils/quilModules'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateBlog = () => {
  let {id} = useParams();

  const [cover, setCover] = useState()

  const [blog, setBlog] = useState({
    title: '',
    subtitle: '',
    cover: cover,
    body: '',
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}/edit`);
        if (!response.ok) {
          console.error('Error fetching blog data:', response.status, response.statusText);
          return;
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setBlog({ ...blog, [name]: value });
  };

  const updateBlog = async () => {
    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('subtitle', blog.subtitle);
    formData.append('body', blog.body);
    if (cover) {
      formData.append('cover', cover);
    } 

    try {
        const response = await fetch(`/api/blogs/${id}/edit`, {
          method: "PUT",
          body: formData
        });

        if (!response.ok) {
            console.error('Error updating blog. Server responded with:', response.status, response.statusText);
            return;
        }

        const data = await response.json();
        setBlog(data)
        console.log('Blog updated successfully:', data);
        navigate(`/blog/${id}`)
    } catch (error) {
        console.error('Error updating blog:', error);
    }
};

let uploadCover = async () => {
  const formData = new FormData();
  formData.append('cover', cover);

  const response = await fetch(`/api/blogs/${id}/edit`, {
    method: "PUT",
    body: formData,
  })

  if (cover) {
    const data = await response.json();
    setBlog({ ...blog, cover: data.cover });
  }
}

return (
    <div className='blog-form'>
        <input
            type='text'
            name='title'
            placeholder='Title...'
            value={blog.title}
            onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'title' } })}
        />
        <input
            type='text'
            name='subtitle'
            placeholder='Subtitle...'
            value={blog.subtitle}
            onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'subtitle' } })}
        />

        <div className="cover-preview">
          <img src={blog.cover} alt="cover" />
        </div>

        <div className='cover-container '>
            <h2>Upload Cover</h2>
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

        <button className='save-btn' onClick={updateBlog}>Save</button>
    </div>
);
}

export default UpdateBlog