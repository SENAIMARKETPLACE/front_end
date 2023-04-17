import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./CarrosselProdutos.module.scss";
import CardProdutoCarrossel from "../CardProdutoCarrossel";

const CarrosselProdutos = () => {
  const [constProductIndex, setCurrentProductIndex] = useState(0);

  const produtos = [
    {
      id: "1",
      nome: "Pasta de Amendoim Growth",
      imagem:
        "https://www.gsuplementos.com.br/upload/produto/imagem/m_pasta-de-amendoim-integral-torrado-1kg-growth-supplements.png",
      descricao:
        "Assim como outras camisas da nossa coleção Stadium, esse modelo combina detalhes de design de réplica com tecido que absorve o suor para oferecer um visual preparado para o jogo e inspirado na sua seleção favorita.",
      preco: "25,00",
    },
    {
      id: "2",
      nome: "Camisa Brasil 2022/23",
      imagem:
        "https://cdn.shopify.com/s/files/1/0618/8361/3346/products/2_7400efd2-c286-43be-8f6c-0d136a3059a9_2000x.png?v=1661368938",
      descricao:
        "Assim como outras camisas da nossa coleção Stadium, esse modelo combina detalhes de design de réplica com tecido que absorve o suor para oferecer um visual preparado para o jogo e inspirado na sua seleção favorita.",
      preco: "250,00",
    },
    {
      id: "3",

      nome: "Camisa Brasil 2023",
      imagem:
        "https://imgnike-a.akamaihd.net/768x768/02574915.jpg",
      descricao:
        "Assim como outras camisas da nossa coleção Stadium, esse modelo combina detalhes de design de réplica com tecido que absorve o suor para oferecer um visual preparado para o jogo e inspirado na sua seleção favorita.",
      preco: "250,00",
    },
    {
      id: "4",
      nome: "Top Fitness sem Costura Bodywear Puma",
      imagem:
        "https://imgcentauro-a.akamaihd.net/500x500/9787300P/top-fitness-sem-costura-bodywear-puma-com-2-unidades-adulto-img.jpg",
      descricao:
        "Assim como outras camisas da nossa coleção Stadium, esse modelo combina detalhes de design de réplica com tecido que absorve o suor para oferecer um visual preparado para o jogo e inspirado na sua seleção favorita.",
      preco: "250,00",
    },
    {
      id: "5",

      nome: "Tênis Nike Kyrie Infinity Unissex",
      imagem:
        "https://imgnike-a.akamaihd.net/768x768/016921ID.jpg",
      descricao:
        "Assim como outras camisas da nossa coleção Stadium, esse modelo combina detalhes de design de réplica com tecido que absorve o suor para oferecer um visual preparado para o jogo e inspirado na sua seleção favorita.",
      preco: "250,00",
    },
    {
      id: "6",
      nome: "Camisa Brasil 2022/23",
      imagem:
        "https://d1ulmyt8kny60e.cloudfront.net/Custom/Content/Products/47/83/47835_camisa-juv-umbro-santos-of-1-2023-pr-16049-8661_z2_638171131623653119.jpg",
      descricao:
        "Assim como outras camisas da nossa coleção Stadium, esse modelo combina detalhes de design de réplica com tecido que absorve o suor para oferecer um visual preparado para o jogo e inspirado na sua seleção favorita.",
      preco: "250,00",
    },
  ];
  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <button className={styles.slick_button + + styles.slick_next}>Next</button>,
    prevArrow: <button className={styles.slick_button + + styles.slick_prev}>Prev</button>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className={styles.container}>
        <h3>PRODUTOS EM DESTAQUE :</h3>
        <Slider {...settings}>
          {produtos.map((produto) => (
            <CardProdutoCarrossel id={produto.id} title={produto.nome} description={produto.descricao} price={produto.preco} image={produto.imagem}/>
          ))}
        </Slider>
      </section>
    </>
  );
};
export default CarrosselProdutos;
