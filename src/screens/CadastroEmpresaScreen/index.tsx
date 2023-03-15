import styles from './CadastroEmpresaScreen.module.scss'
import LogoMain from '../../../public/images/logo_sollaris.png'
import FormCadastroEmpresa from '../../patterns/FormCadastroEmpresa';

const CadastroEmpresaScreen = () => {
    return(
        <main className={styles.main}>
            <section className={styles.register}>
                <div className={styles.register__header}>
                    <h1 className={styles.register__title}>
                        Gerencie sua empresa<span> Sollaris</span>
                    </h1>
                    <img
                        className={styles.register__logo}
                        src={LogoMain.src}
                        alt="Logo Sollaris"
                    />
                </div>
                <div className={styles.register__forms}>
                    <FormCadastroEmpresa/>
                </div>
                <div className={styles.register__image}></div>
            </section>
        </main>

    )
}
export default CadastroEmpresaScreen;