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
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  const id = router.query.id;


  const[quantidade, setQuantidade] = useState(0); 

  const aumentarQtd = () => {
    setQuantidade(quantidade + 1)
  }



  const resgataInformacoesProduto = (parametro: string | string[]) => {
    if (parametro) {
      httpApiMockada
        .get(`produto-get/${parametro}`)
        .then((response) => {
          console.log(response.data);
          setProduto(response.data);
        })
        .catch((erro) => console.log(erro));
    }
  };

  useEffect(() => {
    resgataInformacoesProduto(id);
    const timeout = setTimeout(() => {
      setShowLoading(true);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [id]);

  return (
    <div className={styles.page_container}>
      <div className={styles.content}>
        <section className={styles.marketplace}>
          <MarketplaceHeader quantidade={quantidade}/>
          {!produto || !showLoading ? (
            <div className={styles.marketplace__loadingAnimation}>
              <img src={gifLoading.src} alt="Loading Gif" />
            </div>
          ) : (
            <ProductView
              name={produto.nome}
              description={produto.descricao}
              price={produto.preco}
              image={produto.img}
              gender={produto.publico}
              colors={produto.detalhes_dos_produtos[0].cor}
              sizes={produto.detalhes_dos_produtos[0].tamanho}
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
