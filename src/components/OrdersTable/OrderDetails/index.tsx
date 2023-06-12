import { Accordion, Table, Text } from '@mantine/core';
import styles from './OrdersDetails.module.scss';

interface OrderDetailsProps {
  order: IPedido;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {

  function formatCurrency(value: number) {
    const options = { style: 'currency', currency: 'BRL' };
    const formatter = new Intl.NumberFormat('pt-BR', options);
  
    return formatter.format(Number(value));
  }
  
  return (
    <Accordion>
      <Accordion.Item value="Detalhes" className={styles.accordion}>
        <Table verticalSpacing="md" className={styles.table}>
          <tbody>
            {order.produtos.map((product, productIndex) => (
              <tr key={productIndex}>
                <td className={styles.td__image}>
                  <img src={product.img} alt="" />
                </td>
                <td className={styles.td__productDetails}>
                  <div>
                    <b>{product.nome}</b>
                    <p>Cor: {product.cor}</p>
                    <p>Valor unitário: {formatCurrency(Number(product.valorUnitario))}</p>
                    <p>Quantidade: {product.quantidade}</p>
                  </div>
                  <div className={styles.productDetails__total}>
                    <p>
                      Sub total: {formatCurrency(product.valorUnitario * product.quantidade)}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Text>Entregue em:</Text>
        <Text>{`${order.endereco.logradouro}, ${order.endereco.numero} - ${order.endereco.cidade}, ${order.endereco.estado}.`}</Text>
      </Accordion.Item>
    </Accordion>
  );
};

export default OrderDetails;
