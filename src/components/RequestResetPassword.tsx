import React, { useContext } from "react";
import { useMutation } from '@apollo/client';
import Loader from "react-loader-spinner";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import Modal from "./Modal/Modal";
import { AuthContext } from "../context/AuthContext";

import { REQUEST_TO_RESET_PASSWORD } from "../graphql/User";

interface Props {}

const RequestResetPassword: React.FC<Props> = () => {
  const { handleAuthAction } = useContext(AuthContext);

  const { register, errors, handleSubmit } = useForm<{ email: string }>();

  const router = useRouter();

  const [requestResetPassword, {data, loading, error}] = useMutation<{ 
        requestResetPassword: {message: string }}, 
        { email: string }>(REQUEST_TO_RESET_PASSWORD);

  const handleRequestResetPassword = handleSubmit( async ({ email }) => {
      await requestResetPassword({ variables: { email }})

      router.push('/')

  });

  return (
    <Modal>
      <div className="request__container">
        <div className="__header">
          <h2>Enter email to get link</h2>
        </div>

        <form onSubmit={handleRequestResetPassword}>
          <div className="form__control">
            <input
              type="email"
              name="email"
              placeholder="Enter Email *"
              autoComplete="new-password"
              ref={register({
                required: "Email is required...!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email is incorrect format...",
                },
              })}
            />
            {errors.email && (
              <span style={styles.errorMessage} role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form__control">
            <button disabled={loading} style={{ cursor: loading ? 'not-allowed' : 'pointer'}} type="submit">
              {
                loading ? (<Loader type='Oval' color='white' height={30} width={30} timeout={30000}/>) : (
                  <img
                    src="https://res.cloudinary.com/swizce/image/upload/v1620702241/Swizce/images/login_qgoycx.png"
                    width="32px"
                    height="32px"
                    color="white"
                  />
                )
              }
            </button>
            {
              error && <div>{error.graphQLErrors[0]?.message || <p style={styles.errorMessage}>Sorry something went wrong...!</p>}</div>
            }
          </div>
          {
            data && <div className="p__forget">
              <p>{data.requestResetPassword?.message}</p>
            </div>
          }
          <div className="form__control">
            <a>
              Don't have an account?{" "}
              <span onClick={() => handleAuthAction("signup")}>
                Get Invite!
              </span>
            </a>
          </div>
        </form>
      </div>
    </Modal>
  );
};

//Styling page over here
const styles = {
  errorMessage: {
    margin: 0,
    padding: 0,
    color: "red",
    fontSize: ".7rem",
  },
};

export default RequestResetPassword;
