import EmpresaBanner from '../../components/EmpresaBanner';
import MenuLateralUsuario from '../../patterns/MenuLateralUsuario';
import styles from './Martketplace.module.scss'
import Banner from '../../../public/images/banner_user.png';
import SearchBar from '../../components/SearchBar';
import { Avatar, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import MiniSearchBar from '../../components/MiniSearchBar';
import ProdutoCategoria from '../../components/ProdutoCategoria';

const MarketplaceScreen = () => {
    return (
        <div className={styles.page_container}>
            <MenuLateralUsuario />
            <section className={styles.marketplace}>
                <header className={styles.header}>
                    <h2>Olá João, <br></br> Veja o que temos para você hoje </h2>
                    <div className={styles.searchbar_and_avatar}>
                        <MiniSearchBar />
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </div>
                </header>

                <p className={styles.banner_text}>
                    Encontre sua velocidade
                </p>
                <EmpresaBanner image={Banner} alt="Capa da empresa" />
                <main className={styles.main_content}>

                    <h2 className={styles.section__title}>Explore Categorias Populares</h2>
                    <ProdutoCategoria />


                </main>
            </section>
        </div>
    )
}

export default MarketplaceScreen;