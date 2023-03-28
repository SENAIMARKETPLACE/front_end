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
        <div>
            <span className={styles.avatar}>
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 24, height: 24 }}
                />
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 24, height: 24 }}
                />
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 24, height: 24 }}
                />
                                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 24, height: 24 }}
                />
            </span>
        </div>

    )
}

export default ProdutoCategoria;