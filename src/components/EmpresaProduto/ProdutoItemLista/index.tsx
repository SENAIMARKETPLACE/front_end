import styles from './ProdutoLista.module.scss';
import { MdModeEdit } from 'react-icons/md';
import ModalDeletarProduto from '../../Modais/ModalDeletarProduto';

interface ProductItemListProps {
  id: string;
  key: string;
  photo: string;
  name: string;
  price: string;
  amount: string;
}

function enviaId(id: string) {
  console.log(id);
  return id;
}

const ProdutoLista = ({
  id,
  photo,
  name,
  price,
  amount,
}: ProductItemListProps) => {
  return (
    <li
      className={styles.product}
      onClick={() => {
        enviaId(id);
      }}
    >
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
        <ModalDeletarProduto />
      </div>
    </li>
  );
};

export default ProdutoLista;
