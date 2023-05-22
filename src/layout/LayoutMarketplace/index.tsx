import MarketplaceHeader from "components/MarketplaceProduct/MarketplaceHeader";
import FooterSollaris from "layout/Footer";
import MenuLateralUsuario from "patterns/MenuLateralUsuario";
import { ReactNode, useMemo } from "react";
import styles from "./LayoutMarketplace.module.scss";

interface LayoutMarketplaceProps {
  children: ReactNode;
}

const LayoutMarketplace = ({ children }: LayoutMarketplaceProps) => {

  return (
    <>
      <MarketplaceHeader quantidade={0}/>
      <section className={styles.mainContent}>
        <MenuLateralUsuario />
        {children}
      </section>
      <FooterSollaris />
    </>
  );
};
export default LayoutMarketplace;
