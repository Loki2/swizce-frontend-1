import React, {useContext, useEffect} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';
// import { useQuery } from '@apollo/client';
// import { QUERY_SONGS } from '../graphql/Song'
// import { Song } from '../types'

import Backdrop from './Modal/Backdrop';
import Signup from './Signup';
import Signin from './Signin';
import RequestResetPassword from './RequestResetPassword';
import ResetPassword from './ResetPassword';
import Navigation from './Partials/Navigation';
import Create from './Scream/Create';
import AddService from './Service/Add';
import Add from './Scream/Add';
// import { isAdmin } from '../helpers/authHelper';
// import AdminNavbar from './Partials/AdminNavbar';

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  const { authAction, handleAuthAction, loggedInUser } = useContext(AuthContext);

  // console.log("User Logged in from layout!:", loggedInUser);

  const { asPath, replace, pathname, query  } = useRouter();

  useEffect(() => {
    if(asPath === '/dashboard#_=_' || asPath === 'dashboard#'){
     replace('/dashboard') 
    }

    if(asPath === '#_=_' || asPath === '/#'){
      replace('/')
    }
  }, [asPath, replace]);



  useEffect(() => {
    if(query?.resetToken) handleAuthAction('reset')
  }, [query]);


  return (
    <>
      <Head>
          <title>
            {
              pathname === '/' ? 'HOME': pathname.split('/')[1].toUpperCase()
            }
          </title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          <link href='https://fonts.googleapis.com/css2?family=Noto+Sans&family=Roboto&display=swap'rel='stylesheet'/>
      </Head>
      
      <Navigation user={loggedInUser} />
        {children}
        {
          authAction !== 'close' && (
            <>
              {
                authAction === 'signup' && (
                  <>
                  <Backdrop />
                  <Signup />
                  </>
                )}
                {
                authAction === 'signin' && (
                  <>
                  <Backdrop />
                  <Signin />
                  </>
                )}
                {
                authAction === 'request' && (
                  <>
                  <Backdrop />
                  <RequestResetPassword />
                  </>
                )}
                {
                authAction === 'reset' && (
                  <>
                  <Backdrop />
                  <ResetPassword token={query?.resetToken as string} />
                  </>
                )}

                {
                authAction === 'create' && (
                  <>
                  <Backdrop />
                  <Create userId={loggedInUser.id} />
                  </>
                )}

                { 
                authAction === 'create-service' && (
                  <>
                  <Backdrop />
                  <AddService userId={loggedInUser.id} />
                  </>
                )}
            </>
          )
        }      
    </>
  )
}


export default Layout;
