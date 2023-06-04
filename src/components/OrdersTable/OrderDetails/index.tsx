import { Accordion, Table, Text } from '@mantine/core';
import styles from './OrdersDetails.module.scss';

interface OrderDetailsProps {
  order: any;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <Accordion>
      <Accordion.Item value="Detalhes" className={styles.accordion}>
        <Table verticalSpacing="md" className={styles.table}>
          <tbody>
            {order.products.map((product, productIndex) => (
              <tr key={productIndex}>
                <td className={styles.td__image}>
                  <img src={product.img} alt="" />
                </td>
                <td className={styles.td__productDetails}>
                  <div>
                    <b>{product.nome}</b>
                    <p>Cor: {product.cor}</p>
                    <p>Valor unitário: R$ {product.preco}</p>
                    <p>Quantidade: {product.quantidade}</p>
                  </div>
                  <div className={styles.productDetails__total}>
                    <p>
                      Sub total: R${' '}
                      {(product.preco * product.quantidade).toFixed(2)}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Text>Entregue em:</Text>
        <Text>Rua dos Alfeneiros, nº 04. Mundo da Magia, Hogwarts.</Text>
      </Accordion.Item>
    </Accordion>
  );
};

export default OrderDetails;
