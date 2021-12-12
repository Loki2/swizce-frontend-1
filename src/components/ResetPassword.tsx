import React, {useContext} from "react";
import { useMutation } from '@apollo/client';
import Modal from "./Modal/Modal";
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';

import { RESET_PASSWORD } from '../graphql/User';
import { AuthContext } from "../context/AuthContext";

interface Props {
  token: string;
}

const ResetPassword: React.FC<Props> = ({ token }) => {

  const { handleAuthAction } = useContext(AuthContext);

  const { register, errors, handleSubmit } = useForm<{ password: string, confirmpassword: string }>();

  const [resetPassword, {data, loading, error}] = useMutation<{
      resetPassword : {message: string }}, 
      {token: string; password: string; confirmpassword: string;}>(RESET_PASSWORD);

  const handleSubmitResetPassword = handleSubmit( async ({ password, confirmpassword }) => {
      await resetPassword({ variables: {token, password, confirmpassword}})
  })


  return (
    <Modal>
      <div className="reset__container">
        <div className="__header">
          <h2>Reset Password</h2>
        </div>

        <form onSubmit={handleSubmitResetPassword}>
          <div className="form__control">
            <input
              type="password"
              name="password"
              placeholder="Enter Password *"
              autoComplete="new-password"
              ref={register({
                required: 'Password is Required...!'
              })}
            />
            {errors.password && <span style={styles.errorMessage} role="alert">{errors.password.message}</span>}
          </div>

          <div className="form__control">
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password *"
              autoComplete="new-password"
              ref={register({
                required: 'Password is Required...!'
              })}
            />
            {errors.password && <span style={styles.errorMessage} role="alert">{errors.confirmpassword.message}</span>}
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
              <p>{data.resetPassword?.message} <span onClick={() => handleAuthAction('signin')}>Signin Now!</span></p>
            </div>
          }
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

export default ResetPassword;
