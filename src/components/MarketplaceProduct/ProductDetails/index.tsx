import styles from './ProductDetails.module.scss'

const ProductDetails = () => {
    return (
        <div className={styles.details}>
            <h3 className={styles.title}>Tamanhos:</h3>
            <div className={styles.size_options}>
                <span className={styles.size}>P</span>
                <span className={styles.size}>M</span>
                <span className={styles.size}>G</span>
                <span className={styles.size}>GG</span>
            </div>

            <h3 className={styles.title}>Cores:</h3>
            <div className={styles.colors}>
                <span className={styles.color} style={{backgroundColor: 'red'}}></span>
                <span className={styles.color} style={{backgroundColor: 'yellow'}}></span>
                <span className={styles.color} style={{backgroundColor: 'blue'}}></span>
                <span className={styles.color} style={{backgroundColor: 'black'}}></span>
            </div>
        </div>
    )
}

export default ProductDetails