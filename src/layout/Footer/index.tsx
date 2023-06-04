import styles from './Footer.module.scss';
import logo from '../../../public/images/Logo.svg';
import { FaInstagram, FaRegEnvelope, FaWhatsapp } from 'react-icons/fa';

const comingSoonMsg = () => alert('Em breve! Aguardem! ;)');

const FooterSollaris = () => {
  return (
    <footer className={styles.sectionFooter}>
      <div>
        <img src={logo.src} alt="" className={styles.sectionFooter__logo} />
      </div>
      <ul className={styles.sectionFooter__listaContatos}>
        <li>
          <FaInstagram onClick={comingSoonMsg} />
        </li>
        <li>
          <FaRegEnvelope onClick={comingSoonMsg} />
        </li>
        <li>
          <FaWhatsapp onClick={comingSoonMsg} />
        </li>
      </ul>

      <div className={styles.sectionFooter__copyRights}>
        Sollaris © 2023 - todos os direitos reservados - Sollaris S.A
      </div>
    </footer>
  );
};
export default FooterSollaris;
