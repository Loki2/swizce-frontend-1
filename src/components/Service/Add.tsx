import React, { useContext, useState, useCallback} from 'react'
import CreateServiceModal from '../Modal/CreateService';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from 'next/router';
import Loader from "react-loader-spinner";
import { CREATE_SERVICE, QUERY_SERVICE } from '../../graphql/Service';
import { useDropzone } from 'react-dropzone';
import { CreateServiceArg, Service } from '../../types';
import Uploadlogo from './utils/Uploadlogo';
import { FileError } from "react-dropzone";

interface Props {
  userId: string
}

export interface UploadImageProp {
  file: File;
  errors: FileError[];
  logo: string;
}



const AddService: React.FC<Props>  = () => {
  const { handleAuthAction } = useContext(AuthContext);
  const { register, errors, handleSubmit } = useForm<CreateServiceArg>();
  const [image, setImage] = useState(null);


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
      setImage(data);
    });
  },[]);


  const {getRootProps, getInputProps, open} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop
  });

  

  const [createService, {loading, error}] = useMutation<{ createService: Service}, CreateServiceArg>(CREATE_SERVICE);
  
  const router = useRouter();

  //submit function to database
  const submitCreateService = handleSubmit(async ({ name, description, contact, address, tags, }) => {
    try {
      const result = await createService({ variables: {name, description, contact, address, tags, imageUrl: image.secure_url,}, refetchQueries: [{ query: QUERY_SERVICE}]});

      // console.log("result: ", result)
      if(result.data.createService){
        const {createService} = result.data;

        if(createService) {
          handleAuthAction('close')

          router.push('/Services')
        }
      }
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <CreateServiceModal>
      <form onClick={submitCreateService}>
        <div className="create__service">
          <div className="create__service__header">
            <h4>Create Service</h4>
          </div>
          <div className="create__service__body">

          <div className="__service__cover__upload">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
                  <button type="button" onClick={open}>
                    {
                      !image ? (
                        <img src="https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png" alt="" />
                      ) : (
                        <img src={image.secure_url} alt="" />
                      )
                    }          
                  </button>
                </div>                
              </div>
              <div className="create__service__contents">
                <Uploadlogo />                         
                <div className="__service__content__fileds">
                  <div className="service__form__control">
                    <h5>Name:</h5>
                    <input type="text"                    
                      placeholder="Enter Service name..."
                      name="name"
                      ref={register({
                        required: "Name filed is required...!"
                      })}
                    />
                  </div>
                  {errors.name && <span style={styles.errorMessage} role="alert">{errors.name.message}</span>}

                  <div className="service__form__control">
                    <h5>Description:</h5>
                    <textarea
                      placeholder="Provide your brand service...?" 
                      name="description"
                      ref={register({
                        required: 'Description field also require...!',
                        maxLength: {
                          value: 5000,
                          message: "Scream Description must not be more than 5000 characters",
                        },
                      })}
                      cols={30} rows={5}></textarea>
                  </div>
                  {errors.description && <span style={styles.errorMessage} role="alert">{errors.description.message}</span>}
                  <div className="service__form__control">
                    <h5>Contact:</h5>
                    <input type="text" 
                        placeholder="Enter Service Contact..."
                        name="contact"
                        ref={register({
                          required:"Contact is require field...!"
                        })}
                        />
                  </div>
                  {errors.contact && <span style={styles.errorMessage} role="alert">{errors.contact.message}</span>}
                  <div className="service__form__control">
                    <h5>Tags:</h5>
                    <input type="text" 
                      placeholder="Service Tags..."
                      name="tags"
                      ref={register({
                        required: "Tags is require field...!"
                      })}
                    />
                  </div>
                  {errors.tags && <span style={styles.errorMessage} role="alert">{errors.tags.message}</span>}
                  <div className="service__form__control">
                    <h5>Address:</h5>
                    <input type="text" 
                        placeholder="Select address brand service..."
                        name="address"
                        ref={register({
                          required:"Address is require field...!"
                        })}
                        />
                  </div>
                  {errors.address && <span style={styles.errorMessage} role="alert">{errors.address.message}</span>}
                </div>
              </div>
              
              <div className="create__bottom__acctions">
                <button disabled={loading} style={{cursor: loading ? 'not-allowed' : 'pointer'}} type="submit">
                  { loading ? <Loader type='Oval' color='white' height={30} width={30} timeout={30000} /> : 'Submit'}
                </button>
                {
                  error && <div>{error.graphQLErrors[0]?.message || <p style={styles.errorMessage}>Sorry something went wrong...!</p>}</div>
                }
              </div>
          </div>
        </div>
      </form>
    </CreateServiceModal>
  )
}


const styles = {
  errorMessage: {
    margin: 0, 
    padding: 5, 
    color: 'red', 
    fontSize: '.7rem'
  }
}

export default AddService;  