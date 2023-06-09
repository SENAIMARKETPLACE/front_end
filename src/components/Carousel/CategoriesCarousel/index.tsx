import { Carousel } from '@mantine/carousel';
import styles from './CategoriesCarousel.module.scss';
import ProdutoCategoria from 'components/ProdutoCategoria';
import { httpApiMockada } from '../../../http';
import { ICategory } from 'compartilhado/ICategory';
import { ISubcategory } from 'compartilhado/ISubcategory';
import { useEffect, useState } from 'react';
import { Center } from '@mantine/core';

export default function CategoriesCarousel() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  async function getCategoriesAndSubs(): Promise<void> {
    try {
      const response = await httpApiMockada.get('/categoriasSubcategorias');
      const categories: ICategory[] = response.data.map((categoryData: any) => {
        const { sub_categorias, ...category } = categoryData;
        const subcategories: ISubcategory[] = sub_categorias.map(
          (subcategoryData: any) => ({
            id: subcategoryData.id,
            nome: subcategoryData.nome,
          })
        );
        return { ...category, sub_categorias: subcategories };
      });

      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategoriesAndSubs();
    console.log(categories);
  }, []);

  return (
    <Center>
      <Carousel
        slideSize="240px"
        slideGap={'md'}
        loop
        align="start"
        dragFree
        controlsOffset="xs"
        className={styles.carousel}
      >
        {/* Com apenas um map, restava um espaço em braco no final do carrossel. */}
        {categories.map((category) => (
          <Carousel.Slide key={category.id} pb={20}>
            <ProdutoCategoria key={`m1-${category.id}`} category={category} />
          </Carousel.Slide>
        ))}
        {categories.map((category) => (
          <Carousel.Slide key={category.id} pb={20}>
            <ProdutoCategoria key={`m2-${category.id}`} category={category} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Center>
  );
}
