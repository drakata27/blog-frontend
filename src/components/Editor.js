import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import modules from '../utils/quilModules'

const Editor = () => {
    const [value, setValue] = useState('');
    
  return (
    <div className='editor'>
        <ReactQuill 
            className='editor-input'
            modules={modules}
            theme="snow" 
            value={value} 
            onChange={setValue}
        />
    </div>
  )
}

export default Editor