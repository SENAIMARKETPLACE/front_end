import styles from "./EmpresaProdutosScreen.module.scss";
import MenuLateralEmpresa from "../../patterns/MenuLateralEmpresa";
import EmpresaBanner from "../../components/EmpresaBanner";
import ModalAddProduto from "../../components/Modais/modalAddProduto";
import Banner from "../../../public/images/banner.png";
import { useEffect, useState } from "react";
import ProdutoLista from "../../components/EmpresaProduto/ProdutoItemLista";
import SearchBar from "../../components/SearchBar";
import ToggleBtn from "../../components/Buttons/ToggleButton";
import StatusAlert from "../../components/StatusMsg/SucessMsg";
import { httpApiMockada, httpProduto } from "../../http";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const EmpresaProdutosScreen = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarEditOpen, setSnackbarEditOpen] = useState(false);
  const [snackbarDeleteOpen, setSnackbarDeleteOpen] = useState(false);
  const [mensagem, setMensagem] = useState("");

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSnackbarClose = (
    event: React.SyntheticEvent | undefined,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSnackbarEditClose = (
    event: React.SyntheticEvent | undefined,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarEditOpen(false);
  };

  const handleSnackbarDeleteClose = (
    event: React.SyntheticEvent | undefined,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarDeleteOpen(false);
  };



  async function getProducts() {
    try {
      // const response = await httpProduto.get("/api/products");
      const response = await httpApiMockada.get("produtos");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function atualizarListaProdutos(novaLista: string[]): void {
    setProducts(novaLista);
  }

  function setarMensagemEEstadoRequisicao(
    isOpenProps: boolean,
    mensagemProps: string
  ): void {
    setIsOpen(isOpenProps);
    setMensagem(mensagemProps);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
        >
          <div>
            <Alert onClose={handleSnackbarClose} severity="success">
              Produto adicionado com sucesso!
            </Alert>
          </div>
        </Snackbar>
        <Snackbar
          open={snackbarDeleteOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarDeleteClose}
        >
            <div>
            <Alert onClose={handleSnackbarDeleteClose} severity="success">
              Produto deletado com sucesso!
            </Alert>
          </div>
        </Snackbar>
        <Snackbar
          open={snackbarEditOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarEditClose}
        >
            <div>
            <Alert onClose={handleSnackbarEditClose} severity="success">
              Produto alterado com sucesso!
            </Alert>
          </div>
        </Snackbar>
      </Stack>

      <div className={styles.page_container}>
        <MenuLateralEmpresa />
        <section>
          <EmpresaBanner image={Banner} alt="Capa da empresa" />
          <main className={styles.main_content}>
            <div className={styles.title_container}>
              <h1 className={styles.title}>Meus Produtos</h1>
              <ModalAddProduto
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                setarLista={atualizarListaProdutos}
                setarMensagemEEstadoRequisicao={setarMensagemEEstadoRequisicao}
              />
            </div>
            <div className={styles.searchAndFilter}>
              <SearchBar />
              <ToggleBtn />
              <StatusAlert isOpen={isOpen} mensagem={mensagem} />
            </div>
            <ul className={styles.products__list}>
              <ul className={styles.products__list}>
                {products.map((product) => (
                  <ProdutoLista
                    snackbarOpenEdit={snackbarEditOpen}
                    setSnackbarEditOpen={setSnackbarEditOpen}
                    snackbarDeleteOpen={snackbarDeleteOpen}
                    setSnackbarDeleteOpen={setSnackbarDeleteOpen}
                    setarLista={atualizarListaProdutos}
                    id={product.id}
                    key={product.id}
                    photo={product.img}
                    name={product.nome}
                    price={product.preco}
                    amount={product.detalhes_produto.quantidade}
                  />
                ))}
              </ul>
            </ul>
          </main>
        </section>
      </div>
    </>
  );
};

export default EmpresaProdutosScreen;
