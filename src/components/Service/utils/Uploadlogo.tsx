import React, {useState, useCallback} from "react";
import { useDropzone } from "react-dropzone";

interface Props {}

const Uploadlogo: React.FC<Props> = () => {
  const [logo, setLogo] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);

  //upload to cloudinary
  const onDrop = useCallback((acceptedFiles) => {
    const url = 'https://api.cloudinary.com/v1_1/swizce/image/upload';

    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData();
      formData.append('file', acceptedFile)
      formData.append('upload_preset', 'swizce-service-logos')

      const response = await fetch(url, {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      setLogo(data)
      setLogoUrl(data.secure_url)
    });
  },[]);

  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop
  });
  //pass url to main create service component


  return (
    <div className="__service__profile__upload">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} value={logoUrl}/>
          <button type="button" onClick={open}>
            {
              !logoUrl ? (
                <img
                src="https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
                alt=""
              />
              ):(
                <img
                src={logoUrl}
                alt=""
              />
              )
            }
          </button>
      </div>
    </div>
  );
};

export default Uploadlogo;
