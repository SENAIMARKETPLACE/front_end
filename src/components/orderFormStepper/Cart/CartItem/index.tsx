import { ActionIcon, Group, NumberInput, rem } from '@mantine/core';
import styles from './CartItem.module.scss';
import { useEffect, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IProdutoGet } from 'compartilhado/IProdutoGet';
import styled from 'styled-components';

type Product = {
  id: number;
  nome: string;
  url: string;
  cor: string;
  peso: string;
  tamanho: string;
  price: string;
};

type CartItemProps = {
  product: IProdutoGet;
  recuperarIdDoProdutoASerExcluidProps: (id: string) => void
  recuperarIdDoProdutoAAlterarProps: (id: string, novaQuantidade: number) => void

};

export default function CartItem({ product, recuperarIdDoProdutoASerExcluidProps, recuperarIdDoProdutoAAlterarProps }: CartItemProps) {
  const [quantity, setQuantity] = useState(product.quantidadeCarrinho);
  const precoFormatado = new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(parseFloat(product.preco))

  
  const arrayCores = product.detalhes_dos_produtos[0].cor.split(" ");


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

  // SUBTRAIR QUANTIDADE
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }

  };


  //ACRESCENTAR QUANTIDADE
  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };


  useEffect(() => {
    recuperarIdDoProdutoAAlterarProps(product.id, quantity)
    if(quantity == 0){
      recuperarIdDoProdutoASerExcluidProps(product.id)
    }

  }, [quantity])

  return (
    <tr key={product.id} className={styles.product}>
      <td className={styles.td__img}>
        <img
          src={product.img}
          alt={`Imagem ilustrativa do produto "${product.nome}"`}
        />
      </td>
      <td>
        <p>{product.nome}</p>
        <p className={styles.cardItem__cor}>
          Cor: <DivCores/>
        </p>
        <p>
          Tamanho: <span>{product.detalhes_dos_produtos[0].tamanho}</span>
        </p>
      </td>

      {/* AQUI ESTÁ O PONTO DE ATENÇÃO E ONDE EU VOU FOCAR NESSA 1ª PARTE */}
      <td className={styles.td__amount}>
        <Group spacing={0}>
          <ActionIcon size={36} variant="light" onClick={handleDecrease}>
            –
          </ActionIcon>

          <NumberInput
            hideControls
            value={quantity}
            onChange={(value) => setQuantity(value as number)}
            max={10}
            min={0}
            step={1}
            styles={{
              input: { width: rem(40), textAlign: 'center' },
            }}
          />

          <ActionIcon size={36} variant="light" onClick={handleIncrease}>
            +
          </ActionIcon>
        </Group>
      </td>
      <td className={styles.td__price}>
         <span>{precoFormatado}</span>
      </td>
      <td>
         <span>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(quantity * parseFloat(product.preco)) }</span>
      </td>
      <td>
        <RiDeleteBinLine
          className={styles.deleteIcon}
          onClick={(e) => recuperarIdDoProdutoASerExcluidProps(product.id)}
        />
      </td>
    </tr>
  );
}
