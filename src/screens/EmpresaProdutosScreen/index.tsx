import styles from './EmpresaProdutosScreen.module.scss';
import MenuLateralEmpresa from '../../patterns/MenuLateralEmpresa';
import EmpresaBanner from '../../components/EmpresaBanner';
import ModalAddProduto from '../../components/Modais/modalAddProduto';
import { useEffect, useState } from 'react';
import ProdutoLista from '../../components/EmpresaProduto/ProdutoItemLista';
import SearchBar from '../../components/SearchBar';
import ToggleBtn from '../../components/Buttons/ToggleButton';
import StatusAlert from '../../components/StatusMsg/SucessMsg';
import { httpApiMockada, httpCategoria, httpProduto } from '../../http';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { error } from 'console';
import { stringify } from 'querystring';
import { ICategory } from '../../compartilhado/ICategory';
import { MdGridOn, MdGridView, MdOutlineList } from 'react-icons/md';
import ProductItemList from '../../patterns/Products/List';
import ProdutoItemLista from '../../components/EmpresaProduto/ProdutoItemLista';
import ProdutoItemGrid from '../../components/EmpresaProduto/ProdutoItemGrid';
import { ISubcategory } from 'compartilhado/ISubcategory';
import SignInMessage from 'patterns/SignInMessage';
import { Center, Container } from '@mantine/core';

const EmpresaProdutosScreen = () => {
  // Altera a exibição da tela se estiver logado
  const [isLogged, setIsLogged] = useState(true);

  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarEditOpen, setSnackbarEditOpen] = useState(false);
  const [snackbarDeleteOpen, setSnackbarDeleteOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [catchCategorias, setCatchCategorias] = useState<ICategory[]>([]);
  const [isButtonListAtivo, setIsButtonListAtivo] = useState(false);
  const [modoLista, setModoLista] = useState(true);

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const tornarModoGrid = () => {
    setIsButtonListAtivo(false);
  };

  const tornarModoList = () => {
    setIsButtonListAtivo(true);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | undefined,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSnackbarEditClose = (
    event: React.SyntheticEvent | undefined,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarEditOpen(false);
  };

  const handleSnackbarDeleteClose = (
    event: React.SyntheticEvent | undefined,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarDeleteOpen(false);
  };

  const handleSnackbarErrorClose = (
    event: React.SyntheticEvent | undefined,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarErrorOpen(false);
  };

  async function getProducts() {
    try {
      // const response = await httpProduto.get("/api/products");
      // /api/products/my_products/{id}
      const response = await httpApiMockada.get('/produto-get');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getCategoriesAndSubs(): Promise<void> {
    try {
      const response = await httpApiMockada.get('/categoriasSubcategorias');
      const categories: ICategory[] = response.data.map((categoryData: any) => {
        const { sub_categorias, ...category } = categoryData;
        const subcategories: ISubcategory[] = sub_categorias.map(
          (subcategoryData: any) => ({
            id: subcategoryData.id,
            nome: subcategoryData.nome,
          })
        );
        return { ...category, sub_categorias: subcategories };
      });

      setCatchCategorias(categories);
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   httpApiMockada
  //     .get("categoriasSubcategorias")
  //     .then((response) => {
  //       setCatchCategorias(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

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
    getCategoriesAndSubs();
  }, []);

  return !isLogged ? (
    <div style={{ marginTop: '20px' }}>
      <SignInMessage message="Faça o login para acessar seus produtos." />
    </div>
  ) : (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
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
        <Snackbar
          open={snackbarErrorOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarErrorClose}
        >
          <div>
            <Alert onClose={handleSnackbarErrorClose} severity="error">
              Hmm, um erro foi encontrado, tente novamente em instantes...
            </Alert>
          </div>
        </Snackbar>
      </Stack>

      <div className={styles.page_container}>
        <section className={styles.sectionViewProducts}>
          <main className={styles.main_content}>
            <div className={styles.title_container}>
              <h1 className={styles.title}>Meus Produtos</h1>
              <ModalAddProduto
                categoriesAndSubCategories={catchCategorias}
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                snackbarErrorOpen={snackbarErrorOpen}
                setSnackbarErrorOpen={setSnackbarErrorOpen}
                setarLista={atualizarListaProdutos}
                setarMensagemEEstadoRequisicao={setarMensagemEEstadoRequisicao}
              />
            </div>
            <div className={styles.searchAndFilter}>
              <SearchBar />
              <div className={styles.buttonsVisualization}>
                <button
                  onClick={(e) => tornarModoGrid()}
                  className={`${styles.buttonsVisualization__button} ${
                    !isButtonListAtivo ? styles.botaoAtivo : ''
                  }`}
                >
                  <MdGridOn />
                </button>
                <button
                  onClick={(e) => tornarModoList()}
                  className={`${styles.buttonsVisualization__button} ${
                    isButtonListAtivo ? styles.botaoAtivo : ''
                  }`}
                >
                  <MdOutlineList />
                </button>
              </div>
              {/* <StatusAlert isOpen={isOpen} mensagem={mensagem} /> */}
            </div>

            <div
              className={`${
                isButtonListAtivo ? '' : styles.containerProdutuct
              }`}
            >
              <ul
                className={`${
                  isButtonListAtivo
                    ? styles.products__list
                    : styles.products__grid
                }`}
              >
                {products.length > 0 ? (
                  products.map((product) =>
                    isButtonListAtivo ? (
                      <ProdutoItemLista
                        categoriesAndSubCategories={catchCategorias}
                        snackbarOpenEdit={snackbarEditOpen}
                        setSnackbarEditOpen={setSnackbarEditOpen}
                        snackbarDeleteOpen={snackbarDeleteOpen}
                        setSnackbarDeleteOpen={setSnackbarDeleteOpen}
                        snackbarErrorOpen={snackbarErrorOpen}
                        setSnackbarErrorOpen={setSnackbarErrorOpen}
                        setarLista={atualizarListaProdutos}
                        id={product.id}
                        photo={product.img}
                        name={product.nome}
                        price={product.preco}
                        amount={product.detalhes_dos_produtos[0].quantidade}
                      />
                    ) : (
                      <ProdutoItemGrid
                        categoriesAndSubCategories={catchCategorias}
                        snackbarOpenEdit={snackbarEditOpen}
                        setSnackbarEditOpen={setSnackbarEditOpen}
                        snackbarDeleteOpen={snackbarDeleteOpen}
                        setSnackbarDeleteOpen={setSnackbarDeleteOpen}
                        snackbarErrorOpen={snackbarErrorOpen}
                        setSnackbarErrorOpen={setSnackbarErrorOpen}
                        setarLista={atualizarListaProdutos}
                        id={product.id}
                        key={`grid_${product.id}`}
                        photo={product.img}
                        name={product.nome}
                        subcategoria={product.categoria.sub_categoria.nome}
                        price={product.preco}
                        amount={product.detalhes_dos_produtos[0].quantidade}
                      />
                    )
                  )
                ) : (
                  <div>
                    {' '}
                    Hmm, parece que você ainda não tem nenhum produto
                    cadastrado.
                  </div>
                )}
              </ul>
            </div>
          </main>
        </section>
      </div>
    </>
  );
};

export default EmpresaProdutosScreen;
