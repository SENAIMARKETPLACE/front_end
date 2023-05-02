import EmpresaBanner from "../../components/EmpresaBanner";
import MenuLateralUsuario from "../../patterns/MenuLateralUsuario";
import styles from "./Martketplace.module.scss";
import Banner from "../../../public/images/banner_user.png";
import { Avatar } from "@mui/material";
import MiniSearchBar from "../../components/MiniSearchBar";
import ProdutoCategoria from "../../components/ProdutoCategoria";
import UsuarioProduto from "../../components/UsuarioProduto";
import "swiper/css";
import { EmblaCarousel } from "../../components/CarouselProducts";
import FooterSollaris from "../../layout/Footer";
import { useEffect, useRef, useState } from "react";
import { httpApiMockada } from "../../http";
import { MdShoppingCart } from "react-icons/md";
import { BsBag } from "react-icons/bs";
import Carrinho from "../../components/Carrinho";

const MarketplaceScreen = () => {
  const [products, setProducts] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const [aberto, setAberto] = useState(false);
  const ref = useRef();

  const carrinhoRef = useRef<HTMLDivElement>(null);

  function ClickForaCarrinho(event: MouseEvent) {
    if (
      carrinhoRef.current &&
      !carrinhoRef.current.contains(event.target as Node)
    ) {
      setIsCartVisible(false);
    }
  }

  useEffect(() => {
    if (isCartVisible) {
      document.addEventListener("mousedown", ClickForaCarrinho);
    } else {
      document.removeEventListener("mousedown", ClickForaCarrinho);
    }
    return () => {
      document.removeEventListener("mousedown", ClickForaCarrinho);
    };
  }, [isCartVisible]);

  async function getProducts() {
    try {
      const response = await httpApiMockada.get("produto-get");
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

  const acionarCarrinho = () => {
    setIsCartVisible(true);
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.content}>
        <div ref={carrinhoRef}>
          {isCartVisible ? <Carrinho isCartAtivado={isCartVisible} /> : ""}
        </div>

        <MenuLateralUsuario />
        <section className={styles.marketplace}>
          <header className={styles.header}>
            <h2>
              Olá João, <br></br> Veja o que temos para você hoje{" "}
            </h2>
            <div className={styles.searchbar_and_avatar}>
              <MiniSearchBar />
              <Avatar alt="Remy Sharp" src="" />
              <button
                onClick={acionarCarrinho}
                className={styles.searchbar_and_avatar__buttonCart}
              >
                <BsBag />
                <p className={styles.buttonCart__quantidadeProdutos}>2</p>
              </button>
            </div>
          </header>

          <p className={styles.banner_text}>Encontre sua velocidade</p>
          <EmpresaBanner image={Banner} alt="Capa da empresa" />
          <main className={styles.main_content}>
            <h2 className={styles.section__title}>
              Explore Categorias Populares
            </h2>
            <div className={styles.categories}>
              <ProdutoCategoria />
              <ProdutoCategoria />
              <ProdutoCategoria />
            </div>

            <h2 className={styles.section__title}>Produtos para você</h2>
            <section className={styles.products_list}>
              {products.map((product) => (
                <UsuarioProduto
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
                  image={product.img}
                  name={product.nome}
                  price={product.preco}
                />
              ))}
            </section>
          </main>
        </section>
      </div>
      <FooterSollaris />
    </div>
  );
};

export default MarketplaceScreen;
