import ModalDeletarProduto from "../../Modais/ModalDeletarProduto";
import ModalEditarProduto from "../../Modais/modalEditProduto";
import styles from "./ProdutoItemGrid.module.scss";

interface ProdutoItemGridProps {
  id: string;
  key: string;
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
  categoriesAndSubCategories: string[];
}

function enviaId(id: string) {
  console.log(id);
  return id;
}

const ProdutoItemGrid = ({
  id,
  key,
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
  categoriesAndSubCategories,
}: ProdutoItemGridProps) => {
  const precoFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(parseFloat(price));

  return (
    <li
      className={styles.product}
      onClick={() => {
        enviaId(id);
      }}
    >
      <img className={styles.product__photo} src={photo} alt={name} />
      <div className={styles.product__body}>
        <p className={styles.product__name}>{name}</p>
        <p className={styles.product__subcategoria}>{subcategoria}</p>
        <p className={styles.product__highlight}>{precoFormatado}</p>
        <p className={styles.product__quantidade}>{amount} unid.</p>

        <div className={styles.product__buttons}>
            <ModalEditarProduto
              setSnackbarEditOpen={setSnackbarEditOpen}
              snackbarOpenEdit={snackbarOpenEdit}
              setarLista={setarLista}
              idSelecionado={id}
              categoriesAndSubCategories={categoriesAndSubCategories}
            />
            <ModalDeletarProduto
              setSnackbarDeleteOpen={setSnackbarDeleteOpen}
              snackbarDeleteOpen={snackbarDeleteOpen}
              setarLista={setarLista}
              idExcluir={id}
            />
        </div>
      </div>
    </li>
  );
};
export default ProdutoItemGrid;
