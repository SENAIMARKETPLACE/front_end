import UserProfileForm from 'components/ProfileForm/UserProfileForm';

import styles from './UserProfile.module.scss';
import SignInMessage from 'patterns/SignInMessage';
import { useEffect, useState } from 'react';
import LoadingGif from 'layout/LoadingGif';
import { IResponseLoginUser } from 'compartilhado/IReponseLoginUser';

const UserProfile = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ userConnect, setUserConnect] = useState<IResponseLoginUser>();

  
  useEffect(() => {

    setTimeout(() => {
      const isLoggedFromLocalStorage = localStorage.getItem("isUserLogged");
      const userTemp = localStorage.getItem("userLoginResponse")
      if (isLoggedFromLocalStorage === "true") {
        setIsLogged(true);
        setIsLoading(false)
        if (userTemp) {
          const userData: IResponseLoginUser = JSON.parse(userTemp);
      
          // ...faça o que for necessário com os dados do usuário
          setUserConnect(userData);
        }
      
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
        {isLogged || userConnect? (
          <UserProfileForm  userConnect={userConnect}/>
        ) : (
          <SignInMessage message="Faça o login para acessar o seu perfil." />
        )}
      </>
    )}
  </>
  );
};

export default UserProfile;
