import { Container, Table } from '@mantine/core';
import CartItem from './CartItem';
import styles from './Cart.module.scss';

const Cart = () => {
  const products = [
    {
      id: 1,
      nome: 'Camiseta Nike Comum',
      url: 'https://m.media-amazon.com/images/I/412BRS3YzZL._AC_SY500_.jpg',
      cor: 'Preta',
      peso: '100g',
      tamanho: 'M',
      price: '199.99',
    },
    {
      id: 2,
      nome: 'Kit Whey, BCAA e Creatina Integral Médica',
      url: 'https://cdn.awsli.com.br/800x800/157/157421/produto/43753862/2ab068446a.jpg',
      cor: 'Vermelha',
      peso: '1kg',
      tamanho: 'M',
      price: '199.99',
    },
  ];
  return (
    <>
      <Table mt="xl" className={styles.table}>
        <thead>
          <tr>
            <th>Produtos</th>
            <th></th>
            <th className={styles.th__amount}>Quantidade</th>
            <th className={styles.th__price}>Valor Unitário</th>
            <th>Valor Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}

          <tr className={styles.table__total}>
            <td className={styles.total__label} colSpan={4}>
              Total:
            </td>
            <td className={styles.total__price} colSpan={2}>
              R$ <span>0,00</span>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Cart;
