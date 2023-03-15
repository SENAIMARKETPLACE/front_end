import Link from "next/link";
import styles from "./Header.module.scss";
import { MdOutlineLogin } from "react-icons/md";
import logoMain from "../../../public/images/logo_sollaris.png"

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <h1><img src={logoMain.src} alt="Logo Sollaris" /></h1>
      </div>
      <nav>
        <Link href="/#" className={styles.header__btn_login}>
          <MdOutlineLogin />
          <p>Log-In</p>
        </Link>
        <Link href="/cadastro-usuario" className={styles.header__btn_cadastro}>
          <p>Cadastre-se PF</p>
        </Link>
        | 
        <Link href="/cadastro-empresa" className={styles.header__btn_cadastro}>
          <p>Cadastre-se PJ</p>
        </Link>
      </nav>
    </header>
  );
};
export default Header;
