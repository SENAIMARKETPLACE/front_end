import Head from "next/head";
import React from "react";
import Header from "../layout/Header";
import "../styles/Global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
