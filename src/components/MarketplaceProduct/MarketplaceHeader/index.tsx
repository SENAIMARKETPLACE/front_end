import { Avatar } from "@mui/material";
import MiniSearchBar from "../../MiniSearchBar";
import styles from "./MarketplaceHeader.module.scss";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import Carrinho from "components/Carrinho";
import { BsBag } from "react-icons/bs";
import { IProdutoGet } from "compartilhado/IProdutoGet";
import { useRouter } from "next/router";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

interface MarketplaceHeaderProps {
  quantidade: number;
  produtoDesejadoNoCarrinho?: IProdutoGet;
  setarListaProdutos?: (novoArray: IProdutoGet[]) => void;
  setarQuantidade?: (novaQuantidade: number) => void;
}

const MarketplaceHeader = ({
  quantidade,
  produtoDesejadoNoCarrinho,
  setarListaProdutos,
  setarQuantidade,
}: MarketplaceHeaderProps) => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const router = useRouter();
  const { id } = router.query;

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

  return (
    <header className={styles.header}>
      {id && (
        <button onClick={voltarPaginaAnterior} className={styles.buttonCart__returnAPage}><MdOutlineArrowBackIosNew/></button>
      )}
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
          ""
        )}
      </div>
      <div className={styles.searchbar_and_avatar}>
        <MiniSearchBar />
        <Avatar className={styles.buttonCart__avatar} />
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
