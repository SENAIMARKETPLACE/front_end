import LogoMain from "../../../public/images/logo_sollaris.png";
import FormCadastroEndereco from "../../patterns/FormCadastroEndereco";
import styles from './CadastroEnderecoScreen.module.scss'

const CadastroEnderecoScreen = () => {
  return (
    <section className={styles.divisao}>
      <div className={styles.sessaoCadastro__form}>
        <h1>
          <img src={LogoMain.src} alt="Logo Sollaris" className={styles.logo} />
        </h1>
        <div>
          <h2 className={styles.titulo}>
            Agora seu <span className={styles.titulo__endereco}>Endereço</span>
          </h2>
        </div>
        <FormCadastroEndereco />
      </div>
      <div className={styles.sessaoImagem}></div>
    </section>
  );
};
export default CadastroEnderecoScreen;
