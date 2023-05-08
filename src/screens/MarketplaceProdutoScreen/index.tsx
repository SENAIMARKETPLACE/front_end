import MenuLateralUsuario from '../../patterns/MenuLateralUsuario';
import styles from './MartketplaceProduto.module.scss'
import 'swiper/css';
import FooterSollaris from '../../layout/Footer';
import MarketplaceHeader from '../../components/MarketplaceProduct/MarketplaceHeader';
import ProductView from '../../components/MarketplaceProduct/ProductView';

const MarketplaceProdutoScreen = () => {
    return (
        <div className={styles.page_container}>
            <div className={styles.content}>
                <MenuLateralUsuario />
                <section className={styles.marketplace}>
                    <MarketplaceHeader />
                    <ProductView />
                </section>
            </div>
            <FooterSollaris />
        </div>
    )
}

export default MarketplaceProdutoScreen;