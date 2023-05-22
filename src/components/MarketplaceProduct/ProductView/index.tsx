import { useState, useEffect } from "react";
import ProductDetails from "../ProductDetails";
import ProductRate from "../ProductRate";
import styles from "./ProductView.module.scss";
import { IProdutoGet } from "compartilhado/IProdutoGet";

interface ProductViewProps {
  produto: IProdutoGet;
  agregarProduto: () => void;
  enviarProdutoAoCarrinho: (produto: IProdutoGet) => void;
}

const ProductView = ({
  produto,
  agregarProduto,
  enviarProdutoAoCarrinho
}: ProductViewProps) => {
  let [qtdProdutos, setQtdProdutos] = useState<number>(null);

  const aumentarQtdProdutos = () => {
    setQtdProdutos((prevValor) => prevValor + 1)
    agregarProduto()
  };

  useEffect(() => {
   produto.quantidadeCarrinho = 1  
  })

  

  const precoFormatado = new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(parseFloat(produto.preco))


  return (
    <main className={styles.product}>
      <section className={styles.product_images}>
        <div className={styles.main_img}>
          <img src={produto.img} className={styles.product_img} alt={produto.nome} />
        </div>
      </section>
      <section className={styles.product_info}>
        <h2 className={styles.name}>{produto.nome}</h2>
        <p className={styles.gender}>{produto.publico}</p>
        <p className={styles.price}>{precoFormatado}</p>
        <p className={styles.payment_label}>Ver os meios de pagamento</p>
        <p className={styles.description}>{produto.descricao}</p>

        <div className={styles.product_details}>
          <ProductDetails colors={produto.detalhes_dos_produtos[0].cor} sizes={produto.detalhes_dos_produtos[0].tamanho} />
          <div className={styles.buttons}>
            <button className={styles.button_buy}>Comprar agora</button>
            <button
              onClick={(e) => {
                agregarProduto();
                enviarProdutoAoCarrinho(produto);
              }}
              className={styles.button_cart}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductView;
