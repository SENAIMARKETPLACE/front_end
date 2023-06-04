import MarketplaceHeader from "components/MarketplaceProduct/MarketplaceHeader";
import FooterSollaris from "layout/Footer";
import MenuLateralUsuario from "patterns/MenuLateralUsuario";
import { ReactNode, useEffect, useMemo, useState } from "react";
import styles from "./LayoutBusiness.module.scss";
import { AppShell, Navbar, Header } from "@mantine/core";
import { Sidebar } from "layout/Sidebar";

interface LayoutBusinessProps {
  children: ReactNode;
  quantidade?: number;
}

const LayoutBusiness = ({
  children,
  quantidade,
}: LayoutBusinessProps) => {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <>
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.layout__content}>
          <section className={styles["layout__content--children"]}>
            {children}
          </section>
        </div>
      </div>

      <FooterSollaris />
    </>
  );
};
export default LayoutBusiness;
