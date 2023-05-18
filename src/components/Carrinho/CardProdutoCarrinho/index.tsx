import styled, { StyledInterface } from "styled-components";
import styles from "./CardProdutoCarrinho.module.scss";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

interface CardProdutoProps {
  id?: string;
  color: string;
  img: string;
  titulo: string;
  publico: string;
  preco: string;
  tamanho: string;
  quantidade?: number;
  obterIdExcluirProps: (id: string) => void;
}

const CardProdutoCarrinho = ({
  id,
  color,
  img,
  titulo,
  publico,
  preco,
  tamanho,
  quantidade,
  obterIdExcluirProps
}: CardProdutoProps) => {

  const arrayCores = color.split(" ");




  const DivCores = styled.span`
        display: flex;
        justify-content: space-between;
        border-radius: 50px;
        height: 15px;
        width: 15px; 
        background: ${
          arrayCores.length === 1
            ? `${arrayCores[0]};`
            : `linear-gradient(60deg, ${arrayCores[0]} 50%, ${arrayCores[1]} 50%); `
        }
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
  `;

  const moeda = parseInt(preco).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className={styles.cardBody}>
      <div className={styles.cardBody__Photo}>
        <img src={img} alt={titulo} />
      </div>
      <div className={styles.cardBody__Informacoes}>
        <p className={styles.cardBody__Informacoes__name}>{titulo}</p>
        <p className={styles.cardBody__Informacoes__public}>{publico}</p>
        <p className={styles.cardBody__Informacoes__price}>{moeda}</p>
        <div className={styles.cardBody__Informacoes__colors}>
          <p>Cor:</p>
          <DivCores />
        </div>
        <p>Tamanho: {tamanho}</p>
        <p>Quantidade: {quantidade}</p>
      </div>
      <div>
        <button onClick={() => {obterIdExcluirProps(id)}} className={styles.cardBody__Informacoes__btnDeletar}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};
export default CardProdutoCarrinho;
