import styles from "./CartFinish.module.scss";
import FailedMessage from "./FailedMessage";
import SucessMessage from "./SucessMessage";
const CartFinish = () => {
  const isPurchaseDone = false;

  return (
    <div className={styles.mensagemStatus}>
      {isPurchaseDone ? <SucessMessage /> : <FailedMessage/>}
    </div>
  );
};
export default CartFinish;
