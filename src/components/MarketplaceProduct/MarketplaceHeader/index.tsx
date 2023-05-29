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
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';
import AvatarIcon from 'components/Avatar';
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

interface MarketplaceHeaderProps {
  isLogged: boolean;
  quantidade?: number;
  produtoDesejadoNoCarrinho?: IProdutoGet;
  setarListaProdutos?: (novoArray: IProdutoGet[]) => void;
  setarQuantidade?: (novaQuantidade: number) => void;
}

const MarketplaceHeader = ({
  quantidade,
  produtoDesejadoNoCarrinho,
  setarListaProdutos,
  setarQuantidade,
  isLogged,
}: MarketplaceHeaderProps) => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? 'Close navigation' : 'Open navigation';

  const voltarPaginaAnterior = () => {
    router.back();
  };

  const acionarCarrinhoPorOutroComponente = (novoEstado: boolean) => {
    setIsCartVisible(novoEstado);
  };

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

  return (
    <header className={styles.header}>
      <div className={styles.header__rightIcons}>
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label={label}
          size={'sm'}
          color="#5f78e7"
        />
      </div>
      <div ref={carrinhoRef}>
        {isCartVisible ? (
          <Carrinho
            setarQuantidade={setarQuantidade}
            setarListaProdutos={setarListaProdutos}
            quantidadeDeProdutos={quantidade}
            isCartAtivado={isCartVisible}
            produtoDesejadoNoCarrinho={produtoDesejadoNoCarrinho}
          />
        ) : (
          ''
        )}
      </div>
      <div className={styles.searchbar_and_avatar}>
        <MiniSearchBar />
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
