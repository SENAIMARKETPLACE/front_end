import MarketplaceHeader from "components/MarketplaceProduct/MarketplaceHeader";
import FooterSollaris from "layout/Footer";
import MenuLateralUsuario from "patterns/MenuLateralUsuario";
import { ReactNode, useEffect, useMemo, useState } from "react";
import styles from "./LayoutMarketplace.module.scss";
import { AppShell, Navbar, Header } from "@mantine/core";
import { Sidebar } from "layout/Sidebar";
import { IResponseLoginUser } from "compartilhado/IReponseLoginUser";

interface LayoutMarketplaceProps {
  children: ReactNode;
  quantidade?: number;
}

const LayoutMarketplace = ({
  children,
  quantidade,
}: LayoutMarketplaceProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
  const [usuarioInfo, setUsuarioInfo] = useState<IResponseLoginUser>();

  const atualizarQuantidade = (newValue: number) => {
    setQuantidadeCarrinho(newValue);
  };

  const setarIsLogged = (newValue: boolean) => {
    setIsLogged(newValue);
  };

  useEffect(() => {
    const isLoggedFromLocalStorage = localStorage.getItem("isUserLogged");
    if(isLoggedFromLocalStorage === "true"){
      setIsLogged(true)
    }else{
      setIsLogged(false)
    }
  }, []);


 

  useEffect(() => {

    if (isLogged === true) {
      const userDataString = localStorage.getItem("userLoginResponse");

      if (userDataString) {
        const userData: IResponseLoginUser = JSON.parse(userDataString);

        alert(userData.id);
        alert(userData.nome);
        alert(userData.email);

        // ...faça o que for necessário com os dados do usuário
        setUsuarioInfo(userData);
      } else {
        setIsLogged(false);
      }
    }
  }, []);

  return (
    <>
      <div className={styles.layout}>
        <Sidebar setarIsLogged={setarIsLogged} />
        <div className={styles.layout__content}>
          <MarketplaceHeader
            quantidade={quantidadeCarrinho}
            setarQuantidade={atualizarQuantidade}
            isLogged={isLogged}
            setarIsLogged={setarIsLogged}
          />
          <section className={styles["layout__content--children"]}>
            {children}
          </section>
        </div>
      </div>

      <FooterSollaris />
    </>
  );
};
export default LayoutMarketplace;
