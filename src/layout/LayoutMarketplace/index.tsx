import MarketplaceHeader from "components/MarketplaceProduct/MarketplaceHeader";
import FooterSollaris from "layout/Footer";
import MenuLateralUsuario from "patterns/MenuLateralUsuario";
import { ReactNode, useEffect, useMemo, useState } from "react";
import styles from "./LayoutMarketplace.module.scss";
import { AppShell, Navbar, Header } from "@mantine/core";
import { Sidebar } from "layout/Sidebar";

interface LayoutMarketplaceProps {
  children: ReactNode;
  quantidade?: number;
}

const LayoutMarketplace = ({
  children,
  quantidade,
}: LayoutMarketplaceProps) => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.layout__content}>
          <MarketplaceHeader quantidade={quantidade} isLogged={isLogged} />
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
