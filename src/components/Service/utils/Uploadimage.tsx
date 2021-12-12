import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';

interface Props {

}

const Uploadimage: React.FC<Props> = ({}) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  //upload to cloudinary
  const onDrop = useCallback((acceptedFiles) => {
    const url = 'https://api.cloudinary.com/v1_1/swizce/image/upload';
    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData();
      formData.append('file', acceptedFile)
      formData.append('upload_preset', 'swizce-service')

      const response = await fetch(url, {
        method: "POST",
        body: formData
      })
      //return file as url
      const data = await response.json();
      setImage(data)
      setUrl(data.secure_url)
    });
  },[]);

  const {getRootProps, getInputProps, open} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop
  });

  return (
    <div className="__service__cover__upload">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <button type="button" onClick={open}>
          {
            !url ? (
              <img src="https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png" alt="" />
            ) : (
              <img src={url} alt="" />
            )
          }          
        </button>
      </div>                
    </div>
  )
}

export default Uploadimage;
