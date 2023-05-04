import styled from "styled-components";
import styles from "./CardProdutoCarrinho.module.scss";
import { MdDelete } from "react-icons/md";
import { useState } from "react";


interface CardProdutoProps{
    color: string;
    img: string;
    titulo: string;
    publico: string; 
    preco: string;
    tamanho: string;
}

const CardProdutoCarrinho = ({color, img, titulo, publico, preco, tamanho}: CardProdutoProps) => {
  const ColorProduct = styled.div`
    height: 15px;
    width: 15px;
    background-color: ${color};
    border-radius: 50px;
  `;

  const [quantidade, setQuantidade] = useState("1");

  return (
    <div className={styles.cardBody}>
      <div className={styles.cardBody__Photo}>
        <img src={img} alt={titulo} />
      </div>
      <div className={styles.cardBody__Informacoes}>
        <p className={styles.cardBody__Informacoes__name}>{titulo}</p>
        <p className={styles.cardBody__Informacoes__public}>{publico}</p>
        <p className={styles.cardBody__Informacoes__price}>R${preco}</p>
        <div className={styles.cardBody__Informacoes__colors}>
          <p>Cor:</p>
          <ColorProduct />
        </div>
        <p>Tamanho: {tamanho}</p>
        <p>Quantidade: {quantidade}</p>
      </div>
      <div>
        <button className={styles.cardBody__Informacoes__btnDeletar}><MdDelete/></button>
      </div>
    </div>
  );
};
export default CardProdutoCarrinho;
