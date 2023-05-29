import styles from './OrdersScreen.module.scss';
import OrdersTable from 'components/OrdersTable';
import LayoutMarketplace from 'layout/LayoutMarketplace';
import { useState } from 'react';

const OrdersScreen = () => {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <LayoutMarketplace>
      <h1 className={styles.title}>Meus pedidos</h1>

      <OrdersTable isLogged={isLogged} />
    </LayoutMarketplace>
  );
};

export default OrdersScreen;
