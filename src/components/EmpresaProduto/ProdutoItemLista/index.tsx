import styles from './ProdutoLista.module.scss';
import { MdModeEdit } from 'react-icons/md';
import ModalDeletarProduto from '../../Modais/ModalDeletarProduto';
import ModalAddProduto from '../../Modais/modalAddProduto';
import ModalEditarProduto from '../../Modais/modalEditProduto';

interface ProductItemListProps {
  id: string;
  key: string;
  photo: string;
  name: string;
  price: string;
  amount: string;
  setarLista: (listaAtualizada: string[]) => void
  
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
  setarLista
}: ProductItemListProps) => {
  return (
    <li
      className={styles.product}
      onClick={() => {
        enviaId(id);
      }}
    >
      <img className={styles.product__photo} src={photo} alt={name} />
      <p>{name}</p>
      <p>{amount} unid.</p>
      <p className={styles.product__highlight}>{price}</p>
      <div className={styles.product__btns}>
        <ModalEditarProduto setarLista={setarLista} idSelecionado={id}/>
        <ModalDeletarProduto setarLista={setarLista} idExcluir={id} />
      </div>
    </li>
  );
};

export default ProdutoLista;
