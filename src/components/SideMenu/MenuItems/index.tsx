import styles from './MenuItems.module.scss'
import { Button, styled } from "@mui/material";
import { BiHomeAlt } from "react-icons/bi";
import { IconType } from 'react-icons/lib';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

interface MenuItemsProps {
    text: string;
    icon: any;
    url: string;
}

const importIcon = () => {
    
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

