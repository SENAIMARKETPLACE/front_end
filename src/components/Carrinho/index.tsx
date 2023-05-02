import styles from  "./Carrinho.module.scss"; 



interface CarrinhoProps{
    isCartAtivado: boolean;
}


const Carrinho = ({isCartAtivado}: CarrinhoProps) => {
    return(
        <div className={styles.carrinhoBody + " " + `{${isCartAtivado ? styles.carrinhoAtivado : ""}}`}>
            TESTE
        </div>
    )
}
export default Carrinho; 