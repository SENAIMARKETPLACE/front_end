import MarketplaceHeader from 'components/MarketplaceProduct/MarketplaceHeader';
import FooterSollaris from 'layout/Footer';
import MenuLateralUsuario from 'patterns/MenuLateralUsuario';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import styles from './LayoutBusiness.module.scss';
import { AppShell, Navbar, Header } from '@mantine/core';
import { Sidebar } from 'layout/Sidebar';
import EmpresaBanner from 'components/EmpresaBanner';
import Banner from '../../../public/images/banner.png';
import { DrawerCompanyLinks } from 'components/DrawerCompanyLinks';

interface LayoutBusinessProps {
  children: ReactNode;
  quantidade?: number;
}

const LayoutBusiness = ({ children, quantidade }: LayoutBusinessProps) => {
  const [isLogged, setIsLogged] = useState(true);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.layout__content}>
          <EmpresaBanner image={Banner} alt="Capa da empresa" />
          <div className={styles['layout__content--menu']}>
            {windowWidth < 850 && <DrawerCompanyLinks />}
          </div>
          <section className={styles['layout__content--children']}>
            {children}
          </section>
        </div>
      </div>

      <FooterSollaris />
    </>
  );
};
export default LayoutBusiness;
