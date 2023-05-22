import { ReactNode } from 'react';
import styles from './RegistrationTemplate.module.scss';
import LogoSollaris from '/public/images/logo.svg';
import { UserType } from 'compartilhado/enums/userTypes';
import Link from 'next/link';

interface Props {
  coverData: any;
  userType: UserType;
  children: ReactNode;
}

const RegistrationTemplate = ({ userType, coverData, children }: Props) => {
  const FormTitle = () => {
    if (userType === UserType.user) {
      return (
        <h1 className={styles.header__title}>
          Descubra sua melhor versão com a <Link href="/"> Sollaris.</Link>{' '}
          <br />
          <span>Cadastre-se agora.</span>
        </h1>
      );
    } else if (userType === UserType.company) {
      return (
        <h1 className={styles.header__title}>
          Ofereça seus produtos e serviços na <Link href="/">Sollaris</Link>, o
          marketplace especializado em bem-estar. <br />
          <span>Cadastre-se agora.</span>
        </h1>
      );
    }
  };

  return (
    <section className={styles.template}>
      <div className={styles.template__wrap}>
        <div className={styles.cover}>
          <img
            src={coverData.src}
            alt={coverData.alt}
            className={styles.cover__image}
          />
        </div>
        <main className={styles.form}>
          <div className={styles.header}>
            <img
              className={styles.header__logo}
              src={LogoSollaris.src}
              alt="Logotipo da Sollaris"
            />
            <FormTitle />
          </div>
          {children}
        </main>
      </div>
    </section>
  );
};

export default RegistrationTemplate;
