import React, { useEffect, useState, createContext } from "react";
import { useQuery } from "@apollo/client";
import Router from "next/router";

import { User } from "../types";
import { MY_INFO } from '../graphql/User';


interface Props {}

type Actions = 'signin' | 'signup' | 'request' | 'reset' | 'close' | 'create' | 'create-service';

type HandleAuthAction = (action: Actions) => void;

interface AuthContextValues {
  authAction: Actions
  handleAuthAction: HandleAuthAction
  loggedInUser: User | null
  setAuthUser: (user: User | null) => void  
}

const initialState: AuthContextValues = {
  authAction: "close",
  handleAuthAction: () => {},
  loggedInUser: null,
  setAuthUser: () => {}
};

export const AuthContext = createContext<AuthContextValues>(initialState);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [authAction, setAuthAction] = useState<Actions>("close");
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const { data } = useQuery<{myInfo: User}>(MY_INFO);

  useEffect(() => {
    if(data?.myInfo) setLoggedInUser(data?.myInfo)
  }, [data?.myInfo]);


  //Signout sync effect
  useEffect(() => {
    //create function syncSignout
    const syncSignout = (e: StorageEvent) => {
      if(e.key === 'signout') {
        //Log user out
        setLoggedInUser(null);

        //push user to home page
        Router.push('/')
      }
    }

    window.addEventListener('storage', syncSignout)

    return() => window.removeEventListener('storage', syncSignout)
  }, [])

  const handleAuthAction: HandleAuthAction = (action) => {
    setAuthAction(action);
  };

  const setAuthUser = (user: User | null) => setLoggedInUser(user);
  
  return (
    <AuthContext.Provider
      value={{ 
        authAction, 
        handleAuthAction, 
        loggedInUser,
        setAuthUser
      }}
    >
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
