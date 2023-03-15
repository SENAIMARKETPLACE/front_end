import styles from './CadastroProdutoScreen.module.scss';
import SideMenu from '../../patterns/SideMenu/Company';

const CadastroProdutoScreen = () => {
    return (
        <div className={styles.page}>
            <SideMenu/>
            <main>Conteúdo</main>
        </div>
    )
}

export default CadastroProdutoScreen;