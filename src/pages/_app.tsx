import React from "react";
import "../assets/styles/global.scss";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import Layout from "../components/Layout";
import {client}  from "../apollo/Client";
import AuthContextProvider from "../context/AuthContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ApolloProvider>
  );
}


export default App;