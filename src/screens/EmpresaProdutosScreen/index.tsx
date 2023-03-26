import styles from './EmpresaProdutosScreen.module.scss';
import MenuLateralEmpresa from '../../patterns/MenuLateralEmpresa';
import EmpresaBanner from '../../components/EmpresaBanner';
import ModalAddProduto from '../../components/Modais/modalAddProduto';
import Banner from '../../../public/images/banner.png';
import { useEffect, useState } from 'react';
import http from '../../http';
import ProdutoLista from '../../components/EmpresaProduto/ProdutoItemLista';

const EmpresaProdutosScreen = () => {
  async function getProducts() {
    try {
      const response = await http.get('produtos');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  // const exibirIdSelecionado = (produtoSelecionado: React.Component) => {
  //   return console.log(produtoSelecionado)
  // };

  function enviarID(e: React.MouseEvent<HTMLButtonElement>) {
    return console.log(e.target);
  }

  return (
    <div className={styles.page_container}>
      <MenuLateralEmpresa />
      <section>
        <EmpresaBanner image={Banner} alt="Capa da empresa" />
        <main className={styles.main_content}>
          <div className={styles.title_container}>
            <h1 className={styles.title}>Meus Produtos</h1>
            <ModalAddProduto />
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
