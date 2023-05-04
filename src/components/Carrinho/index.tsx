import styles from  "./Carrinho.module.scss"; 



interface CarrinhoProps{
    isCartAtivado: boolean;
}


const Carrinho = ({isCartAtivado}: CarrinhoProps) => {
    return(
        <div className={styles.carrinho + " " + `{${isCartAtivado ? styles.carrinhoAtivado : ""}}`}>
            <div className={styles.carrinhoHead}>
                <p>Seu Carrinho (0) itens</p>
            </div>
            <div className={styles.bodyWithoutProduct}>
                <h2>Seu Carrinho Está Vazio</h2>
                <p>Navegue pelas categorias da loja ou faça uma busca pelo seu produto.</p>
                <button className={styles.bodyWithoutProduct__button}>
                    Continuar Comprando
                </button>
            </div>
        </div>
    )
}
export default Carrinho; 