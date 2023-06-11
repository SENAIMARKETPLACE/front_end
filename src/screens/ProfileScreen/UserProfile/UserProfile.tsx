import UserProfileForm from 'components/ProfileForm/UserProfileForm';

import styles from './UserProfile.module.scss';
import SignInMessage from 'patterns/SignInMessage';
import { useEffect, useState } from 'react';
import LoadingGif from 'layout/LoadingGif';

const UserProfile = () => {
  const [isLogged, setIsLogged] = useState(false);


  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {

    setTimeout(() => {
      const isLoggedFromLocalStorage = localStorage.getItem("isUserLogged");
      if (isLoggedFromLocalStorage === "true") {
        setIsLogged(true);
        setIsLoading(false)
      } else {
        setIsLogged(false);
        setIsLoading(false)

      }
    }, 2000)
   
  }, []);




  return (
    <>
    {isLoading ? (
      <div className={styles.loading}>
        <LoadingGif />
      </div>
    ) : (
      <>
        <h1 className={styles.title}>Perfil</h1>
        {isLogged ? (
          <UserProfileForm />
        ) : (
          <SignInMessage message="Faça o login para acessar o seu perfil." />
        )}
      </>
    )}
  </>
  );
};

export default UserProfile;
