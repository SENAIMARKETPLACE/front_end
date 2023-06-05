import { Carousel } from '@mantine/carousel';
import styles from './ProductsCarousel.module.scss';
import Link from 'next/link';
import UsuarioProduto from 'components/UsuarioProduto';
import CardProdutoCarrossel from 'components/CardProdutoCarrossel';

interface ProductsCarouselProps {
  products: any;
}
export default function ProductsCarousel({ products }: ProductsCarouselProps) {
  return (
    <Carousel
      slideSize="225px"
      slideGap={'md'}
      loop
      align="start"
      dragFree
      className={styles.carousel}
    >
      {products.map((product: { id: string ; img: string; nome: string; preco: string }) => (
        <Carousel.Slide key={product.nome} pb={20}>
          <UsuarioProduto
            key={product.nome}
            id={product.id}
            image={product.img}
            name={product.nome}
            price={product.preco}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
