import { Table, Group, Button } from "@mantine/core";
import CartItem from "./CartItem";
import styles from "./Cart.module.scss";
import { use, useEffect, useState } from "react";
import { IProdutoGet } from "compartilhado/IProdutoGet";

interface props {
  nextStep: any;
  setarQuantidadeAoExcluirProps: (novaQuantidade: number) => void;
  exibirLoadingPageProps: (estado: boolean) => void;
  setarValorTotalCompraProps: (valorTotal: string) => void;
}

const Cart = ({
  nextStep,
  setarQuantidadeAoExcluirProps,
  exibirLoadingPageProps,
  setarValorTotalCompraProps

}: props) => {
  const [arrayProdutosDesejados, setArrayProdutosDesejados] = useState<
    IProdutoGet[]
  >([]);
  const [idAExcluir, setIdAExcluir] = useState("0");
  const [idAAlterar, setIdAAlterar] = useState("0");
  const [novaQuantidade, setNovaQuantidade] = useState(0);

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

  const recalcularQuantidade = () => {
    let quantidadeTemp = 0;
    arrayProdutosDesejados.forEach((produto) => {
      quantidadeTemp += produto.quantidadeCarrinho;
    });

    return quantidadeTemp;
  };

  useEffect(() => {
    const novoValor = recalcularQuantidade();
    setarQuantidadeAoExcluirProps(novoValor);
  }, [arrayProdutosDesejados]);

  // ARROW FUNCTION PARA RESGATAR ID_PRODUTO A SER EXCLUIDO DO LOCALSTORAGE PELO COMPONENTE FILHO
  const recuperarIdDoProdutoASerExcluido = (id: string) => {
    exibirLoadingPageProps(true);
    setIdAExcluir(id);
  };

  // ARROW FUNCTION PARA RESGATAR ID DO PRODUTO QUE TERÁ A PROPRIEDADE QUANTIDADE ALTERADA
  const recuperarIdDoProdutoAAlterar = (id: string, novaQuantidade: number) => {
    exibirLoadingPageProps(true);
    setIdAAlterar(id);
    setNovaQuantidade(novaQuantidade);
  };

  // USEEFFECT PARA SER GATILHO EM TODAS AS VEZES QUE A VARIÁVEL "idAAlterar" e  "novaQuantidade" FOR ALTERADA.

  useEffect(() => {
    if (idAAlterar != "0") {
      exibirLoadingPageProps(true);
      const carrinhoAtualizado = arrayProdutosDesejados.map((obj) => {
        if (obj.id === idAAlterar) {
          return { ...obj, quantidadeCarrinho: novaQuantidade };
        }
        return obj;
      });
      setArrayProdutosDesejados(carrinhoAtualizado);
      const carrinhoString = JSON.stringify(carrinhoAtualizado);
      localStorage.setItem("productsInCart", carrinhoString);
    }
  }, [idAAlterar, novaQuantidade]);

  // USEEFFECT PARA SER GATILHO EM TODAS AS VEZES QUE A VARIÁVEL "idAExcluir" FOR ALTERADA.

  useEffect(() => {
    if (idAExcluir != "0") {
      const carrinhoAtualizado = arrayProdutosDesejados.filter(
        (produto) => produto.id != idAExcluir
      );
      setArrayProdutosDesejados(carrinhoAtualizado);
      const carrinhoString = JSON.stringify(carrinhoAtualizado);
      localStorage.setItem("productsInCart", carrinhoString);
    }
  }, [idAExcluir]);

  // CALCULA O VALOR E EXIBE AUTOMATICAMENTE FORMATADO
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
      let valor = valorFormatado
      setarValorTotalCompraProps(valor)
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
            <th>Valor Total: </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arrayProdutosDesejados.map((product) => (
            <CartItem
              exibirLoadingPageProps={exibirLoadingPageProps}
              recuperarIdDoProdutoAAlterarProps={recuperarIdDoProdutoAAlterar}
              recuperarIdDoProdutoASerExcluidProps={
                recuperarIdDoProdutoASerExcluido
              }
              key={product.id}
              product={product}
            />
          ))}

          <tr className={styles.table__total}>
            <td className={styles.total__label} colSpan={4}>
              Subtotal:
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
