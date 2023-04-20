import EmpresaBanner from '../../components/EmpresaBanner';
import MenuLateralUsuario from '../../patterns/MenuLateralUsuario';
import styles from './MartketplaceProduto.module.scss'
import Banner from '../../../public/images/banner_user.png';
import { Avatar } from '@mui/material';
import MiniSearchBar from '../../components/MiniSearchBar';
import ProdutoCategoria from '../../components/ProdutoCategoria';
import UsuarioProduto from '../../components/UsuarioProduto';
import 'swiper/css';
import FooterSollaris from '../../layout/Footer';
import http from '../../http';
import { useEffect, useState } from 'react';
import { IProduto } from '../../compartilhado/IProduto';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { FaStar } from 'react-icons/fa';

const MarketplaceProdutoScreen = () => {
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
                        <IoIosArrowDropleftCircle className={styles.return_icon} />
                        <div className={styles.searchbar_and_avatar}>
                            <MiniSearchBar />
                            <Avatar alt="Remy Sharp" src="" />
                        </div>
                    </header>

                    <ul className={styles.categories}>
                        {/* <ul> */}
                        <li>Categoria</li>
                        <li>Categoria</li>
                        <li>Categoria</li>
                        <li>Categoria</li>
                        <li>Categoria</li>
                        {/* </ul> */}
                    </ul>
                    <main className={styles.product}>
                        <section className={styles.product_images}>
                            <div className={styles.aditional_imgs}>
                                <img src='https://http2.mlstatic.com/D_NQ_NP_2X_720971-MLB53882219864_022023-F.webp' className={styles.product_img} />
                                <img src="https://http2.mlstatic.com/D_NQ_NP_2X_791754-MLB51448840223_092022-F.webp" alt="" className={styles.product_img} />
                                <img src="https://http2.mlstatic.com/D_NQ_NP_2X_670791-MLB49930690925_052022-F.webp" alt="" className={styles.product_img} />
                                <img src="https://http2.mlstatic.com/D_NQ_NP_2X_646899-MLB51448896015_092022-F.webp" alt="" className={styles.product_img} />
                                <img src="https://http2.mlstatic.com/D_NQ_NP_2X_725361-MLB48743366198_012022-F.webp" alt="" className={styles.product_img} />
                            </div>
                            <div className={styles.main_img}>
                                <img src='https://http2.mlstatic.com/D_NQ_NP_2X_720971-MLB53882219864_022023-F.webp' className={styles.product_img} />
                            </div>
                        </section>
                        <section className={styles.product_info}>
                            <h2 className={styles.name}>Camiseta Fila - Pro Edition</h2>
                            <div className={styles.rate}>
                                <div className={styles.rate_stars}>
                                    <FaStar className={styles.star_selected} />
                                    <FaStar className={styles.star_selected} />
                                    <FaStar className={styles.star_selected} />
                                    <FaStar className={styles.star_selected} />
                                    <FaStar className={styles.star_default} />
                                </div>
                                <span>(300)</span>
                            </div>
                            <p className={styles.price}>R$ 200,00</p>
                            <p className={styles.payment}>em <span>10x</span> <span>R$ 20,00</span> sem juros</p>
                            <p className={styles.payment_options}>Ver os meios de pagamento</p>
                            <p className={styles.description}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, nihil voluptatum sunt officia voluptatem, ex sint dolore nemo atque dolor facere vel eveniet fugit perspiciatis modi officiis deleniti magni dolorum!
                                Adipisci, optio. Hic aperiam optio ratione laboriosam numquam perferendis consequuntur. Corporis sit optio ducimus, neque nulla.
                            </p>

                            <div>
                                <div className={styles.details}>
                                    <h3>Tamanhos:</h3>
                                    <div className={styles.size_options}>
                                        <span className={styles.size}>P</span>
                                        <span className={styles.size}>M</span>
                                        <span className={styles.size}>G</span>
                                        <span className={styles.size}>GG</span>
                                    </div>


                                    <h3>Cores:</h3>

                                    <div className={styles.colors}>
                                        <input type='radio' name="color" className={styles.color} />
                                        <input type='radio' name="color" className={styles.red} />
                                        <input type='radio' name="color" className={styles.blue} />
                                        <input type='radio' name="color" className={styles.orange} />
                                    </div>
                                </div>
                                <div className={styles.buttons}>
                                    <button className={styles.button}>Comprar agora</button>
                                    <button className={styles.button}>Adicionar ao carrinho</button>
                                </div>
                            </div>

                            {/* EDITAR CORES */}
                            {/* <input type="radio" id="age3" name="age" value="100"/> */}

                            {/* <span className={styles.description_color}></span>
                            <span className={styles.description_color}></span>
                            <span className={styles.description_color}></span>
                            <span className={styles.description_color}></span> */}
                        </section>
                    </main>
                    {/* <EmpresaBanner image={Banner} alt="Capa da empresa" /> */}
                </section>
            </div>
            <FooterSollaris />
        </div>
    )
}

export default MarketplaceProdutoScreen;