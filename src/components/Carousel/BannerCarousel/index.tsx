import { Carousel } from '@mantine/carousel';
import styles from './BannerCarousel.module.scss';

export default function BannerCarousel() {
  return (
    <Carousel
      slideSize="80%"
      slideGap="md"
      align="start"
      className={styles.carousel}
    >
      <Carousel.Slide className={styles.carousel__slide}>
        {/* <h4>Encontre sua velocidade</h4>
        <img src="https://imgnike-a.akamaihd.net/branding/home-sbf/touts/tout-future-fitness-31-03-desk.jpg"></img> */}
        1
      </Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
    </Carousel>
  );
}
