import ProductDetails from '../ProductDetails';
import ProductRate from '../ProductRate';
import styles from './ProductView.module.scss'

const ProductView = () => {
    return (
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
                <ProductRate />
                <p className={styles.price}>R$ 200,00</p>
                <p className={styles.payment}>em <span>10x</span> <span>R$ 20,00</span> sem juros</p>
                <p className={styles.payment_label}>Ver os meios de pagamento</p>
                <p className={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, nihil voluptatum sunt officia voluptatem, ex sint dolore nemo atque dolor facere vel eveniet fugit perspiciatis modi officiis deleniti magni dolorum!
                    Adipisci, optio. Hic aperiam optio ratione laboriosam numquam perferendis consequuntur. Corporis sit optio ducimus, neque nulla.
                </p>

                <div className={styles.product_details}>
                    <ProductDetails />
                    <div className={styles.buttons}>
                        <button className={styles.button_buy}>Comprar agora</button>
                        <button className={styles.button_cart}>Adicionar ao carrinho</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ProductView;