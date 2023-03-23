import Link from "next/link";
import styles from "./Header.module.scss";
import { MdOutlineLogin } from "react-icons/md";
import logoMain from "../../../public/images/logo_sollaris.png"
import TransitionsModal from "../../components/modalLoginUsuario";


const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <h1><img src={logoMain.src} alt="Logo Sollaris" /></h1>
        <p>Sollaris</p>
      </div>
      <nav>
        <TransitionsModal/>
        
        <Link href="/login-empresa" className={styles.header__btn}>
          <p>Login Empresa</p>
        </Link>
      </nav>
    </header>
  );
};
export default Header;
