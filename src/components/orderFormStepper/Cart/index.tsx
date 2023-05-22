import { Table, Group, Button } from "@mantine/core";
import CartItem from "./CartItem";
import styles from "./Cart.module.scss";
import { useEffect, useState } from "react";
import { IProdutoGet } from "compartilhado/IProdutoGet";

interface props {
  nextStep: any;
}

const Cart = ({ nextStep }: props) => {
  const [arrayProdutosDesejados, setArrayProdutosDesejados] = useState<
    IProdutoGet[]
  >([]);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const arrayProductsInCart = JSON.parse(
        localStorage.getItem("productsInCart")
      );
      if (arrayProductsInCart) {
        setArrayProdutosDesejados([
          ...arrayProdutosDesejados,
          ...arrayProductsInCart,
        ]);
      }
    }
  }, []);


  const calcularOValorTotal = () => {
    let somaTotal = 0.0;
    let valorFormatado = "";
    arrayProdutosDesejados.forEach((produto) => {
      const preco = Number(produto.preco);
      const quantidade = produto.quantidadeCarrinho;
      const subtotal = preco * quantidade;
      somaTotal += subtotal;
      valorFormatado = somaTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    });

    return valorFormatado;
  };

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
          {arrayProdutosDesejados.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}

          <tr className={styles.table__total}>
            <td className={styles.total__label} colSpan={4}>
              Total:
            </td>
            <td className={styles.total__price} colSpan={2}>
              {calcularOValorTotal()}
            </td>
          </tr>
        </tbody>
      </Table>

      <Group position="right" mt="xl">
        <Button onClick={nextStep} radius="xl">
          Continuar
        </Button>
      </Group>
    </>
  );
};

export default Cart;
