import styles from './CadastroProdutoScreen.module.scss';
import SideMenu from '../../patterns/SideMenu/Company';
import Banner from '../../../public/images/banner.png';
import SearchBar from '../../components/SearchBar';
// import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { BiPlus } from "react-icons/bi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import ProductItemList from '../../patterns/Products/List';
import { httpProduto } from '../../http';
import { useEffect, useState } from 'react';
import NewProductModal from '../../components/Modais/ModalNewProduct';


const CadastroProdutoScreen = () => {

    async function getProducts() {
        try {
            const response = await httpProduto.get("/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const [products, setProducts] = useState([]);
    useEffect(() => { getProducts(); }, []);

    return (
        <div className={styles.page}>
            <SideMenu />
            <section>
                <img
                    className={styles.banner}
                    src={Banner.src}
                    alt="Banner da empresa" />
                <main className={styles.content}>
                    <div className={styles.title__container}>
                        <h1 className={styles.title__h1}>Meus produtos</h1>
                        <NewProductModal />
                    </div>
                    <div className={styles.searchBar__container}>
                        <SearchBar />
                        <ToggleButtonGroup
                            exclusive
                            aria-label="text alignment"
                            className={styles.searchBar__view}
                        >
                            <ToggleButton value="left" aria-label="left aligned">
                                <BsFillGrid3X3GapFill />
                            </ToggleButton>
                            <ToggleButton value="right" aria-label="right aligned">
                                <FaListUl />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className={styles.products}>
                        <ul className={styles.products__list}>
                            {products.map(product =>
                                <ProductItemList
                                    key={product.id}
                                    photo={product.img}
                                    name={product.nome}
                                    price={product.preco}
                                />)}
                        </ul>
                    </div>
                </main>
            </section>
        </div>
    )
}

export default CadastroProdutoScreen;