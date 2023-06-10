import { Button } from '@mantine/core';
import styles from './OrdersScreen.module.scss';
import OrdersTable from 'components/OrdersTable';
import LayoutMarketplace from 'layout/LayoutMarketplace';
import { useState } from 'react';
import Link from 'next/link';
import SignInMessage from 'patterns/SignInMessage';

const OrdersScreen = () => {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <LayoutMarketplace>
      <section>
        <h1 className={styles.title}>Meus pedidos</h1>

        
        {isLogged ? (
          <OrdersTable />
        ) : (
          <SignInMessage message="Faça o login para visualizar seus pedidos." />
        )}
      </section>
    </LayoutMarketplace>
  );
};

export default OrdersScreen;
