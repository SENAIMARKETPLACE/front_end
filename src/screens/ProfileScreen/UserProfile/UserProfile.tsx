import UserProfileForm from 'components/ProfileForm/UserProfileForm';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  return (
    <>
      <h1 className={styles.title}>Perfil</h1>
      <UserProfileForm />
    </>
  );
};

export default UserProfile;
