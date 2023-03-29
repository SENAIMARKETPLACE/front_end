import styles from './UsuarioProduto.module.scss'
import { BsHeartFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import Camiseta from '../../../public/images/Camiseta.png';

const UsuarioProduto = () => {
    return (
        <div className={styles.produto}>
            <span className={styles.favorite_container}>
                <BsHeartFill className={styles.favorite_icon} />
            </span>
            <img src={Camiseta.src} alt='Camiseta de Nike' />
            <p className={styles.name}>Camiseta Nike Manga Longa Element</p>
            <p className={styles.price}>RR$ 159,99</p>
            <div className={styles.icons_container}>
                <div className={styles.rate}>
                    <p className={styles.rate_value}>3.9</p>
                    <FaStar />
                </div>
                <span className={styles.cart_container}>
                    <RiShoppingCart2Fill className={styles.cart_icon} />
                </span>
            </div>
        </div>
    )
}

export default UsuarioProduto;