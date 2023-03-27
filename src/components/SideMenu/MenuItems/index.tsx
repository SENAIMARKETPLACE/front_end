import styles from './MenuItems.module.scss'

interface MenuItemsProps {
    key: number;
    text: string;
    icon: any;
    url: string;
}

const MenuItems = ({text, icon, url}:MenuItemsProps) => {
    return (
        <li className={styles.item}>
            <span className={styles.icon}>{icon}</span> 
            <p className={styles.text}>{text}</p>
        </li>
    )
}

export default MenuItems; 

