import MenuLateralUsuario from '../../patterns/MenuLateralUsuario';
import styles from './MartketplaceProduto.module.scss';
import 'swiper/css';
import FooterSollaris from '../../layout/Footer';
import MarketplaceHeader from '../../components/MarketplaceProduct/MarketplaceHeader';
import ProductView from '../../components/MarketplaceProduct/ProductView';
import { useEffect, useState } from 'react';
import { httpApiMockada, httpProduto } from '../../http/index';
import { IProdutoGet } from 'compartilhado/IProdutoGet';
import gifLoading from '../../../public/gifs/load.gif';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useRouter } from 'next/router';

const MarketplaceProdutoScreen = () => {
  const [produto, setProduto] = useState<IProdutoGet>();
  const [produtoAserAdicionado, setProdutoAserAdicionado] =
    useState<IProdutoGet>();
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  const id = router.query.id;
  const [quantidade, setQuantidade] = useState(0);

  const [arrayProdutosCarrinhoLS, setArrayProdutosCarrinhoLS] = useState<
    IProdutoGet[]
  >([]);

  //ATUALIZAR ESSE STATE APÓS DELETAR UM PRODUTO DO CARRINHO
  const setarNovoArrayProdutos = (novoArray: IProdutoGet[]) => {
    setArrayProdutosCarrinhoLS(novoArray);
  };

  // RECALCULAR QUANTIDADE AO EXCLUIR DO CARRINHO
  const setarQuantidadeFuncao = (novaQuantidade: number) => {
    setQuantidade(novaQuantidade);
  };

  const enviarProdutoAoCarrinho = (produto: IProdutoGet) => {
    if (arrayProdutosCarrinhoLS) {
      const arrayTemp = [...arrayProdutosCarrinhoLS]; // Certifique-se de que arrayProdutosCarrinhoLS seja um array
      console.log(arrayTemp);
      const existeProduto = arrayProdutosCarrinhoLS.find(
        (item) => item.id === produto.id
      );

      if (existeProduto) {
        //ESSE MAP, ACESSA DIRETAMENTE O OBJETO A SER ALTERADO CASO EXISTA ESSE PRODUTO NO CARRINHO
        const arrayTemp = arrayProdutosCarrinhoLS.map((item) =>
          item.id === produto.id
            ? { ...item, quantidadeCarrinho: item.quantidadeCarrinho + 1 }
            : item
        );
        setArrayProdutosCarrinhoLS(arrayTemp);
      } else {
        setArrayProdutosCarrinhoLS([...arrayTemp, produto]);
      }
    } else {
      setArrayProdutosCarrinhoLS([produto]);
    }
  };

  const aumentarQtd = () => {
    setQuantidade(quantidade + 1);
  };

  const resgataInformacoesProduto = (parametro: string | string[]) => {
    if (parametro) {
      httpApiMockada
        .get(`/produto-get/${parametro}`)
        .then((response) => {
          setProduto(response.data);
        })
        .catch((erro) => console.log(erro));
    }
  };

  useEffect(() => {
    resgataInformacoesProduto(id);
    if (typeof localStorage !== 'undefined') {
      const storedQuantity = localStorage.getItem('qtdProduto');
      const storedProductsInCart = JSON.parse(
        localStorage.getItem('productsInCart')
      );
      if (storedProductsInCart) {
        setArrayProdutosCarrinhoLS(storedProductsInCart);
      }
      if (storedQuantity) {
        setQuantidade(Number(JSON.parse(storedQuantity)));
      }
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem('qtdProduto', `${quantidade}`);
    localStorage.setItem(
      'productsInCart',
      `${JSON.stringify(arrayProdutosCarrinhoLS)}`
    );
    const timeout = setTimeout(() => {
      setShowLoading(true);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [quantidade]);

  const voltarPaginaAnterior = () => {
    router.back();
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.content}>
        <section className={styles.marketplace}>
         
          <div className={styles.marketplace__return}>
            <MdOutlineArrowBackIosNew
              size={30}
              onClick={voltarPaginaAnterior}
              className={styles.marketplace__returnBtn}
            />
          </div>
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
    </div>
  );
};

export default MarketplaceProdutoScreen;
