import styles from './CadastroProdutoScreen.module.scss';
import SideMenu from '../../patterns/SideMenu';

const CadastroProdutoScreen = () => {

    const menuItens = ['Minha Loja', 'Produtos', 'Dashboard', 'Configurações']

    return (
        <div className={styles.page}>
            <SideMenu items = {menuItens}/>
            <main>Conteúdo</main>
        </div>
    )
}

export default CadastroProdutoScreen;