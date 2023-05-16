// Caligrafia Téncina | Tipos de Linhas caracteristicas e funções | Perspectivas | Cotas |

import { useEffect, useState } from "react";
import CardProdutoCarrinho from "./CardProdutoCarrinho";
import styles from "./Carrinho.module.scss";
import { IProdutoGet } from "compartilhado/IProdutoGet";

interface CarrinhoProps {
  isCartAtivado: boolean;
  quantidadeDeProdutos: number;
  produtoDesejadoNoCarrinho?: IProdutoGet;
}

const Carrinho = ({
  isCartAtivado,
  quantidadeDeProdutos,
  produtoDesejadoNoCarrinho,
}: CarrinhoProps) => {
  const [arrayProdutosDesejados, setArrayProdutosDesejados] = useState<
    IProdutoGet[]
  >([
    {
      id: "1",
      nome: "Tênis Nike Air Max Excee Feminino",
      descricao:
        "Correr é um ritual diário, cada passo aproxima você da sua meta pessoal. Deixe o Nike Air Zoom Pegasus 39 levar você a um novo patamar com um design intuitivo, seja para o treino ou para a corrida. Mais leve na parte de cima do que o Pegasus 38 e ideal para todas as estações, ele tem uma sensação de suporte para ajudar a manter os pés firmes, enquanto o amortecimento debaixo do pé e as unidades Zoom Air duplas (uma a mais que o Peg 38) deixam seus passos mais rápidos.",
      img: "https://imgnike-a.akamaihd.net/768x768/024098MT.jpg",
      publico: "FEMININO",
      preco: "2200.15",
      categoria: {
        id: "4",
        nome: "Esportes",
        sub_categoria: {
          id: "22",
          nome: "Corrida",
        },
      },
      detalhes_dos_produtos: [
        {
          id: "1",
          tamanho: "70cm",
          peso: "150gr",
          cor: "#122626",
          quantidade: "1000",
        },
      ],
    },
  ]);

  const [
    quantidadeProdutoEspecificoCarrinho,
    setQuantidadeProdutoEspecificoCarrinho,
  ] = useState(1);

  useEffect(() => {
    if (produtoDesejadoNoCarrinho !== undefined) {
      const novoArray = [...arrayProdutosDesejados]; // Cria uma cópia do array atual
      novoArray.push(produtoDesejadoNoCarrinho); // Adiciona o novo produto ao novoArray
      setArrayProdutosDesejados(novoArray); // Atualiza o estado com o novoArray
    }
  }, [produtoDesejadoNoCarrinho]);

  return (
    <div
      className={
        styles.carrinho +
        " " +
        `{${isCartAtivado ? styles.carrinhoAtivado : ""}}`
      }
    >
      <div className={styles.carrinhoHead}>
        <p>Seu Carrinho ({quantidadeDeProdutos}) itens</p>
      </div>
      {quantidadeDeProdutos == 0 ? (
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
            {arrayProdutosDesejados.map((produto) => {
              const produtoNoCarrinho = arrayProdutosDesejados.find(
                (item) => item.id === produto.id
              );

              let quantidade = 1 

              produtoNoCarrinho ? quantidade = quantidade + 0 : 0;


              
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
                  quantidade={quantidade}
                />
              );
            })}
          </div>
          <div className={styles.bodyWithProduct__visualizacaoPreco}>
            <p className={styles.bodyWithProduct__visualizacaoPreco__titulo}>
              Subtotal:{" "}
            </p>
            <p className={styles.bodyWithProduct__visualizacaoPreco__preco}>
              R$ 540,00
            </p>
          </div>
          <div className={styles.visualizacoesButtons}>
            <button className={styles.visualizacoesButtons__primaryButton}>
              Continuar Comprando
            </button>
            <button className={styles.visualizacoesButtons__secondButton}>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Carrinho;
