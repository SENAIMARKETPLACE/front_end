import EmpresaBanner from '../../components/EmpresaBanner';
import MenuLateralUsuario from '../../patterns/MenuLateralUsuario';
import styles from './Martketplace.module.scss'
import Banner from '../../../public/images/banner_user.png';
import SearchBar from '../../components/SearchBar';
import { Avatar, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import MiniSearchBar from '../../components/MiniSearchBar';
import ProdutoCategoria from '../../components/ProdutoCategoria';
import UsuarioProduto from '../../components/UsuarioProduto';
import 'swiper/css';
// import CarouselProducts from '../../components/CarouselProducts';
import { EmblaCarousel } from '../../components/CarouselProducts';
import FooterSollaris from '../../layout/Footer';

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
                    <div className={styles.categories}>
                        <ProdutoCategoria />
                        <ProdutoCategoria />
                        <ProdutoCategoria />
                    </div>

                    <h2 className={styles.section__title}>Produtos para você</h2>
                    <section className={styles.products_list}>
                        <UsuarioProduto />
                        <UsuarioProduto />
                        <UsuarioProduto />
                        <UsuarioProduto />
                        <UsuarioProduto />
                        <UsuarioProduto />
                        <UsuarioProduto />
                        <UsuarioProduto />
                    </section>

                    <h2 className={styles.section__title}>Produtos mais visitados da semana</h2>
                    <EmblaCarousel />

                    <h2 className={styles.section__title}>Suplementos</h2>
                    <section className={styles.products_list}>
                        <UsuarioProduto />
                        <UsuarioProduto />
                        <UsuarioProduto />
                        <UsuarioProduto />
                    </section>
                </main>
            </section>
        {/* <FooterSollaris /> */}
        </div>
    )
}

export default MarketplaceScreen;