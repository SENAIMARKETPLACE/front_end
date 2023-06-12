import { Button } from "@mantine/core";
import styles from "./OrdersScreen.module.scss";
import OrdersTable from "components/OrdersTable";
import LayoutMarketplace from "layout/LayoutMarketplace";
import { useEffect, useState } from "react";
import Link from "next/link";
import SignInMessage from "patterns/SignInMessage";
import LoadingGif from "layout/LoadingGif";
import { IResponseLoginUser } from "compartilhado/IReponseLoginUser";

const OrdersScreen = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userConnect, setUserConnect] = useState<IResponseLoginUser>();

  useEffect(() => {
    setTimeout(() => {
      const isLoggedFromLocalStorage = localStorage.getItem("isUserLogged");
      const userTemp = localStorage.getItem("userLoginResponse")

      if (isLoggedFromLocalStorage === "true") {
        setIsLogged(true);
        setIsLoading(false);
        if(userTemp){
          const userData: IResponseLoginUser = JSON.parse(userTemp)
          setUserConnect(userData)
        }
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
            <OrdersTable idUser={userConnect.id}/>
          ) : (
            <SignInMessage message="Faça o login para visualizar seus pedidos." />
          )}
        </section>
      )}
    </LayoutMarketplace>
  );
};

export default OrdersScreen;
