
import React, { useEffect } from 'react';
import styles from '../styles/Home.module.scss'; 
import { useRouter } from 'next/router';

const Home= () => {
    const router = useRouter();
    useEffect(() => {
      router.push("/marketplace");
    }, []);
    return <></>;
}
export default Home;