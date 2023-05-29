import styles from './OrdersTable.module.scss';
import { useState } from 'react';
import {
  Accordion,
  Table,
  Paper,
  Text,
  Avatar,
  Tooltip,
  Button,
} from '@mantine/core';
import React from 'react';
import emptyCart from '../../../public/images/empty_cart_co35.svg';
import login from '../../../public/images/login.svg';
import Link from 'next/link';

interface OrdersTableProps {
  isLogged: boolean;
}

const orders = [
  {
    id: 1,
    /* Criar lógica para pegar a imagem do primeiro produto do pedido */
    date: '10/03/2021 às 16:32',
    value: '540.33',
    payment: 'Cartão de Crédito',
    amount: 2,
    products: [
      {
        nome: 'Tênis Nike Air Max Excee Feminino',
        preco: 2200.15,
        cor: 'Preta',
        quantidade: 1,
        img: 'https://imgnike-a.akamaihd.net/768x768/024098MT.jpg',
      },
      {
        nome: 'CAMISA SANTOS II 23/24',
        preco: 2200.15,
        cor: 'Preta',
        quantidade: 2,
        img: 'https://static.netshoes.com.br/produtos/camisa-santos-ii-2223-sn-torcedor-umbro-masculina/26/2IA-2585-026/2IA-2585-026_zoom1.jpg?ts=1652897837&ims=544x',
      },
    ],
  },
  {
    id: 2,
    urlFistProduct:
      'https://static.netshoes.com.br/produtos/camiseta-nike-dri-fit-academy-masculina/06/2IC-1838-006/2IC-1838-006_zoom2.jpg?ts=1614614671&ims=326x',
    date: '14/03/2022 às 16:32',
    value: '540.33',
    payment: 'Pix',
    amount: 2,
    products: [
      {
        nome: 'CAMISA SANTOS II 23/24',
        preco: 2200.15,
        cor: 'Preta',
        quantidade: 1,
        img: 'https://static.netshoes.com.br/produtos/camisa-santos-ii-2223-sn-torcedor-umbro-masculina/26/2IA-2585-026/2IA-2585-026_zoom1.jpg?ts=1652897837&ims=544x',
      },
      {
        nome: 'Tênis Nike Air Max Excee Feminino',
        preco: 2200.15,
        cor: 'Preta',
        quantidade: 1,
        img: 'https://imgnike-a.akamaihd.net/768x768/024098MT.jpg',
      },
      {
        nome: 'Nike Camiseta 3',
        preco: 2200.15,
        cor: 'Preta',
        quantidade: 2,
        img: 'https://static.netshoes.com.br/produtos/camiseta-nike-dri-fit-academy-masculina/06/2IC-1838-006/2IC-1838-006_zoom2.jpg?ts=1614614671&ims=326x',
      },
    ],
  },
  {
    id: 3,
    urlFistProduct:
      'https://assets.adidas.com/images/w_600,f_auto,q_auto/f6ce8e46e6414600a3daaf4f0147e08e_9366/Camisa_Icon_Real_Madrid_Branco_HT6456_21_model.jpg',
    date: '30/08/2023 às 16:32',
    value: '540.33',
    payment: 'Boleto Bancário',
    amount: 1,
    products: [
      {
        nome: 'CAMISA ICON REAL MADRID',
        preco: 600.15,
        cor: 'Branca',
        quantidade: 1,
        img: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/f6ce8e46e6414600a3daaf4f0147e08e_9366/Camisa_Icon_Real_Madrid_Branco_HT6456_21_model.jpg',
      },
    ],
  },
];

const OrdersTable = ({ isLogged }: OrdersTableProps) => {
  // Criar lógica para quando o cara estiver logado, talvez ler do localStorage.
  return isLogged ? (
    orders.length > 0 ? (
      <Orders />
    ) : (
      <div>
        <p>Hmm, parece que você ainda não fez nenhuma compra.</p>
        <div className={styles.pageMessage}>
          <img src={emptyCart.src} width={'300px'}></img>
          <Link href={'/marketplace'}>
            <Button radius="xl" size="md">
              Continue Comprando
            </Button>
          </Link>
        </div>
      </div>
    )
  ) : (
    <div>
      <p>Faça o login para visualizar seus pedidos.</p>
      <div className={styles.pageMessage}>
        <img src={login.src} width={'300px'}></img>
        <Link href={'/marketplace'}>
          <Button radius="xl" size="md">
            Entrar
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrdersTable;

function Orders() {
  const [openItem, setOpenItem] = useState(null);
  const [accordionText, setAccordionText] = useState('Abrir');

  const handleAccordionToggle = (index: number) => {
    setOpenItem(index === openItem ? null : index);
    setAccordionText(index === openItem ? 'Abrir' : 'Esconder');
  };

  const formatterOrderID = (number: number) => {
    let numberStr = String(number);
    const zerosToAdd = 8 - numberStr.length;

    if (zerosToAdd > 0) {
      numberStr = '0'.repeat(zerosToAdd) + numberStr;
    }

    return numberStr;
  };

  return (
    <>
      <Table
        withBorder
        withColumnBorders
        verticalSpacing="md"
        className={styles.table}
      >
        <thead className={styles.table__thead}>
          <tr>
            <th className={styles.th__mainImage}></th>
            <th className={styles.th__order}>Número do Pedido</th>
            <th>Data</th>
            <th className={styles.th__items}>Itens</th>
            <th>Valor da Compra</th>
            <th className={styles.th__payment}>Forma de Pagamento</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody className={styles.table__tbody}>
          {orders.map((order, index) => (
            <React.Fragment key={order.id}>
              <tr>
                <td className={styles.td__mainImage}>
                  <Avatar.Group spacing="sm" className={styles.avatars}>
                    <Avatar src={order.products[0].img} radius="xl" size={70} />
                    {order.products.length > 1 && (
                      <Tooltip
                        label={`Há mais ${
                          order.products.length - 1
                        } produto(s) neste pedido.`}
                        withArrow
                      >
                        <Avatar radius="xl">
                          +{order.products.length - 1}
                        </Avatar>
                      </Tooltip>
                    )}
                  </Avatar.Group>
                </td>
                <td className={styles.td__order}>
                  {formatterOrderID(order.id)}
                </td>
                <td>{order.date}</td>
                <td className={styles.td__items}>{order.amount}</td>
                <td>R$ {order.value}</td>
                <td className={styles.td__payment}>{order.payment}</td>
                <td>
                  <p
                    className={styles.td__openDetails}
                    onClick={() => handleAccordionToggle(index)}
                  >
                    {openItem === index ? 'Esconder' : 'Abrir'}
                  </p>
                </td>
              </tr>
              {openItem === index && (
                <tr>
                  <td colSpan={7}>
                    <Accordion>
                      <Accordion.Item
                        value="Detalhes"
                        className={styles.accordion}
                      >
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
                                      {(
                                        product.preco * product.quantidade
                                      ).toFixed(2)}
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <Text>Entregue em:</Text>
                        <Text>
                          Rua dos Alfeneiros, nº 04. Mundo da Magia, Hogwarts.
                        </Text>
                      </Accordion.Item>
                    </Accordion>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </>
  );
}
