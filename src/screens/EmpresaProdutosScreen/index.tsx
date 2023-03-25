import styles from './EmpresaProdutosScreen.module.scss';
import MenuLateralEmpresa from '../../patterns/MenuLateralEmpresa';
import EmpresaBanner from '../../components/EmpresaBanner';
import ModalAddProduto from '../../components/Modais/modalAddProduto';
import Banner from '../../../public/images/banner.png';
import { useEffect, useState } from 'react';
import http from '../../http';
import ItemMenuLateral from '../../components/itemMenuLateral';
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
          {/* <div> */}
          <ul className={styles.products__list}>
            <ul className={styles.products__list}>
              {products.map((product) => (
                <ProdutoLista
                  key={product.id}
                  photo={product.url}
                  name={product.nome}
                  price={product.preco}
                  amount={product.unidades}
                />
              ))}
            </ul>
          </ul>
          {/* </div> */}
        </main>
      </section>
    </div>
  );
};

export default EmpresaProdutosScreen;