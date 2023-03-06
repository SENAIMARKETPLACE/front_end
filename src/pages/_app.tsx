import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import Header from "../layout/Header";
import "../styles/Global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
