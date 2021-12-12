import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { FileHeader } from "./Ondelfile";

export interface UploadItemsProps {
  file: File;
  onDelete: (file: File) => void;
  onUploaded: (file: File, url: string)  => void
}

export function UploadItems({ file, onDelete, onUploaded }: UploadItemsProps) {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);


  useEffect(() => {
    async function upload() {
      const url = await UploadFile(file, setProgress);
      onUploaded(file, url);
      setUrl(url)
    }

    upload();
  }, []);

  console.log("url uploaded:", url)

  return (
    <div className="grid__upload__item">
      <Loader
        type="Oval"
        color="teal"
        height={32}
        width={32}
        timeout={progress}
      />
      <img
        src={url}
        alt=""
        width="85px"
        height="85px"
      />
      <FileHeader file={file} onDelete={onDelete} />
    </div>
  );
}

function UploadFile(file: File, onProgress: (percentage: number) => void) {
  const url = "https://api.cloudinary.com/v1_1/swizce/image/upload";
  const key = "swizce-scream";
  return new Promise<string>((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp.secure_url);
    };

    xhr.onerror = (evt) => rej(evt);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", key);

    xhr.send(formData);
  });
}
