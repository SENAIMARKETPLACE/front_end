import MenuLateralUsuario from "../../patterns/MenuLateralUsuario";
import styles from "./MartketplaceProduto.module.scss";
import "swiper/css";
import FooterSollaris from "../../layout/Footer";
import MarketplaceHeader from "../../components/MarketplaceProduct/MarketplaceHeader";
import ProductView from "../../components/MarketplaceProduct/ProductView";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { httpApiMockada } from "../../http/index";
import { IProdutoGet } from "compartilhado/IProdutoGet";
import gifLoading from "../../../public/gifs/load.gif";

const MarketplaceProdutoScreen = () => {
  const [produto, setProduto] = useState<IProdutoGet>();
  const [produtoAserAdicionado, setProdutoAserAdicionado] = useState<
    IProdutoGet
  >();
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  const id = router.query.id;
  const [quantidade, setQuantidade] = useState(0);

  const [arrayProdutosCarrinhoLS, setArrayProdutosCarrinhoLS] = useState([]);

  const enviarProdutoAoCarrinho = (produto: IProdutoGet) => {
    if (arrayProdutosCarrinhoLS) {
      const arrayTemp = [...arrayProdutosCarrinhoLS]; // Certifique-se de que arrayProdutosCarrinhoLS seja um array
      setArrayProdutosCarrinhoLS([...arrayTemp, produto]);
    }else{
      setArrayProdutosCarrinhoLS([produto]);
    }     
  };

  const aumentarQtd = () => {
    setQuantidade(quantidade + 1);
    enviarProdutoAoCarrinho(produto);
  };

  const resgataInformacoesProduto = (parametro: string | string[]) => {
    if (parametro) {
      httpApiMockada
        .get(`produto-get/${parametro}`)
        .then((response) => {
          setProduto(response.data);
        })
        .catch((erro) => console.log(erro));
    }
  };

  useEffect(() => {
    resgataInformacoesProduto(id);
    if (typeof localStorage !== "undefined") {
      const storedQuantity = localStorage.getItem("qtdProduto");
      const storedProductsInCart = JSON.parse(localStorage.getItem("productsInCart"));
      if (storedProductsInCart) {
        setArrayProdutosCarrinhoLS(storedProductsInCart);
      }
      if (storedQuantity) {
        setQuantidade(Number(JSON.parse(storedQuantity)));
      }
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem("qtdProduto", `${quantidade}`);
    localStorage.setItem(
      "productsInCart",
      `${JSON.stringify(arrayProdutosCarrinhoLS)}`
    );
    const timeout = setTimeout(() => {
      setShowLoading(true);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [quantidade]);

  return (
    <div className={styles.page_container}>
      <div className={styles.content}>
        <section className={styles.marketplace}>
          <MarketplaceHeader
            quantidade={quantidade}
            produtoDesejadoNoCarrinho={
              produtoAserAdicionado ? produtoAserAdicionado : undefined
            }
          />
          {!produto || !showLoading ? (
            <div className={styles.marketplace__loadingAnimation}>
              <img src={gifLoading.src} alt="Loading Gif" />
            </div>
          ) : (
            <ProductView
              enviarProdutoAoCarrinho={enviarProdutoAoCarrinho}
              produto={produto}
              agregarProduto={aumentarQtd}
            />
          )}
        </section>
      </div>
      <FooterSollaris />
    </div>
  );
};

export default MarketplaceProdutoScreen;
