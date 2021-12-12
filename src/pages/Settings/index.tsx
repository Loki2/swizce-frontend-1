import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Setting from '../../components/Setting/Setting';
import { User } from '../../types';
import Loader from "react-loader-spinner";
import Sidebar from '../../components/Partials/Sidebar';
import Rightbar from '../../components/Partials/Rightbar';
import {AuthContext} from '../../context/AuthContext';


interface Props {
  user: User
}

const Settings: React.FC<Props> = ({ user }) => {
  const { loggedInUser } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if(!loggedInUser){
      router.push('/')
    }else{
      router.push('/Settings')
    }
  }, [loggedInUser])

  return !loggedInUser ? (
    <div className="display__page">
      <section className="main">
        <Loader
          type="Oval"
          color="teal"
          height={50}
          width={50}
          timeout={30000}
        />
      </section>
    </div>
  ):(
    <>
      <Sidebar />
        <div className="setting__page">
          <Setting />
        </div>      
      <Rightbar user={loggedInUser} />
    </>
  )
}

export default Settings;
