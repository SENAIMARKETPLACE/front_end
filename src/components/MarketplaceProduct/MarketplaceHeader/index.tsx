import { Avatar } from '@mui/material';
import MiniSearchBar from '../../MiniSearchBar';
import styles from './MarketplaceHeader.module.scss';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import Carrinho from 'components/Carrinho';
import { BsBag } from 'react-icons/bs';
import { IProdutoGet } from 'compartilhado/IProdutoGet';
import { useRouter } from 'next/router';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { Burger, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Group, Button } from '@mantine/core';
import AvatarIcon from 'components/Avatar';
import LogoSollaris from '/public/images/logo.svg';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconHeart,
} from '@tabler/icons-react';
import Link from 'next/link';

interface MarketplaceHeaderProps {
  isLogged: boolean;
  quantidade: number;
  produtoDesejadoNoCarrinho?: IProdutoGet;
  setarListaProdutos?: (novoArray: IProdutoGet[]) => void;
  setarQuantidade?: (novaQuantidade: number) => void;
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  quantidade,
  produtoDesejadoNoCarrinho,
  setarListaProdutos,
  setarQuantidade,
  isLogged,
}) => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const router = useRouter();
  const { id } = router.query;

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
      document.addEventListener('mousedown', ClickForaCarrinho);
    } else {
      document.removeEventListener('mousedown', ClickForaCarrinho);
    }
    return () => {
      document.removeEventListener('mousedown', ClickForaCarrinho);
    };
  }, [isCartVisible]);

  const acionarCarrinho = () => {
    setIsCartVisible(true);
  };

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__rightIcons}>
        {windowWidth < 850 && <ResponsiveSideBar />}
      </div>
      <div ref={carrinhoRef}>
        {isCartVisible && (
          <Carrinho
            setarQuantidade={setarQuantidade}
            setarListaProdutos={setarListaProdutos}
            quantidadeDeProdutos={quantidade}
            isCartAtivado={isCartVisible}
            produtoDesejadoNoCarrinho={produtoDesejadoNoCarrinho}
          />
        )}
      </div>
      <div className={styles.searchbar_and_avatar}>
        {windowWidth > 600 && <MiniSearchBar />}
        <AvatarIcon isLogged={isLogged} />
        <button onClick={acionarCarrinho} className={styles.buttonCart}>
          <BsBag />
          <span className={styles.buttonCart__quantidadeProdutos}>
            {quantidade}
          </span>
        </button>
      </div>
    </header>
  );
};

export default MarketplaceHeader;

function ResponsiveSideBar() {
  const [opened, { open, close }] = useDisclosure(false);

  const [openedBurguer, { toggle }] = useDisclosure(false);
  const label = opened ? 'Close navigation' : 'Open navigation';

  const mockdata = [
    { icon: IconHome2, label: 'Início', path: '/marketplace' },
    { icon: IconCalendarStats, label: 'Pedidos', path: '/pedidos' },
    { icon: IconHeart, label: 'Favoritos', path: '/favoritos' },
    { icon: IconUser, label: 'Perfil', path: '/perfil' },
  ];

  return (
    <>
      <Drawer
        size="320px"
        opened={opened}
        onClose={close}
        className={styles.drawer}
      >
        <Center>
          <Link href={'/marketplace'}>
            <img src={LogoSollaris.src} alt="Logo do Sollaris" />
          </Link>
        </Center>
        <Center mt={40}>
          <MiniSearchBar />
        </Center>

        <ul className={styles.drawer__list}>
          {mockdata.map((link) => (
            <Link href={link.path} key={link.label}>
              <li key={link.label}>{link.label}</li>
            </Link>
          ))}
        </ul>
      </Drawer>

      <Burger
        opened={opened}
        onClick={open}
        aria-label={label}
        size={'sm'}
        color="#5f78e7"
      />
    </>
  );
}
