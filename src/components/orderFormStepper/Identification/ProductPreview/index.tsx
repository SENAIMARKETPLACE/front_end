import { IProdutoGet } from 'compartilhado/IProdutoGet';
import styles from './ProductPreview.module.scss';
import { AspectRatio, Overlay, Table } from '@mantine/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';


const ProductPreview = () => {
  const [arrayProdutosDesejados, setArrayProdutosDesejados] = useState<
    IProdutoGet[]
  >([]);


  // AQUI VAI TER QUE SER ONDE A LÓGICA DE RESGATAR OS PRODUTOS FICA

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
      <AspectRatio ratio={720 / 1080} className={styles.overlay}>
        <section className={styles.products}>
          <h4 className={styles.products__label}>Produtos</h4>
          <Table className={styles.table}>
            <thead>
              <tr>
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              {arrayProdutosDesejados.map((product) => (
                <tr key={product.id}>
                  <td className={styles.td__img}>
                    <img
                      src={product.img}
                      alt={`Imagem ilustrativa do produto "${product.nome}"`}
                    />
                  </td>
                  <td>
                    <p>{product.nome}</p>
                    <p>
                      Tamanho: <span>{product.detalhes_dos_produtos[0].tamanho}</span>
                    </p>
                    <p>
                      Quantidade: <span>{product.quantidadeCarrinho}</span>
                    </p>
                  </td>
                </tr>
              ))}
              <tr className={styles.tr__price}>
                <td className={styles.td__price}>Total:</td>
                <td className={styles.td__price__value}>
                  {calcularOValorTotal()}
                </td>
              </tr>
            </tbody>
          </Table>
        </section>
        {<Overlay color="#ffffff" opacity={0.35} />}
      </AspectRatio>
    </>
  );
};

export default ProductPreview;
