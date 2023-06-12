import { useRouter } from 'next/router';
import styles from './SearchScreen.module.scss';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { httpApiMockada } from '../../http';
import UsuarioProduto from 'components/UsuarioProduto';

const SearchScreen = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const nome = router.query.nome;

  const voltarPaginaAnterior = () => {
    router.back();
  };

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
    <div>
      <div className={styles.marketplace__return}>
        <MdOutlineArrowBackIosNew
          size={30}
          onClick={voltarPaginaAnterior}
          className={styles.marketplace__returnBtn}
        />
        <h2 className={styles.title}>Produtos encontrados</h2>
        <section className={styles.products}>
          {products.map((product) => (
            <UsuarioProduto
              key={product.nome}
              id={product.id}
              image={product.img}
              name={product.nome}
              price={product.preco}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default SearchScreen;
