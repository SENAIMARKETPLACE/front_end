import { Carousel } from '@mantine/carousel';
import styles from './CategoriesCarousel.module.scss';
import ProdutoCategoria from 'components/ProdutoCategoria';

const categories = [
  {
    id: 1,
    name: 'Treino e Academia',
    subCategories: [
      {
        id: 1,
        name: 'Subcategoria 1',
      },
      {
        id: 2,
        name: 'Subcategoria 2',
      },
    ],
  },
  {
    id: 2,
    name: 'Treino e Academia',
    subCategories: [
      {
        id: 1,
        name: 'Subcategoria 1',
      },
      {
        id: 2,
        name: 'Subcategoria 2',
      },
    ],
  },
  {
    id: 3,
    name: 'Treino e Academia',
    subCategories: [
      {
        id: 1,
        name: 'Subcategoria 1',
      },
      {
        id: 2,
        name: 'Subcategoria 2',
      },
    ],
  },
  {
    id: 4,
    name: 'Treino e Academia',
    subCategories: [
      {
        id: 1,
        name: 'Subcategoria 1',
      },
      {
        id: 2,
        name: 'Subcategoria 2',
      },
    ],
  },
  {
    id: 5,
    name: 'Treino e Academia',
    subCategories: [
      {
        id: 1,
        name: 'Subcategoria 1',
      },
      {
        id: 2,
        name: 'Subcategoria 2',
      },
    ],
  },
];

export default function CategoriesCarousel() {
  return (
    <Carousel
      slideSize="225px"
      slideGap={'md'}
      loop
      align="start"
      dragFree
      className={styles.carousel}
    >
      {categories.map((category) => (
        <Carousel.Slide key={category.id} pb={20}>
          <ProdutoCategoria key={category.id} categories={categories} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
