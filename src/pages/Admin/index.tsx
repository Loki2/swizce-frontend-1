import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

import { isAdmin } from '../../helpers/authHelper';
import Admin from '../../components/Admin/Admin';
import { User } from '../../types';


interface AdminProps {
  users: User[]
}

const AdminUser: React.FC<AdminProps> = ({ users }) => {
  const { loggedInUser } = useContext(AuthContext);

  const router = useRouter();

  console.log("User Logged in: ", loggedInUser)

  useEffect(() => {
    //if user is not authenticated pusg to home page
    if(!loggedInUser) {
      router.push('/')
      // alert('No Authorization...!')
    }else{
      if(!isAdmin(loggedInUser)) {
        //push to their dashboard page or home
        router.push('/Screams')
        alert('No Authorization...!')
      }else {
        router.push('/Admin')
      }
    }
  }, [loggedInUser])

  return !isAdmin(loggedInUser) ? 
    (<Loader type='Oval' color='teal' height={30} width={30} timeout={30000} /> ) 
    : 
    (
    <Admin admin={loggedInUser} />
    )
     
}

export default AdminUser;
