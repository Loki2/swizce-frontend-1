import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

const s3Client = new AWS.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION
})

interface FileItemProps {
  file: File;
}

export function AwsUpload({file}: FileItemProps) {
  const [progress , setProgress] = useState(0);

  // console.log('file selected',file);

  useEffect(() => {
    async function upload() {
      // const url = await UploadFile(file, setProgress);
      const params = {
        Acl: 'public-read',
        Bucket: process.env.BUCKET,
        Body: file,
        Key: file.name 
      }

      console.log('files selected: ', file)

      const result = await s3Client.upload(params).promise();

      if(!result){
        console.log('can not upload file to aws s3 bucket')
      }

      return result;
    }

    upload();
  }, []);

  return <div className="list__uploaded__items">
      { progress }
  </div>  
}