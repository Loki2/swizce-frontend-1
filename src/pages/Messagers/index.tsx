import React, { useContext, useEffect } from 'react'
import Messager from '../../components/Messager/Messager';
import { useRouter } from 'next/router';

import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Partials/Sidebar';
import Rightbar from '../../components/Partials/Rightbar';
import Index from '../../components/Index';

interface Props {
  
}

const MessagerPage = (props: Props) => {
  const { loggedInUser } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if(!loggedInUser){
      router.push('/');
    }else{
      router.push('/Messagers')
    }
  },[loggedInUser])
  return !loggedInUser ? (
      <Index />
      ):(
        <>
          {!loggedInUser ? <div></div> : <Sidebar />}
            <div className="messager__page">
              <Messager />
            </div>
          {!loggedInUser ? <div></div> : <Rightbar user={loggedInUser}/>}
        </>
      )
}

export default MessagerPage;
