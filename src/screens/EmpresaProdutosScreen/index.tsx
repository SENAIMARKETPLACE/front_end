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
import { httpProduto } from "../../http";

 



const EmpresaProdutosScreen = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false); 
  const [mensagem, setMensagem] = useState(""); 


  async function getProducts() {
    try {
      const response = await httpProduto.get("/api/products");
      setProducts(response.data.content)
    } catch (error) {
      console.error(error);
    }
  }

  function atualizarListaProdutos(novaLista: string[]): void {
    setProducts(novaLista);
  }

  function setarMensagemEEstadoRequisicao(isOpenProps: boolean, mensagemProps: string): void {
    setIsOpen(isOpenProps)
    setMensagem(mensagemProps)
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
            <ModalAddProduto setarLista={atualizarListaProdutos} setarMensagemEEstadoRequisicao={setarMensagemEEstadoRequisicao} />
          </div>
          <div className={styles.searchAndFilter}>
            <SearchBar />
            <ToggleBtn />
            <StatusAlert isOpen={isOpen} mensagem={mensagem}/>
          </div>
          <ul className={styles.products__list}>
            <ul className={styles.products__list}>
              {products.map((product) => (
                    <ProdutoLista
                      setarLista={atualizarListaProdutos}
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
