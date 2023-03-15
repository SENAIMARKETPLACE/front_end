import styles from './MenuItems.module.scss'
import { Button, styled } from "@mui/material";
import { BiHomeAlt } from "react-icons/bi";

interface MenuItemsProps {
    text: string;
}

const MenuItems = ({text}:MenuItemsProps) => {
    return (
        <li className={styles.item}>
            <BiHomeAlt className={styles.icon}/>
            <p>{text}</p>
        </li>
    )
}

export default MenuItems; 

