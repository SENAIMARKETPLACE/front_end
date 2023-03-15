import styles from "./SideMenu.module.scss";
import MenuItems from "../../components/SideMenu/MenuItems";
// import { Button, TextField } from "@mui/material";

interface SideMenuProps {
    items: string[];
}

const SideMenu = ({items}:SideMenuProps) => { 
    const listItems = items.map(item => <MenuItems text = {item}/>)
    return (
        <nav className={styles.menu}>
            <ul>{listItems}</ul>
        </nav>
    )
}

// {items.forEach(item => <)}

export default SideMenu;