import styles from './ProdutoLista.module.scss';
import { MdDelete } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';
import ModalDeletarProduto from '../../Modais/ModalDeletarProduto';

interface ProductItemListProps {
  key: string;
  photo: string;
  name: string;
  price: string;
  amount: string;
}

function alertz() {
  console.log('Bobão');
}

const ProdutoLista = ({ photo, name, price, amount }: ProductItemListProps) => {
  return (
    <li className={styles.product}>
      <img
        className={styles.product__photo}
        src={photo}
        alt={`Ilustração - ${name}`}
      />
      <p>{name}</p>
      <p>{amount} unid.</p>
      <p className={styles.product__highlight}>{price}</p>
      <div className={styles.product__btns}>
        <MdModeEdit className={styles.product__edit} />
        <MdDelete className={styles.product__remove} onClick={alertz} />
      </div>
      <ModalDeletarProduto />
    </li>
  );
};

export default ProdutoLista;
