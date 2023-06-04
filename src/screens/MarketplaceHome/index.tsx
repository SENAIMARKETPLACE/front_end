import EmpresaBanner from 'components/EmpresaBanner';
import ProdutoCategoria from 'components/ProdutoCategoria';
import styles from './MarketplaceHome.module.scss';
import UsuarioProduto from 'components/UsuarioProduto';
import { useEffect, useState } from 'react';
import Banner from '../../../public/images/banner_user.png';
import { httpApiMockada, httpProduto } from '../../http';
import BannerCarousel from 'components/Carousel/BannerCarousel';
import CategoriesCarousel from 'components/Carousel/CategoriesCarousel';
import { Blockquote, Center } from '@mantine/core';
import ProductsCarousel from 'components/Carousel/ProductsCarousel';
// import { Button } from '@mui/material';
import { Button } from '@mui/material';
//

const MarketplaceHome = () => {
  const [products, setProducts] = useState([]);

  // const qtdProduto = localStorage.getItem("qtdProduto")

  async function getProducts() {
    try {
      const response = await httpApiMockada.get('/produto-get');
      console.log(response);
      setProducts(response.data);
      console.log(products);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className={styles.marketplace}>
      <main className={styles.main_content}>
        <BannerCarousel />

        {/* Filtro por categorias */}
        <section>
          <h2 className={styles.section__title}>
            Explore Categorias Populares
          </h2>
          <CategoriesCarousel />
        </section>

        {/* Produtos com base na lista de interesses */}
        <section>
          <h2 className={styles.section__title}>Produtos para você</h2>
          <ProductsCarousel products={products} />
        </section>

        <section>
          <h2 className={styles.section__title}>Inspire-se</h2>
          <Blockquote cite="– Aristóteles" mt={'md'}>
            A felicidade e a saúde são incompatíveis com a ociosidade.
          </Blockquote>
        </section>

        {/* Produtos de categorias não selecionadas */}
        <section>
          <h2 className={styles.section__title}>Produtos em alta</h2>
          <ProductsCarousel products={products} />
        </section>

        <Center mt={'md'}>
          <Button
            size="large"
            onClick={() =>
              alert(
                'Ir para a página de filtro, mas sem nenhum filtro aplicado. A intenção é listar mais produtos.'
              )
            }
          >
            Veja mais!
          </Button>
        </Center>
      </main>
    </section>
  );
};
export default MarketplaceHome;
