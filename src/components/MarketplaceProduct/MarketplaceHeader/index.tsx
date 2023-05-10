import { Avatar } from '@mui/material';
import MiniSearchBar from '../../MiniSearchBar';
import styles from './MarketplaceHeader.module.scss'
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import Carrinho from 'components/Carrinho';
import { BsBag } from 'react-icons/bs';



interface MarketplaceHeaderProps{
    quantidade: number
}


const MarketplaceHeader = ({quantidade}: MarketplaceHeaderProps) => {
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [qtdProdutosCarrinho, setQtdProdutosCarrinho] = useState(0)



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
        setQtdProdutosCarrinho(quantidade)
    }, []);

    const acionarCarrinho = () => {
        setIsCartVisible(true);
    };


    return (
        <header className={styles.header}>
            <div ref={carrinhoRef}>
                {isCartVisible ? <Carrinho quantidadeDeProdutos={quantidade} isCartAtivado={isCartVisible} /> : ""}
            </div>
            <div className={styles.searchbar_and_avatar}>
                <MiniSearchBar />
                <Avatar />
                <button
                    onClick={acionarCarrinho}
                    className={styles.buttonCart}
                >
                    <BsBag />
                    <span className={styles.buttonCart__quantidadeProdutos}>{quantidade}</span>
                </button>
            </div>
        </header>
    )
}

export default MarketplaceHeader;