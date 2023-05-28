import MarketplaceHeader from 'components/MarketplaceProduct/MarketplaceHeader';
import FooterSollaris from 'layout/Footer';
import MenuLateralUsuario from 'patterns/MenuLateralUsuario';
import { ReactNode, useMemo, useState } from 'react';
import styles from './LayoutMarketplace.module.scss';
import { AppShell, Navbar, Header } from '@mantine/core';
import { Sidebar } from 'layout/Sidebar';

interface LayoutMarketplaceProps {
  children: ReactNode;
}

const LayoutMarketplace = ({ children }: LayoutMarketplaceProps) => {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <>
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.layout__content}>
          <MarketplaceHeader quantidade={0} isLogged={isLogged} />
          {children}
        </div>
      </div>

      <FooterSollaris />
    </>
  );
};
export default LayoutMarketplace;
