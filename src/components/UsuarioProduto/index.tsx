import styles from './UsuarioProduto.module.scss';
import { BsHeartFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import Camiseta from '../../../public/images/Camiseta.png';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Rating } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

interface UsuarioProdutoProps {
  image: string;
  name: string;
  price: string;
  id: string;
}

const UsuarioProduto = ({ image, name, price, id }: UsuarioProdutoProps) => {
  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseFloat(price));

  return (
    <Link href={`/marketplace-produto/${id}`}>
      <div className={styles.produto}>
        {/* <span className={styles.favorite_container}>
          <Rating
            defaultValue={2}
            count={1}
            emptySymbol={<IconHeart size="1.5rem" />}
            fullSymbol={
              <IconHeartFilled
                size="1.5rem"
                color="#cc3a3a"
                style={{ zIndex: 2 }}
              />
            }
          />
          <BsHeartFill className={styles.favorite_icon} />
        </span> */}
        <div className={styles.photo_container}>
          <img className={styles.photo} src={image} alt={name} />
        </div>
        <p className={styles.name}>{name}</p>
        <div className={styles.icons_container}>
          <div className={styles.rate}>
            <p className={styles.rate_value}>5</p>
            <FaStar />
          </div>
          <p className={styles.price}>{precoFormatado}</p>
        </div>
      </div>
    </Link>
  );
};

export default UsuarioProduto;
