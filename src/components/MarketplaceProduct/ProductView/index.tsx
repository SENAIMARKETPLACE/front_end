import { useState, useEffect } from "react";
import ProductDetails from "../ProductDetails";
import ProductRate from "../ProductRate";
import styles from "./ProductView.module.scss";

interface ProductViewProps {
  image: string;
  name: string;
  price: string;
  description: string;
  gender: string;
  colors: string;
  sizes: string;
  agregarProduto: () => void;
}

const ProductView = ({
  image,
  name,
  price,
  description,
  gender,
  colors,
  sizes,
  agregarProduto
}: ProductViewProps) => {
  let [qtdProdutos, setQtdProdutos] = useState<number>(null);

  const aumentarQtdProdutos = () => {
    setQtdProdutos((prevValor) => prevValor + 1)
    agregarProduto()
  };


  const moeda = parseInt(price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <main className={styles.product}>
      <section className={styles.product_images}>
        <div className={styles.main_img}>
          <img src={image} className={styles.product_img} alt={name} />
        </div>
      </section>
      <section className={styles.product_info}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.gender}>{gender}</p>
        <p className={styles.price}>{moeda}</p>
        <p className={styles.payment_label}>Ver os meios de pagamento</p>
        <p className={styles.description}>{description}</p>

        <div className={styles.product_details}>
          <ProductDetails colors={colors} sizes={sizes} />
          <div className={styles.buttons}>
            <button className={styles.button_buy}>Comprar agora</button>
            <button
              onClick={aumentarQtdProdutos}
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
