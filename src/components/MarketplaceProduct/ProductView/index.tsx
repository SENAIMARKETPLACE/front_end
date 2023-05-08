import ProductDetails from '../ProductDetails';
import ProductRate from '../ProductRate';
import styles from './ProductView.module.scss'


interface ProductViewProps {
    image: string;
    name: string;
    price: string;
    description: string; 
}

const ProductView = ({image, name, price, description}: ProductViewProps) => {


    const moeda = parseInt(price).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});


    return (
        <main className={styles.product}>
            <section className={styles.product_images}>
               
                <div className={styles.main_img}>
                    <img src={image} className={styles.product_img} alt={name} />
                </div>
            </section>
            <section className={styles.product_info}>
                <h2 className={styles.name}>{name}</h2>
                
                <p className={styles.price}>{moeda}</p>
                <p className={styles.payment_label}>Ver os meios de pagamento</p>
                <p className={styles.description}>
                    {description}
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