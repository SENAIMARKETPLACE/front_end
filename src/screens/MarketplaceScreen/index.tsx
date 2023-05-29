import EmpresaBanner from '../../components/EmpresaBanner';
import MenuLateralUsuario from '../../patterns/MenuLateralUsuario';
import styles from './Martketplace.module.scss';
import Banner from '../../../public/images/banner_user.png';
import { Avatar } from '@mui/material';
import MiniSearchBar from '../../components/MiniSearchBar';
import ProdutoCategoria from '../../components/ProdutoCategoria';
import UsuarioProduto from '../../components/UsuarioProduto';
import 'swiper/css';
import { EmblaCarousel } from '../../components/CarouselProducts';
import FooterSollaris from '../../layout/Footer';
import { useEffect, useRef, useState } from 'react';
import { httpApiMockada } from '../../http';
import { MdShoppingCart } from 'react-icons/md';
import { BsBag } from 'react-icons/bs';
import Carrinho from '../../components/Carrinho';
import MarketplaceHeader from 'components/MarketplaceProduct/MarketplaceHeader';
import Link from 'next/link';
import MarketplaceProduto from 'pages/marketplace-produto/[id]';
import LayoutMarketplace from 'layout/LayoutMarketplace';
import MarketplaceHome from 'screens/MarketplaceHome';

const MarketplaceScreen = () => {
  const [products, setProducts] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [aberto, setAberto] = useState(false);
  const ref = useRef();
  const [quantidade, setQuantidade] = useState<number>(0);

  useEffect(() => {
    const storedQuantity = localStorage.getItem('qtdProduto');
    if (storedQuantity) {
      setQuantidade(Number(JSON.parse(storedQuantity)));
    }
  }, []);

  const carrinhoRef = useRef<HTMLDivElement>(null);
  // let qtdProdutos = null

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
      document.addEventListener('mousedown', ClickForaCarrinho);
    } else {
      document.removeEventListener('mousedown', ClickForaCarrinho);
    }
    return () => {
      document.removeEventListener('mousedown', ClickForaCarrinho);
    };
  }, [isCartVisible]);

  // RECALCULAR QUANTIDADE AO EXCLUIR DO CARRINHO
  const setarQuantidadeFuncao = (novaQuantidade: number) => {
    setQuantidade(novaQuantidade);
  };

  useEffect(() => {
    localStorage.setItem('qtdProduto', `${quantidade}`);
  }, [quantidade]);

  const acionarCarrinho = () => {
    setIsCartVisible(true);
  };

  return (
    <>
      <LayoutMarketplace quantidade={quantidade}>
        <MarketplaceHome />
      </LayoutMarketplace>
      {/* <MarketplaceHeader
        quantidade={quantidade}
        setarQuantidade={setarQuantidadeFuncao}
      />
      <section className={styles.mainContent}>
        <MenuLateralUsuario />
        <LayoutMainMarketPlace />
      </section>
      <FooterSollaris /> */}
    </>
  );
};

export default MarketplaceScreen;
