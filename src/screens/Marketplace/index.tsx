import EmpresaBanner from '../../components/EmpresaBanner';
import MenuLateralUsuario from '../../patterns/MenuLateralUsuario';
import styles from './Martketplace.module.scss'
import Banner from '../../../public/images/banner.png';

const MarketplaceScreen = () => {
    return (
        <div className={styles.page_container}>
            <MenuLateralUsuario />
            <section>
                <EmpresaBanner image={Banner} alt="Capa da empresa" />
                <main className={styles.main_content}>
                    
                </main>
            </section>
        </div>
    )
}

export default MarketplaceScreen;