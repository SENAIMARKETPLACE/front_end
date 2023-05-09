import styles from './UsuarioProduto.module.scss'
import { BsHeartFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import Camiseta from '../../../public/images/Camiseta.png';
import { useRouter } from 'next/router';

interface UsuarioProdutoProps {
    image: string;
    name: string;
    price: string;
    id:string;
}





const UsuarioProduto = ({ image, name, price, id}: UsuarioProdutoProps) => {
    const router = useRouter(); 

    function redirecionarAPaginaDoProduto(produtoId: string){
        router.push(`/marketplace-produto/${produtoId}`)
    }
    
    return (
        <div className={styles.produto} onClick={() => redirecionarAPaginaDoProduto(id)}>
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
                <p className={styles.price}>R$ {price}</p>

        
            </div>
        </div>
    )
}

export default UsuarioProduto;