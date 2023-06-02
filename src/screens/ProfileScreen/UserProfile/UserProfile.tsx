import UserProfileForm from 'components/ProfileForm/UserProfileForm';

import styles from './UserProfile.module.scss';
import SignInMessage from 'patterns/SignInMessage';
import { useState } from 'react';

const UserProfile = () => {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <>
      <h1 className={styles.title}>Perfil</h1>
      {isLogged ? (
        <UserProfileForm />
      ) : (
        <SignInMessage message="Faça o login para acessar o seu perfil." />
      )}
    </>
  );
};

export default UserProfile;
