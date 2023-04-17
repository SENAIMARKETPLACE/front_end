import CardSingIn from "../CardSingIn";
import styles from "./sectionSignIn.module.scss"

const SectionSignIn = () => {
    return(
        <section className={styles.sectionSign}>
            <h3>CADASTRE-SE E CONHEÇA NOSSA COMUNIDADE</h3>
            <div className={styles.sectionSignCards}>
                
                <CardSingIn urlImg=" https://images.unsplash.com/photo-1526401485004-46910ecc8e51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" title="Cadastre sua empresa" description="Mude a sua vida. Tenha à liberdade para vender seus produtos, customizar sua loja e empreender" linkHref="cadastro-empresa"/>
                <CardSingIn urlImg="https://images.unsplash.com/photo-1585938389612-a552a28d6914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" title="Cadastre-se" description="Entre na nossa comunidade de apaixonados pelo esporte e encontre produtos que te levarão à vitória" linkHref="cadastro-usuario"/>
            </div>
        </section>
    )
}
export default SectionSignIn;


