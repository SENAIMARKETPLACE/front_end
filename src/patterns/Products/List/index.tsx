import styles from "./ProductItemList.module.scss";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

interface ProductItemListProps {
    key: string;
    photo: string;
    name: string;
    price: string;
}

const ProductItemList = ({ photo, name, price }: ProductItemListProps) => {

    const options = {style: 'currency', currency: 'BRL', minimiumFractionDigits: 2, maximumFractionDigits: 2};
    const formatarNumeros = new Intl.NumberFormat('pt-br', options)






    return (
        <li className={styles.product}>
            <img className={styles.product__photo} src={photo} alt={`Ilustração - ${name}`} />
            <p className={styles.product__name}>{name}</p>
            <       p className={styles.product__price}>{formatarNumeros.format(parseInt(price))}</p>
            <div className={styles.product__btns}>
                <MdModeEdit className={styles.product__edit} />
                <MdDelete className={styles.product__remove} />
            </div>
        </li>
    )
}

export default ProductItemList;