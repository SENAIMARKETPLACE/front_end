import styles from "./EmpresaProdutosScreen.module.scss";
import MenuLateralEmpresa from "../../patterns/MenuLateralEmpresa";
import EmpresaBanner from "../../components/EmpresaBanner";
import ModalAddProduto from "../../components/Modais/modalAddProduto";
import Banner from "../../../public/images/banner.png";
import { useEffect, useState } from "react";
import http from "../../http";
import ProdutoLista from "../../components/EmpresaProduto/ProdutoItemLista";
import SearchBar from "../../components/SearchBar";
import ToggleBtn from "../../components/Buttons/ToggleButton";
import StatusAlert from "../../components/StatusMsg/SucessMsg";
import ContextProdutos from "./ContextProdutos";

 
type ProdutosType = {
  listaProdutos: string[]
}

type PropsProductsContext = {
  products: ProdutosType;
  setProducts: React.Dispatch<React.SetStateAction<ProdutosType>>;
}



const EmpresaProdutosScreen = () => {
  const [products, setProducts] = useState([]);
  async function getProducts() {
    try {
      const response = await http.get("produtos");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function atualizarListaProdutos(novaLista: string[]): void {
    setProducts(novaLista);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.page_container}>
      <MenuLateralEmpresa />
      <section>
        <EmpresaBanner image={Banner} alt="Capa da empresa" />
        <main className={styles.main_content}>
          <div className={styles.title_container}>
            <h1 className={styles.title}>Meus Produtos</h1>
            <ModalAddProduto setarLista={atualizarListaProdutos} />
          </div>
          <div className={styles.searchAndFilter}>
            <SearchBar />
            <ToggleBtn />
            <StatusAlert />
          </div>
          <ul className={styles.products__list}>
            <ul className={styles.products__list}>
              {products.map((product) => (
                  <ProdutoLista
                    id={product.id}
                    key={product.id}
                    photo={product.url_imagem}
                    name={product.nome_produto}
                    price={product.preco}
                    amount={product.quantidade}
                  />
              ))}
            </ul>
          </ul>
        </main>
      </section>
    </div>
  );
};

export default EmpresaProdutosScreen;
