import styles from "./Steps.module.scss"
import {MdAddBusiness, MdLocationOn} from "react-icons/md"


interface StepsProps{
    passoAtual: number
}

const Steps = ({passoAtual}: StepsProps) => {
    return(
        <div className={styles.steps}>
            <div className={styles.step}>
                <div className={styles.step__icone + " " + styles.step__iconeAtivo} >
                    <MdAddBusiness/>
                </div>
                <p>DADOS DA EMPRESA</p>
            </div>
            <div className={styles.step}>
                <div className={styles.step__icone + " " + `${passoAtual == 1 ? styles.step__iconeAtivo : ""}`}>
                    <MdLocationOn/>
                </div>
                <p>ENDEREÇO DA EMPRESA</p>
            </div>
        </div>
    )

}
export default Steps;