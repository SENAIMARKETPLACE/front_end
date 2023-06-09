import { Avatar, Tooltip } from '@mantine/core';
import styles from './ProdutoCategoria.module.scss';
import { ICategory } from 'compartilhado/ICategory';
import { useEffect, useState } from 'react';
import suplementos from '../../../public/images/categories/Suplementos.png';
import roupas from '../../../public/images/categories/Roupas.webp';
import calcados from '../../../public/images/categories/Calçados.webp';
import esportes from '../../../public/images/categories/Esportes.jpg';
import acessorios from '../../../public/images/categories/Acessórios.webp';
import Link from 'next/link';

interface ProdutoCategoriaProps {
  category: ICategory;
}

const ProdutoCategoria = ({ category }: ProdutoCategoriaProps) => {
  const [categoryImage, setCategoryImage] = useState('');
  // Alterar com a URL de busca apropriada
  const searchRoute: string = 'pesquisar?categoria';
  const [parameter, setParameter] = useState('');

  function updateCategory(category: string) {
    switch (category) {
      case 'Roupas':
        setCategoryImage(roupas.src);
        setParameter('roupas');
        break;
      case 'Calçados':
        setCategoryImage(calcados.src);
        setParameter('calcados');
        break;
      case 'Suplementos':
        setCategoryImage(suplementos.src);
        setParameter('suplementos');
        break;
      case 'Esportes':
        setCategoryImage(esportes.src);
        setParameter('esportes');
        break;
      case 'Acessórios':
        setCategoryImage(acessorios.src);
        setParameter('acessorios');
        break;
      default:
        console.log('Categoria não reconhecida.');
    }
  }

  useEffect(() => {
    updateCategory(category.nome);
  }, []);

  return (
    <Link
      href={`${searchRoute}=${parameter}`}
      className={styles.category}
      onClick={() =>
        alert('Ir para a página de busca com o filtro da categoria carregado')
      }
    >
      <Tooltip.Group openDelay={300} closeDelay={100}>
        <Avatar.Group spacing="sm" mr="xs">
          <Tooltip label={category.nome} withArrow>
            <Avatar src={categoryImage} radius="50%" size={70} />
          </Tooltip>
        </Avatar.Group>
      </Tooltip.Group>
      <p className={styles.text}>{category.nome}</p>
    </Link>
  );
};

export default ProdutoCategoria;

// function Demo() {
//   return (

//   );
// }
