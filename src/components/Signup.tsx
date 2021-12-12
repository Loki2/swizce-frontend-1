import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { SignupArgs, User } from "../types";
import Loader from "react-loader-spinner"; 'react-loader-spinner';


import { SIGN_UP } from "../graphql/User";
import { AuthContext } from "../context/AuthContext";
import Modal from "./Modal/Modal";

interface Props {}

const Signup: React.FC<Props> = () => {

  const { handleAuthAction, setAuthUser } = useContext(AuthContext);

  const { register, errors, handleSubmit } = useForm<SignupArgs>();

  const [signup, { loading, error }] = useMutation<{ signUp: User }, SignupArgs>(SIGN_UP);


  const router = useRouter();




  const submitSignup = handleSubmit( async ({ username, email, password }) => {

    try {
      const response = await signup({ variables: {username, email, password}});


      if(response?.data?.signUp){
         const { signUp } = response.data;

         if(signUp){
           //close form
            handleAuthAction('close');


           //Set Logged in user in context api
           setAuthUser(signUp);

           //push user to their dashboard page
           router.push('/')
         }
      }
    } catch (error) {
      //console.log(error)
      setAuthUser(null)
    }
  });

  
  return (
    <Modal>
      <div className="signup__container">
        <div className="__header">
          <h2>Join Swizce</h2>
          {""}
          <span>One More Thing :)</span>
        </div>

        <form onClick={submitSignup}>
          <div className="form__control">
            <input
            type="text"
            name="username"
            placeholder="Enter Username *"
            autoComplete="new-password"
            ref={register({
              required: "Username is required...!",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters.",
              },
              maxLength: {
                value: 25,
                message: "Username must not be more than 25 characters",
              },
            })}
          />
           {errors.username && <span style={styles.errorMessage} role="alert">{errors.username.message}</span>}
          </div>

          <div className="form__control">
            <input
            type="email"
            name="email"
            placeholder="Enter Email *"
            ref={register({
              required: 'Email is required...!',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email is incorrect format...!",
              },
            })}
          />
          {errors.email && <span  style={styles.errorMessage} role="alert">{errors.email.message}</span>}
          </div>

          <div className="form__control">
            <input
            type="password"
            name="password"
            placeholder="Enter Password *"
            ref={register({
              required: 'Password is Required...!',
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
              maxLength: {
                value: 75,
                message: "Password must not be more than 75 characters",
              },
            })}
          />
           {errors.password && <span style={styles.errorMessage} role="alert">{errors.password.message}</span>}
          </div>

          <div className="p__forget">
            <p>
              Forgot password?{" "}
              <span onClick={() => handleAuthAction('request')}>
                    Click here
                </span>
            </p>
          </div>

          <div className="form__control">
            <button disabled={loading} style={{cursor: loading ? 'not-allowed' : 'pointer'}} type="submit">
            { loading ? <Loader type='Oval' color='white' height={30} width={30} timeout={30000} /> : 
                <img
                src="https://res.cloudinary.com/swizce/image/upload/v1620702241/Swizce/images/login_qgoycx.png"
                width="32px"
                height="32px"
                color="white"
              />
            }
            </button>
            {
              error && <div>
                <span style={styles.errorMessage} role="alert">
                  {error.graphQLErrors[0]?.message || 'Sorry something went wrong...!'}
                </span>  
              </div>
            }
            </div>

            <div className="form__control">
            <a>
              Don't have an account? <span onClick={() => handleAuthAction('signin')}>Signin Now!</span>
            </a>
          </div>
        </form>
      </div>
    </Modal>
  );
};

//Styling page here
const styles = {
  errorMessage: {
    margin: 0, 
    padding: 0, 
    color: 'red', 
    fontSize: '.7rem'
  }
}

export default Signup;
