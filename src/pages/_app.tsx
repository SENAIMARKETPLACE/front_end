import React from "react"
import '../styles/Global.scss'

function MyApp({Component, pageProps}){
    return <Component {...pageProps}/>
}
export default MyApp