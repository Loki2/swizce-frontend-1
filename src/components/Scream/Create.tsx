import React, { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Modal from "../Modal/Modal";
import { CreateScreamArgs, Scream } from "../../types";

import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { AuthContext } from "../../context/AuthContext";

import { CREATE_SCREAM, QUERY_SCREAMS } from "../../graphql/Scream";
import Loader from "react-loader-spinner";
import { UploadItems } from "./components/Upload";
// import { UploadItems } from "./uploads/UploadItem";

interface Props {
  userId: string;
}

export interface UploadableFile {
  file: File;
  errors: FileError[];
  url?: string;
}

//Main Create Scream function
const Create: React.FC<Props> = () => {
  const { handleAuthAction, loggedInUser } = useContext(AuthContext);

  const router = useRouter();

  const [files, setFiles] = useState<UploadableFile[]>([]);

  //Create form request
  const { register, errors, handleSubmit } = useForm<CreateScreamArgs>();

  //create backend function
  const [createScream, { loading, error }] = useMutation<
    { createScream: Scream },
    CreateScreamArgs
  >(CREATE_SCREAM);

  //Select files and uplaod to cloud storage
  const onDrop = useCallback((accFile: File[], rejFile: FileRejection[]) => {
    const mappedAcc = accFile.map((file) => ({ file, errors: [] }));

    setFiles((curr) => [...curr, ...mappedAcc, ...rejFile]);
  }, []);

  function onUploaded(file: File, url: string) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  }

  //Create on delete file function
  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false, //Disable multiple files select to upload many files[]
    onDrop,
  });

  // console.log("files", files)

  const submitCreateScream = handleSubmit(async ({ description }) => {
    try {
      if (files) {
        const results = await createScream({
          variables: { description, imageUrl: files[0].url },
          refetchQueries: [{ query: QUERY_SCREAMS }],
        });

        if (results?.data?.createScream) {
          const { createScream } = results.data;

          if (createScream) {
            handleAuthAction("close");

            //push user to their dashboard page
            router.push("/Screams");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Modal>
      <form onClick={submitCreateScream}>
        <div className="create__header">
          <h4>Create Scream</h4>
        </div>
        {/* Retrived Logged In User */}
        <div className="create__nav">
          <div className="__profile">
            {!loggedInUser.images ? (
              <img
                src="https://res.cloudinary.com/swizce/image/upload/v1636603317/Swizce/icons/no-image_md4u0i.png"
                alt=""
              />
            ) : (
              <img src={loggedInUser.images} alt="" />
            )}
          </div>
          <span>@{loggedInUser.username}</span>
          <div className="scream__status">status:</div>
          <div className="tags__list">
            <span>@feeling, activity, question...? (Category Tags)</span>
          </div>
        </div>
        {errors.description && (
          <span style={styles.errorMessage} role="alert">
            {errors.description.message}
          </span>
        )}
        <div className="create__content">
          <textarea
            placeholder="What is your mind scream...?"
            name="description"
            cols={70}
            rows={7}
            maxLength={515}
            ref={register({
              required: "Scream Description required ...!",
              maxLength: {
                value: 515,
                message:
                  "Scream Description must not be more than 515 characters",
              },
            })}
          ></textarea>
          <div className="uploader__media">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              {files.map((fileWrapper, idx) => (
                <UploadItems
                  onDelete={onDelete}
                  onUploaded={onUploaded}
                  key={idx}
                  file={fileWrapper.file}
                />
              ))}
            </div>
            <div className="addmore__actions">
              <button type="button" onClick={open}>
                <i className="ti-image" />
              </button>
              <button type="button">
                <i className="ti-music" />
              </button>
              <button type="button">
                <i className=" ti-location-arrow" />
              </button>
              <button type="button">
                <i className="ti-rss-alt" />
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="create__footer">
          <button
            disabled={loading}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
            type="submit"
          >
            {loading ? (
              <Loader
                type="Oval"
                color="white"
                height={30}
                width={30}
                timeout={30000}
              />
            ) : (
              "Spread"
            )}
          </button>
          {error && (
            <div>
              {error.graphQLErrors[0]?.message || (
                <p style={styles.errorMessage}>
                  Sorry something went wrong...!
                </p>
              )}
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
};

const styles = {
  errorMessage: {
    margin: 0,
    padding: 5,
    color: "red",
    fontSize: ".7rem",
  },
};

export default Create;
