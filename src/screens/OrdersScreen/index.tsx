import { Button } from '@mantine/core';
import styles from './OrdersScreen.module.scss';
import OrdersTable from 'components/OrdersTable';
import LayoutMarketplace from 'layout/LayoutMarketplace';
import { useState } from 'react';
import Link from 'next/link';
import login from '../../../public/images/login.svg';

const OrdersScreen = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <LayoutMarketplace>
      <h1 className={styles.title}>Meus pedidos</h1>

      {isLogged ? (
        <OrdersTable />
      ) : (
        <div>
          <p>Faça o login para visualizar seus pedidos.</p>
          <div className={styles.pageMessage}>
            <img src={login.src} width={'300px'}></img>
            <Link href={'/marketplace'}>
              <Button radius="xl" size="md">
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      )}
    </LayoutMarketplace>
  );
};

export default OrdersScreen;
