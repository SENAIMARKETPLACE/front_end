import { useEffect, useRef, useState } from "react";
import styles from "./MarketplaceFinalizarCompra.module.scss";
import MarketplaceHeader from "components/MarketplaceProduct/MarketplaceHeader";
import LayoutMainMarketPlace from "screens/MarketplaceScreen/LayoutMainMarketplace";
import FooterSollaris from "layout/Footer";
import FinalizarCompra from "screens/MarketplaceScreen/FinalizarCompra";
import MenuLateralUsuario from "patterns/MenuLateralUsuario";

const MarketplaceFinalizarCompraScreen = () => {
  const [products, setProducts] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [aberto, setAberto] = useState(false);
  const ref = useRef();
  const [quantidade, setQuantidade] = useState<number>(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const storedQuantity = localStorage.getItem("qtdProduto");
    if (storedQuantity) {
      setQuantidade(Number(JSON.parse(storedQuantity)));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 880);
    };

    handleResize(); // Define o estado inicial

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const acionarCarrinho = () => {
    setIsCartVisible(true);
  };

  const setarQuantidadeAoExcluir = (novaQuantidade: number) => {
    setQuantidade(novaQuantidade);
  };

  useEffect(() => {
    localStorage.setItem("qtdProduto", `${quantidade}`);
  }, [quantidade]);

  return (
    <>
      <MarketplaceHeader quantidade={quantidade} />
      <section className={styles.mainContent}>
        <FinalizarCompra
          setarQuantidadeAoExcluirProps={setarQuantidadeAoExcluir}
        />
      </section>
      <FooterSollaris />
    </>
  );
};

export default MarketplaceFinalizarCompraScreen;
