import styles from ".././SideMenu.module.scss";
import MenuItems from "../../../components/SideMenu/MenuItems";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineSell, MdHome } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from '../../../../public/images/logo.png';

const listItems = [
    {
        text: 'Minha loja',
        icon: <BiHomeAlt />,
        // icon: <MdHome/>,
        url: ''
    },
    {
        text: 'Produtos',
        icon: <MdOutlineSell />,
        url: ''
    },
    {
        text: 'Dashboard',
        icon: <RxDashboard />,
        url: ''
    },
    {
        text: 'Configurações',
        icon: <FiSettings />,
        url: ''
    },
].map(li => <MenuItems text={li.text} icon={li.icon} url={li.url} />)

const SideMenuCompany = () => {
    return (
        <div className={styles.menu}>
            <RxHamburgerMenu className={styles.hamburguer__icon}/>
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
        </div>
    )
}

// {items.forEach(item => <)}

export default SideMenuCompany;