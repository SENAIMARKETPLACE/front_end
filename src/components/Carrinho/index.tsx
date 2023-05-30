// Caligrafia Téncina | Tipos de Linhas caracteristicas e funções | Perspectivas | Cotas |

import { useEffect, useState } from "react";
import CardProdutoCarrinho from "./CardProdutoCarrinho";
import styles from "./Carrinho.module.scss";
import { IProdutoGet } from "compartilhado/IProdutoGet";
import Link from "next/link";
import { IoMdCloseCircle } from 'react-icons/io';

interface CarrinhoProps {
  isCartAtivado: boolean;
  quantidadeDeProdutos: number;
  produtoDesejadoNoCarrinho?: IProdutoGet;
  setarListaProdutos: (novoArray: IProdutoGet[]) => void;
  setarQuantidade: (novaQuantidade: number) => void;
}

const Carrinho = ({
  isCartAtivado,
  quantidadeDeProdutos,
  produtoDesejadoNoCarrinho,
  setarListaProdutos,
  setarQuantidade,
}: CarrinhoProps) => {
  const [arrayProdutosDesejados, setArrayProdutosDesejados] = useState<
    IProdutoGet[]
  >([]);
  const [idExcluir, setIdExcluir] = useState("0");
  const [valorTotal, setValorTotal] = useState<string>("");
  const [quantidade, setQuantidade] = useState(0);

  const calcularOValorTotal = () => {
    let somaTotal = 0.0;
    let valorFormatado = "";
    arrayProdutosDesejados.forEach((produto) => {
      const preco = Number(produto.preco);
      const quantidade = produto.quantidadeCarrinho;
      const subtotal = preco * quantidade;
      somaTotal += subtotal;
      valorFormatado = somaTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    });

    return valorFormatado;
  };

  const recalcularQuantidade = () => {
    let quantidadeTemp = 0;
    arrayProdutosDesejados.forEach((produto) => {
      quantidadeTemp += produto.quantidadeCarrinho;
    });

    return quantidadeTemp;
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const arrayProductsInCart = JSON.parse(
        localStorage.getItem("productsInCart")
      );
      if (arrayProductsInCart) {
        setArrayProdutosDesejados([
          ...arrayProdutosDesejados,
          ...arrayProductsInCart,
        ]);
      }
    }
  }, []);

  useEffect(() => {
    if (idExcluir != "0") {
      const carrinhoAtualizado = arrayProdutosDesejados.filter(
        (produto) => produto.id != idExcluir
      );
      setArrayProdutosDesejados(carrinhoAtualizado);

      const carrinhoString = JSON.stringify(carrinhoAtualizado);
      localStorage.setItem("productsInCart", carrinhoString);
    }
  }, [idExcluir]);

  useEffect(() => {
    if (typeof setarListaProdutos === "function") {
      setarListaProdutos(arrayProdutosDesejados);
    }
  }, [arrayProdutosDesejados, setarListaProdutos]);

  useEffect(() => {
    const novoValor = calcularOValorTotal();
    const novaQuantidade = recalcularQuantidade();
    if (typeof setarQuantidade === "function") {
      setarQuantidade(novaQuantidade);
    }
    setValorTotal(novoValor);
    setQuantidade(novaQuantidade);
  }, [arrayProdutosDesejados]);

  const obterProdutoExcluir = (id: string) => {
    setIdExcluir(id);
  };

  return (
    <div
      className={
        styles.carrinho +
        " " +
        `{${isCartAtivado ? styles.carrinhoAtivado : ""}}`
      }
    >
      <IoMdCloseCircle size={22} onClick={() => alert('Fechar')} className={styles.closeBtn}/>
      <div className={styles.carrinhoHead}>
        <p>Seu Carrinho ({quantidade}) itens</p>
      </div>
      {quantidade == 0 ? (
        <div className={styles.bodyWithoutProduct}>
          <h2>Seu Carrinho Está Vazio</h2>
          <p>
            Navegue pelas categorias da loja ou faça uma busca pelo seu produto.
          </p>
          <button className={styles.buttonOne}>Continuar Comprando</button>
        </div>
      ) : (
        <div className={styles.bodyWithProduct}>
          <div className={styles.visualizacaoProdutos}>
            {arrayProdutosDesejados.map((produto, i) => {
              return (
                <CardProdutoCarrinho
                  key={produto.id}
                  id={produto.id}
                  img={produto.img}
                  titulo={produto.nome}
                  preco={produto.preco}
                  publico={produto.publico}
                  tamanho={produto.detalhes_dos_produtos[0].tamanho}
                  color={produto.detalhes_dos_produtos[0].cor}
                  quantidade={produto.quantidadeCarrinho}
                  obterIdExcluirProps={obterProdutoExcluir}
                />
              );
            })}
          </div>
          <div className={styles.bodyWithProduct__visualizacaoPreco}>
            <p className={styles.bodyWithProduct__visualizacaoPreco__titulo}>
              Subtotal:{" "}
            </p>
            <p className={styles.bodyWithProduct__visualizacaoPreco__preco}>
              {valorTotal}
            </p>
          </div>
          <div className={styles.visualizacoesButtons}>
            <button className={styles.visualizacoesButtons__primaryButton}>
              Continuar Comprando
            </button>
            <Link href="/marketplace-compra">
              <button className={styles.visualizacoesButtons__secondButton}>
                Finalizar Compra
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Carrinho;
