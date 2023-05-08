// Absolute Imports
import styles from './UserRegistrationScreen.module.scss';
import Cover from '/public/images/imgformempresa.png';
import RegistrationTemplate from 'patterns/RegistrationTemplate';
import { UserType } from 'compartilhado/enums/userTypes';
import FormCadastroUsuario from 'patterns/FormCadastroUsuario';

// Renamed Screen
const UserRegistrationScreen = () => {
  const coverData = {
    src: 'https://images.pexels.com/photos/6389075/pexels-photo-6389075.jpeg',
    alt: 'Pessoa negra praticando esporte',
  };

  return (
    // Create a Register Template, responsible for the responsive layout
    <RegistrationTemplate userType={UserType.user} coverData={coverData}>
      {/* Insert form only */}
      <FormCadastroUsuario />
    </RegistrationTemplate>
  );
};

export default UserRegistrationScreen;
