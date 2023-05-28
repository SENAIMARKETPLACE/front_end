import imageSuccess from "../../../../../../public/images/cartSuccessFinish.png";
import styles from "./SucessMessage.module.scss";

const SucessMessage = () => {
  return (
    <div className={styles.mensagemPedido__sucesso}>
      <div className={styles.mensagemPedido__imageDiv}>
        <img src={imageSuccess.src} alt="PEDIDO CONCLUÍDO COM SUCESSO" />
      </div>
      <h1 className={styles.mensagemPedido__concluido}>
        PODE ESPERAR NA TORCIDA POIS SEU PEDIDO FOI CONCLUÍDO COM SUCESSO!
      </h1>
      <p>
        Seu pedido foi finalizado com sucesso! Agora é hora de aguardar um
        pouquinho enquanto preparamos tudo com muito cuidado.
      </p>

      <div className={styles.mensagemPedido__buttons}>
        <button className={styles.mensagemPedido__buttons__voltarCompra + " " + styles.buttons}>
          VOLTAR AS COMPRAS
        </button>
        <button
          className={styles.mensagemPedido__buttons__visualizarMeusPedidos + " " + styles.buttons}
        >
            VISUALIZAR MEUS PEDIDOS
        </button>
      </div>
    </div>
  );
};
export default SucessMessage;
