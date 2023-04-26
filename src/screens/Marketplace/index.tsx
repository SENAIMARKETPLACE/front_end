import EmpresaBanner from '../../components/EmpresaBanner';
import MenuLateralUsuario from '../../patterns/MenuLateralUsuario';
import styles from './Martketplace.module.scss'
import Banner from '../../../public/images/banner_user.png';
import { Avatar } from '@mui/material';
import MiniSearchBar from '../../components/MiniSearchBar';
import ProdutoCategoria from '../../components/ProdutoCategoria';
import UsuarioProduto from '../../components/UsuarioProduto';
import 'swiper/css';
import { EmblaCarousel } from '../../components/CarouselProducts';
import FooterSollaris from '../../layout/Footer';
import http from '../../http';
import { useEffect, useState } from 'react';
import { IProduto } from '../../compartilhado/IProdutoPost';

const MarketplaceScreen = () => {
    const [products, setProducts] = useState<IProduto[]>([]);

    async function getProducts() {
        try {
            const response = await http.get("produtos");
            console.log(response)
            setProducts(response.data);
            console.log(products);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])


    return (
        <div className={styles.page_container}>
            <div className={styles.content}>
                <MenuLateralUsuario />
                <section className={styles.marketplace}>
                    <header className={styles.header}>
                        <h2>Olá João, <br></br> Veja o que temos para você hoje </h2>
                        <div className={styles.searchbar_and_avatar}>
                            <MiniSearchBar />
                            <Avatar alt="Remy Sharp" src="" />
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
                            {products.map((product) => (
                                <UsuarioProduto
                                    image={product.url_imagem}
                                    name={product.nome_produto}
                                    price={product.preco}
                                />
                            ))}
                            {products.map((product) => (
                                <UsuarioProduto
                                    image={product.url_imagem}
                                    name={product.nome_produto}
                                    price={product.preco}
                                />
                            ))}
                        </section>

                        <h2 className={styles.section__title}>Produtos mais visitados da semana</h2>
                        <p>Em breve...</p>
                        {/* <EmblaCarousel /> */}

                        <h2 className={styles.section__title}>Suplementos</h2>
                        <section className={styles.products_list}>
                            {products.map((product) => (
                                <UsuarioProduto
                                    image={product.url_imagem}
                                    name={product.nome_produto}
                                    price={product.preco}
                                />
                            ))}
                        </section>
                    </main>
                </section>
            </div>
            <FooterSollaris />
        </div>
    )
}

export default MarketplaceScreen;