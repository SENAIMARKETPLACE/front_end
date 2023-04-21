import { FaStar } from 'react-icons/fa'
import styles from './ProductRate.module.scss'

const ProductRate = () => {
    return (
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
    )
}

export default ProductRate