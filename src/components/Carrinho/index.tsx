// Caligrafia Téncina | Tipos de Linhas caracteristicas e funções | Perspectivas | Cotas | 

import CardProdutoCarrinho from "./CardProdutoCarrinho";
import styles from "./Carrinho.module.scss";

interface CarrinhoProps {
  isCartAtivado: boolean;
  quantidadeDeProdutos: string;
}

const Carrinho = ({ isCartAtivado, quantidadeDeProdutos }: CarrinhoProps) => {
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
      {parseInt(quantidadeDeProdutos) === 0 && (
        <div className={styles.bodyWithoutProduct}>
          <h2>Seu Carrinho Está Vazio</h2>
          <p>
            Navegue pelas categorias da loja ou faça uma busca pelo seu produto.
          </p>
          <button className={styles.buttonOne}>
            Continuar Comprando
          </button>
        </div>
      )}
      <div className={styles.bodyWithProduct}>
        <div className={styles.visualizacaoProdutos}>
            <CardProdutoCarrinho  img="https://imgnike-a.akamaihd.net/120x120/001589ID.jpg" titulo="Boné Nike Court AeroBill Rafa Nadal Heritage86" preco="189,99" publico="Unissex" tamanho="ÚNICO" color="#000"/>
            <CardProdutoCarrinho  img="https://imgnike-a.akamaihd.net/250x250/0228340L.jpg" titulo="Camisa Nike Brasil I 2022/24 Torcedor Pro Masculina" preco="349,99" publico="Masculino" tamanho="GG" color="#F6F54D"/>
            <CardProdutoCarrinho  img="https://imgnike-a.akamaihd.net/250x250/0228340L.jpg" titulo="Camisa Nike Brasil I 2022/24 Torcedor Pro Masculina" preco="349,99" publico="Masculino" tamanho="GG" color="#F6F54D"/>

        </div>
        <div className={styles.bodyWithProduct__visualizacaoPreco}>
          <p className={styles.bodyWithProduct__visualizacaoPreco__titulo}>Subtotal: </p>
          <p className={styles.bodyWithProduct__visualizacaoPreco__preco}>R$ 540,00</p>
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
    </div>
  );
};
export default Carrinho;
