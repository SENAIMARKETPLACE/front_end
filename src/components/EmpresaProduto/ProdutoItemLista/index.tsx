import styles from './ProdutoLista.module.scss';
import { MdDelete } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';

interface ProductItemListProps {
  key: string;
  photo: string;
  name: string;
  price: string;
  amount: string;
}

const ProdutoLista = ({ photo, name, price, amount }: ProductItemListProps) => {
  return (
    <li className={styles.product}>
      <img
        className={styles.product__photo}
        src={photo}
        alt={`Ilustração - ${name}`}
      />
      <p className={styles.product__name}>{name}</p>
      <p className={styles.product__name}>{amount} unid.</p>
      <p className={styles.product__price}>{price}</p>
      <div className={styles.product__btns}>
        <MdModeEdit className={styles.product__edit} />
        <MdDelete className={styles.product__remove} />
      </div>
    </li>
  );
};

export default ProdutoLista;
