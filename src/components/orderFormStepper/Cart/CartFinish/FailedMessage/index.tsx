import styles from "./FailedMessage.module.scss";
import imageFailed from "../../../../../../public/images/purchaseNotFinished.png";

const FailedMessage = () => {
  return (
    <div className={styles.mensagemPedido}>
      <div className={styles.mensagemPedido__imageDiv}>
        <img src={imageFailed.src} alt="PEDIDO NÃO CONCLUÍDO" />
      </div>
      <h1 className={styles.mensagemPedido__falha}>
        CALMA LÁ ATLETA! SEU PEDIDO AINDA NÃO FOI CONCLUÍDO.
      </h1>
      <div className={styles.mensagemPedido__falha__descricao}>
          <p >
            Fique zen, não se preocupe! Se você não conseguiu finalizar a compra,
            sugerimos que você volte à tela principal e tente novamente. Às vezes,
            um pequeno problema técnico pode ocorrer, mas estamos aqui para ajudar
            você a aproveitar ao máximo nossa loja.
          </p>
      </div>

      <div className={styles.mensagemPedido__buttons}>
        <button
          className={
            styles.mensagemPedido__buttons__voltarCompra + " " + styles.buttons
          }
        >
          PÁGINA PRINCIPAL
        </button>
      </div>
    </div>
  );
};
export default FailedMessage;
