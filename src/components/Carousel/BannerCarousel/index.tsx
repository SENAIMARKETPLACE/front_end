import { Carousel } from '@mantine/carousel';
import styles from './BannerCarousel.module.scss';
import banner1 from '../../../../public/images/banner/banner01.jpg';
import banner2 from '../../../../public/images/banner/banner02.jpg';
import banner3 from '../../../../public/images/banner/banner03.jpg';
import banner4 from '../../../../public/images/banner/banner04.jpg';
import banner5 from '../../../../public/images/banner/banner05.jpg';
import Link from 'next/link';

const images = [
  {
    image: { banner1 },
    alt: 'Banner de corrida',
    link: '/pesquisa/',
  },
  {
    image: 'public/images/banner_user.png',
    alt: 'Banner de corrida',
    link: '/pesquisa/',
  },
  {
    image: 'public/images/banner_user.png',
    alt: 'Banner de corrida',
    link: '/pesquisa/',
  },
  {
    image: 'public/images/banner_user.png',
    alt: 'Banner de corrida',
    link: '/pesquisa/',
  },
];

export default function BannerCarousel() {
  return (
    <Carousel
      slideSize="85%"
      slideGap="md"
      align="start"
      loop
      className={styles.carousel}
    >
      <Carousel.Slide className={styles.carousel__slide}>
        <img src={banner1.src} alt={''} />
      </Carousel.Slide>
      <Carousel.Slide className={styles.carousel__slide}>
        <img src={banner2.src} alt={''} />
      </Carousel.Slide>
      <Carousel.Slide className={styles.carousel__slide}>
        <img src={banner3.src} alt={''} />
      </Carousel.Slide>
      <Carousel.Slide className={styles.carousel__slide}>
        <img src={banner4.src} alt={''} />
      </Carousel.Slide>
      <Carousel.Slide className={styles.carousel__slide}>
        <img src={banner5.src} alt={''} />
      </Carousel.Slide>
    </Carousel>
  );
}
