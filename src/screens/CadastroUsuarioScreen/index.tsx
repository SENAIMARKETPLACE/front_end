import FormCadastroUsuario from '../../patterns/FormCadastroUsuario';
import FormCadastroEndereco from '../../patterns/FormCadastroEndereco';
import styles from './CadastroUsuarioScreen.module.scss';
import LogoMain from '../../../public/images/logo_sollaris.png';

const CadastroUsuarioScreen = () => {
  return (
    <main className={styles.main}>
      <section className={styles.register}>
        <div className={styles.register__header}>
          <h1 className={styles.register__title}>
            Crie sua conta na <span>Sollaris</span>
          </h1>
          <img
            className={styles.register__logo}
            src={LogoMain.src}
            alt="Logo Sollaris"
          />
        </div>
        <div className={styles.register__forms}>
          <FormCadastroEndereco />
          <FormCadastroUsuario />
        </div>
        <div className={styles.register__image}></div>
      </section>
    </main>
  );
};
export default CadastroUsuarioScreen;
