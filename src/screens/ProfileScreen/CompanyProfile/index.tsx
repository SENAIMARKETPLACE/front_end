import styles from './CompanyProfile.module.scss';
import SignInMessage from 'patterns/SignInMessage';
import { useState } from 'react';
import CompanyProfileForm from 'components/ProfileForm/CompanyProfileForm';

const CompanyProfile = () => {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <>
      <h1 className={styles.title}>Perfil</h1>
      {isLogged ? (
        <CompanyProfileForm />
      ) : (
        <SignInMessage message="Faça o login para acessar o seu perfil." />
      )}
    </>
  );
};

export default CompanyProfile;
