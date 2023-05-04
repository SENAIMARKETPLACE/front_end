import { FaPlus, FaStar } from "react-icons/fa";
import styles from "./CardProdutoCarrossel.module.scss"

interface cardProdutosProps {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
}

const CardProdutoCarrossel: React.FC<cardProdutosProps> = ({id, title, description, price, image}) => {
    return(
        <div className={styles.cardCarrossel} key={id}>
            <div className={styles.cardCarrossel__button}>
                <button><FaPlus/></button>
            </div>
            <div className={styles.cardCarrossel__columnOne}><img src={image} alt={title} className={styles.cardCarrossel__image}/></div>
            <div className={styles.cardCarrossel__columnTwo}>
                <p className={styles.cardCarrossel__columnTwo__title}>{title}</p>
                <ul className={styles.cardCarrossel__columnTwo__avalation}>
                    <li><FaStar/></li>
                    <li><FaStar/></li>
                    <li><FaStar/></li>
                    <li><FaStar/></li>
                    <li><FaStar/></li>
                </ul>
                <p className={styles.cardCarrossel__columnTwo__price}>R${price}</p>
            </div>
        </div>
    )
}
export default CardProdutoCarrossel

