import { ActionIcon, Group, NumberInput, rem } from '@mantine/core';
import styles from './CartItem.module.scss';
import { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

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
  product: Product;
};

export default function CartItem({ product }: CartItemProps) {
  const [quantity, setQuantity] = useState(0);

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <tr key={product.id} className={styles.product}>
      <td className={styles.td__img}>
        <img
          src={product.url}
          alt={`Imagem ilustrativa do produto "${product.nome}"`}
        />
      </td>
      <td>
        <p>{product.nome}</p>
        <p>
          Cor: <span>{product.cor}</span>
        </p>
        <p>
          Tamanho: <span>{product.tamanho}</span>
        </p>
      </td>
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
        RS <span>{product.price}</span>
      </td>
      <td>
        R$ <span>{quantity * parseFloat(product.price.replace(',', '.'))}</span>
      </td>
      <td>
        <RiDeleteBinLine
          className={styles.deleteIcon}
          onClick={() => alert('#EuConfio')}
        />
      </td>
    </tr>
  );
}
