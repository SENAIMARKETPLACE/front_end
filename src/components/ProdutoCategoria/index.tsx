import { Avatar } from '@mui/material';
import styles from './ProdutoCategoria.module.scss'

const brandsLogo = [
    {
        name: 'Nike',
        url: ''
    },
    {
        name: 'Nike',
        url: ''
    },
    {
        name: 'Nike',
        url: ''
    },
    {
        name: 'Nike',
        url: ''
    }
]

const ProdutoCategoria = () => {
    return (
        <div className={styles.category}>
            <span className={styles.avatars}>
                <Avatar
                    alt="Remy Sharp"
                    src=""
                    sx={{ width: 24, height: 24 }}
                />
                <Avatar
                    alt="Remy Sharp"
                    src=""
                    sx={{ width: 24, height: 24 }}
                />
                <Avatar
                    alt="Remy Sharp"
                    src=""
                    sx={{ width: 24, height: 24 }}
                />
                <Avatar
                    alt="Remy Sharp"
                    src=""
                    sx={{ width: 24, height: 24 }}
                />
            </span>
            <p className={styles.text}>Treino e Academia</p>
        </div>
    )
}

export default ProdutoCategoria;