import styles from './UsuarioProduto.module.scss'
import { BsHeartFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import Camiseta from '../../../public/images/Camiseta.png';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface UsuarioProdutoProps {
    image: string;
    name: string;
    price: string;
    id:string;
}





const UsuarioProduto = ({ image, name, price, id}: UsuarioProdutoProps) => {
   
    const moeda = parseInt(price).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    
    return (
        <Link href={`/marketplace-produto/${id}`}>
            <div className={styles.produto}>
                <span className={styles.favorite_container}>
                    <BsHeartFill className={styles.favorite_icon} />
                </span>
                <div className={styles.photo_container}>
                    <img className={styles.photo} src={image} alt={name} />
                </div>
                <p className={styles.name}>{name}</p>
                <div className={styles.icons_container}>
                    <div className={styles.rate}>
                        <p className={styles.rate_value}>5</p>
                        <FaStar />
                    </div>
                    <p className={styles.price}>{moeda}</p>
            
                </div>
            </div>
        </Link>
    )
}

export default UsuarioProduto;