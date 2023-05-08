// Absolute Imports
import styles from './CompanyRegistrationScreen.module.scss';
import Cover from '/public/images/imgformempresa.png';
import RegistrationTemplate from 'patterns/RegistrationTemplate';
import { UserType } from 'compartilhado/enums/userTypes';
import FormCadastroEmpresa from 'patterns/FormCadastroEmpresa';

// Renamed Screen
const CompanyRegistrationScreen = () => {
  const coverData = {
    src: Cover.src,
    alt: 'Imagem de apresentação da empresa',
  };

  return (
    // Create a Register Template, responsible for the responsive layout
    <RegistrationTemplate userType={UserType.company} coverData={coverData}>
      {/* Insert form only */}
      <FormCadastroEmpresa />
    </RegistrationTemplate>
  );
};

export default CompanyRegistrationScreen;
