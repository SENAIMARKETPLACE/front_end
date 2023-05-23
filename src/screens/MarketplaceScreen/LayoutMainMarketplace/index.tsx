import EmpresaBanner from "components/EmpresaBanner";
import ProdutoCategoria from "components/ProdutoCategoria";
import styles from "./LayoutMainMarketplace.module.scss";
import UsuarioProduto from "components/UsuarioProduto";
import { useEffect, useState } from "react";
import Banner from "../../../../public/images/banner_user.png";
import { httpApiMockada, httpProduto } from "../../../http/index";


const LayoutMainMarketPlace = () => {
  const [products, setProducts] = useState([]);

  // const qtdProduto = localStorage.getItem("qtdProduto")



  
  async function getProducts() {
    try {
      const response = await httpProduto.get("/api/products");
      console.log(response);
      setProducts(response.data.content);
      console.log(products);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts()

  }, [])

  return (
    <section className={styles.marketplace}>
      <main className={styles.main_content}>
        <p className={styles.banner_text}>Encontre sua velocidade</p>
        <EmpresaBanner image={Banner} alt="Capa da empresa" />
        <h2 className={styles.section__title}>Explore Categorias Populares</h2>
        <div className={styles.categories}>
          <ProdutoCategoria />
          <ProdutoCategoria />
          <ProdutoCategoria />
        </div>

        <h2 className={styles.section__title}>Produtos para você</h2>
        <section className={styles.products_list}>
          {products.map((product) => (
            <UsuarioProduto
              id={product.id}
              image={product.img}
              name={product.nome}
              price={product.preco}
            />
          ))}
        </section>

        <h2 className={styles.section__title}>
          Produtos mais visitados da semana
        </h2>
        <p>Em breve...</p>
        {/* <EmblaCarousel /> */}

        <h2 className={styles.section__title}>Suplementos</h2>
        <section className={styles.products_list}>
          {products.map((product) => (
            <UsuarioProduto
              id={product.id}
              image={product.img}
              name={product.nome}
              price={product.preco}
            />
          ))}
        </section>
      </main>
    </section>
  );
};
export default LayoutMainMarketPlace;
