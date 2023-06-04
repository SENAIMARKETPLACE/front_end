import AvatarBusiness from 'components/AvatarBusiness';
import styles from './BusinessHeader.module.scss'
const BusinessHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__settings}><AvatarBusiness/></div>
        </header>
    )
}
export default BusinessHeader;