import React, {useContext} from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SigninArgs, User } from '../types';
import { SIGN_IN } from '../graphql/User';
import Loader from 'react-loader-spinner';

import Modal from './Modal/Modal';
import { AuthContext } from "../context/AuthContext";
import { isAdmin } from '../helpers/authHelper';
import { QUERY_SCREAMS } from '../graphql/Scream';
import { QUERY_MYPROFILE } from '../graphql/User';

interface Props {}

const Signin: React.FC<Props> = () => {

  const { handleAuthAction, setAuthUser } = useContext(AuthContext);

  const { register, errors, handleSubmit } = useForm<SigninArgs>();

  const [signin, { loading, error }] = useMutation<{signIn: User}, SigninArgs>(SIGN_IN);

  const router = useRouter()



  const handleSignin = handleSubmit( async ({ email, password }) => {
    try {
      const response = await signin({ variables: {email, password}, refetchQueries: [{ query: QUERY_SCREAMS}, {query: QUERY_MYPROFILE}]});
     
      if(response?.data?.signIn) {
          const user = response.data.signIn;

          // console.log("user signin: ", user)

          //close form
          handleAuthAction('close');


          //Set Logged in user in context api
          setAuthUser(user);
          
         
          if(isAdmin(user)) {
             //push user to Admin page
            router.push('http://localhost:3001')
          } else {
             //push user to their dashboard page
            router.push('/')
          }
      }
    } catch (error) {
    //  console.log(error)
     setAuthUser(null)
    }
  })
  return (
    <Modal>
      <div className="signin__container">
        <div className="__header">
          <h2>Access To Swizce</h2>
          {""}
          <span>One More Thing :)</span>
        </div>

        <form onClick={handleSignin}>
          <div className="form__control">
              <input
              type="email"
              name="email"
              placeholder="Enter Email *"
              autoComplete= 'new-password'
              ref={register({
                required: 'Email is required...!',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email is incorrect format...',
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
                  autoComplete= 'new-password'
                  ref={register({ 
                    required: 'Password is Required...!'
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
                </p><br />
                <p>
                  OR
                </p><br />
                <p>
                  Send OTP?{" "}
                  <span onClick={() => console.log("OTP authentication")}>
                    OTP
                  </span>
                </p>
            </div>
            
            <div className="form__control">
                <button disabled={loading} style={{cursor: loading ? 'not-allowed' : 'pointer'}} type="submit">
                  {
                    loading ? <Loader type='Oval' color='white' height={30} width={30} timeout={30000} /> : 
                    <img
                        src="https://res.cloudinary.com/swizce/image/upload/v1620702241/Swizce/images/login_qgoycx.png"
                        width="32px"
                        height="32px"
                        color="white"
                      />
                    }  
                </button>
            </div>
            {
                error && <div>
                  <span style={styles.errorMessage} role="alert">
                    { error.graphQLErrors[0]?.message || 'Something went wrong...!'}
                    </span>
                  </div>
            }
          <div className="form__control">
            <a>
              Don't have an account? <span onClick={() => handleAuthAction('signup')}>Get Invite!</span>
            </a>
          </div>
        </form>
      </div>
    </Modal>
  )
}


//Styling page over here
const styles = {
  errorMessage: {
    margin: 0, 
    padding: 0, 
    color: 'red', 
    fontSize: '.7rem'
  },
  btn__submit: {
    
  }

}

export default Signin;