import styles from "./CardSignIn.module.scss"

const CardSingIn = () => {
    return(
        <>
            <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                    <img className={styles.cardHeader__img} src="https://images.unsplash.com/photo-1526401485004-46910ecc8e51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Imagem Cadastro Login" />
                </div>
                <div className={styles.cardHeader__description}>
                    <p>CADASTRE SUA EMPRESA</p>
                </div>

            </div>
        </>
    )
}
export default CardSingIn;