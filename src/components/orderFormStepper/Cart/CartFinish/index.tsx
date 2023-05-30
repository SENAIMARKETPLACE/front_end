import LoadingGif from "layout/LoadingGif";
import styles from "./CartFinish.module.scss";
import FailedMessage from "./FailedMessage";
import SucessMessage from "./SucessMessage";
  

interface CartFinishProps  {
  isOrderFinished: number; 
}


const CartFinish = ({isOrderFinished}: CartFinishProps) => {
  
  return (
    <div className={styles.mensagemStatus}>
      {(isOrderFinished == 0) ? <LoadingGif/> : (isOrderFinished == 1) ? <SucessMessage/> : <FailedMessage/>}
    </div>
  );
};
export default CartFinish;
