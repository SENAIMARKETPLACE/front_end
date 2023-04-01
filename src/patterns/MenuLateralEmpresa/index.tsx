import styles from './MenuLateralEmpresa.module.scss';
import ItemMenuLateral from '../../components/itemMenuLateral';
import { BiHomeAlt } from 'react-icons/bi';
import { MdOutlineSell } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { FiSettings } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';
import Logo from '../../../public/images/logo.png';

const listItems = [
  {
    text: 'Minha loja',
    icon: <BiHomeAlt />,
    url: '',
  },
  {
    text: 'Produtos',
    icon: <MdOutlineSell />,
    url: '',
  },
  {
    text: 'Dashboard',
    icon: <RxDashboard />,
    url: '',
  },
  {
    text: 'Configurações',
    icon: <FiSettings />,
    url: '',
  },
].map((li, i) => (
  <ItemMenuLateral key={i} text={li.text} icon={li.icon} url={li.url} />
));

const MenuLateralEmpresa = () => {
  return (
    <section className={styles.menu}>
      <RxHamburgerMenu className={styles.hamburguer_icon} />
      <div className={styles.brand}>
        <img
          className={styles.brand__logo}
          src={Logo.src}
          alt="Logo Sollaris"
        />
      </div>
      <nav className={styles.options}>
        <ul>{listItems}</ul>
      </nav>
    </section>
  );
};

export default MenuLateralEmpresa;
