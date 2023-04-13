import SectionOneBrands from "../sectionOneBrands";
import styles from "./sectionOne.module.scss";

const SectionOne = () => {
  return (
    <section className={styles.sectionOne}>
      <div className={styles.sectionOne__mainMessage}>
        <h2>
          Produtos para esportes, oportunidade <br /> para empreendedores -
          bem-vindo à Sollaris.
        </h2>
      </div>
      <SectionOneBrands />
    </section>
  );
};
export default SectionOne;
