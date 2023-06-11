import { Button } from "@mantine/core";
import styles from "./OrdersScreen.module.scss";
import OrdersTable from "components/OrdersTable";
import LayoutMarketplace from "layout/LayoutMarketplace";
import { useEffect, useState } from "react";
import Link from "next/link";
import SignInMessage from "patterns/SignInMessage";
import LoadingGif from "layout/LoadingGif";

const OrdersScreen = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const isLoggedFromLocalStorage = localStorage.getItem("isUserLogged");
      if (isLoggedFromLocalStorage === "true") {
        setIsLogged(true);
        setIsLoading(false);
      } else {
        setIsLogged(false);
        setIsLoading(false)

      }
    }, 2000);
  }, []);

  return (
    <LayoutMarketplace>
      {isLoading ? (
        <div className={styles.loading}>
          <LoadingGif />
        </div>
      ) : (
        <section>
          <h1 className={styles.title}>Meus pedidos</h1>
          {isLogged ? (
            <OrdersTable />
          ) : (
            <SignInMessage message="Faça o login para visualizar seus pedidos." />
          )}
        </section>
      )}
    </LayoutMarketplace>
  );
};

export default OrdersScreen;
