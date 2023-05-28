import { Carousel } from '@mantine/carousel';
import styles from './CategoriesCarousel.module.scss';
import ProdutoCategoria from 'components/ProdutoCategoria';

export default function CategoriesCarousel() {
  return (
    <Carousel
      slideSize="80%"
      slideGap="md"
      align="start"
      className={styles.carousel}
    >
      <Carousel.Slide className={styles.carousel__slide}>
        <ProdutoCategoria />
      </Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
    </Carousel>
  );
}
