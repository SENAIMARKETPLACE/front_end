import styles from './MenuLateralUsuario.module.scss'
import ItemMenuLateral from '../../components/itemMenuLateral';
import { CgShoppingBag } from 'react-icons/cg';
import { FiSettings, FiShoppingCart } from 'react-icons/fi';
import { RxPerson } from 'react-icons/rx';
import { RxHamburgerMenu } from 'react-icons/rx';
import Logo from '../../../public/images/logo.png';

const listItems = [
    {
        text: 'Loja',
        icon: <CgShoppingBag />,
        url: '',
    },
    {
        text: 'Perfil',
        icon: <RxPerson />,
        url: '',
    },
    {
        text: 'Configurações',
        icon: <FiSettings />,
        url: '',
    }
].map((li, i) => (
    <ItemMenuLateral key={i} text={li.text} icon={li.icon} url={li.url} />
));

const MenuLateralUsuario = () => {
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

export default MenuLateralUsuario;
