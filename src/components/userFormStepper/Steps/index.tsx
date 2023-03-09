import React from "react";
import { MdPerson, MdHome, MdLightbulbOutline } from "react-icons/md";
import styles from "./Steps.module.scss";

interface PropsSteps {
  passoAtual: number;
}

const Steps = ({ passoAtual }:PropsSteps) => {
  return (
    <div className={styles.steps}>
      <div className={styles.step}>
        <div className={styles.icone + " " + styles.iconeAtivo}>
          <MdPerson />
        </div>
        <p>DADOS PESSOAIS</p>
      </div>
      <div className={styles.step}>
        <div className={styles.icone + " " + `${passoAtual >= 1 ? styles.iconeAtivo: ''}`}>
          <MdHome />
        </div>
        <p>DADOS RESIDENCIAIS</p>
      </div>
      <div className={styles.step}>
        <div className={styles.icone + " " + `${passoAtual >= 2 ? styles.iconeAtivo: ''}`}>
          <MdLightbulbOutline />
        </div>
        <p>LISTA DE INTERESSE</p>
      </div>
    </div>
  );
};
export default Steps;
