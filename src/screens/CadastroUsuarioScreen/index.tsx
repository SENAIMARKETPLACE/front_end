import FormCadastroUsuario from "../../patterns/FormCadastroUsuario";
import styles from "./CadastroUsuarioScreen.module.scss";
import LogoMain from "../../../public/images/logo_sollaris.png";

const CadastroUsuarioScreen = () => {
  return (
    <section className={styles.divisao}>
      <div className={styles.sessaoCadastro__form}>
        <h1>
          <img className={styles.logo} src={LogoMain.src} alt="Logo Sollaris" />
        </h1>
        <div className={styles.sessaoTitulo}>
          <h2 className={styles.titulo}>
            Crie sua Conta na{" "}
            <span className={styles.titulo__sollaris}>Sollaris</span>
          </h2>
        </div>
        <FormCadastroUsuario />
      </div>
      <div className={styles.sessaoImagem}></div>
    </section>
  );
};
export default CadastroUsuarioScreen;
