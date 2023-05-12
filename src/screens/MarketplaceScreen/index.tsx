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
import MarketplaceHeader from "components/MarketplaceProduct/MarketplaceHeader";
import LayoutMainMarketPlace from "./LayoutMainMarketplace";
import Link from "next/link";
import { Route, Router, Routes } from "react-router-dom";
import MarketplaceProduto from "pages/marketplace-produto/[id]";

const MarketplaceScreen = () => {
  const [products, setProducts] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [qtdProdutosCarrinho, setQtdProdutosCarrinho] = useState("0");
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

  useEffect(() => {
    setQtdProdutosCarrinho("2");
  }, []);

  const acionarCarrinho = () => {
    setIsCartVisible(true);
  };

  return (
    <>
      <MarketplaceHeader quantidade={0}/>
      <section className={styles.mainContent}>
        <MenuLateralUsuario />
        <LayoutMainMarketPlace />
      </section>
      <FooterSollaris />
    </>
  );
};

export default MarketplaceScreen;
