import { ICategory } from 'compartilhado/ICategory';
import ModalDeletarProduto from '../../Modais/ModalDeletarProduto';
import ModalEditarProduto from '../../Modais/modalEditProduto';
import styles from './ProdutoItemGrid.module.scss';

interface ProdutoItemGridProps {
  id: string;
  photo: string;
  name: string;
  price: string;
  subcategoria: string;
  amount: string;
  setarLista: (listaAtualizada: string[]) => void;
  snackbarOpenEdit: boolean;
  setSnackbarEditOpen: (open: boolean) => void;
  snackbarDeleteOpen: boolean;
  setSnackbarDeleteOpen: (open: boolean) => void;
  snackbarErrorOpen: boolean;
  setSnackbarErrorOpen: (open: boolean) => void;
  categoriesAndSubCategories: ICategory[];
}

function enviaId(id: string) {
  console.log(id);
  return id;
}

const ProdutoItemGrid = ({
  id,
  photo,
  name,
  price,
  amount,
  subcategoria,
  setarLista,
  snackbarOpenEdit,
  setSnackbarEditOpen,
  snackbarDeleteOpen,
  setSnackbarDeleteOpen,
  snackbarErrorOpen,
  setSnackbarErrorOpen,
  categoriesAndSubCategories,
}: ProdutoItemGridProps) => {
  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseFloat(price));

  const nomeFormatado = (name: string) => {
    if (name.length <= 50) {
      return name;
    }

    return name.slice(0, 45) + '...';
  };

  return (
    <li
      className={styles.product}
      onClick={() => {
        enviaId(id);
      }}
    >
      <img className={styles.product__photo} src={photo} alt={name} />
      <div className={styles.product__body}>
        <div className={styles.product__name}>
          <p className={styles.product__name__letters}>{nomeFormatado(name)}</p>
        </div>
        <p className={styles.product__subcategoria}>{subcategoria}</p>
        <p className={styles.product__highlight}>{precoFormatado}</p>
        <p className={styles.product__quantidade}>{amount} unid.</p>

        <div className={styles.product__buttons}>
          <ModalEditarProduto
            setSnackbarEditOpen={setSnackbarEditOpen}
            snackbarOpenEdit={snackbarOpenEdit}
            setSnackbarErrorOpen={setSnackbarErrorOpen}
            snackbarErrorOpen={snackbarErrorOpen}
            setarLista={setarLista}
            idSelecionado={id}
            categoriesAndSubCategories={categoriesAndSubCategories}
          />
          <ModalDeletarProduto
            setSnackbarDeleteOpen={setSnackbarDeleteOpen}
            snackbarDeleteOpen={snackbarDeleteOpen}
            setSnackbarErrorOpen={setSnackbarErrorOpen}
            snackbarErrorOpen={snackbarErrorOpen}
            setarLista={setarLista}
            idExcluir={id}
          />
        </div>
      </div>
    </li>
  );
};
export default ProdutoItemGrid;
