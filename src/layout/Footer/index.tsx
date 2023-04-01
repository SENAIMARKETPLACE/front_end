import styles from "./Footer.module.scss";
import logo from "../../../public/images/logoprincipal.png";
import { FaInstagram, FaRegEnvelope, FaWhatsapp } from "react-icons/fa";
const FooterSollaris = () => {
  return (
    <footer className={styles.sectionFooter}>
      <div>
        <img src={logo.src} alt="" className={styles.sectionFooter__logo} />
      </div>
      <ul className={styles.sectionFooter__listaContatos}>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaRegEnvelope />
        </li>
        <li>
          <FaWhatsapp />
        </li>
      </ul>

      <div className={styles.sectionFooter__copyRights}>
        Sollaris © 2023 - todos os direitos reservados - Sollaris S.A
      </div>
    </footer>
  );
};
export default FooterSollaris;
