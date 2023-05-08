import { Avatar } from '@mui/material';
import MiniSearchBar from '../../MiniSearchBar';
import styles from './MarketplaceHeader.module.scss'
import { IoIosArrowDropleftCircle } from 'react-icons/io';

const MarketplaceHeader = () => {
    return (
        <header className={styles.header}>
            <IoIosArrowDropleftCircle className={styles.return_icon} />
            <div className={styles.searchbar_and_avatar}>
                <MiniSearchBar />
                <Avatar />
            </div>
        </header>
    )
}

export default MarketplaceHeader;