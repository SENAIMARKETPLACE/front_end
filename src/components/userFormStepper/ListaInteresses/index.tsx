import { Button, styled } from "@mui/material";
import { useState } from "react";
import { Idata } from "../../../compartilhado/IData";
import styles from "./ListaInteresses.module.scss";

interface ListaInteressesProps {
  data: Idata;
  atualizarCampo: (key: string, value: string) => void;
}



const ListaInteresses = ({ data }: ListaInteressesProps) => {


  const InteressesButton = styled(Button)({
    backgroundColor: "#b3b3b3",
    color: "#fff",
    '&:hover':{
      backgroundColor: "#b3b3b3",
    }
  });
  
  const ativarInteresse = () => {
    InteressesButton
  }


  return (
    <div className={styles.camposCadastro}>
      <InteressesButton
        className={
          styles.camposCadastro__acessorios +
          " " +
          styles.camposCadastro__butons
        }
      >
        Acessórios
      </InteressesButton>
      <InteressesButton
        className={
          styles.camposCadastro__suplementos +
          " " +
          styles.camposCadastro__butons
        }
      >
        Suplementos
      </InteressesButton>
      <InteressesButton
        className={
          styles.camposCadastro__esportes + " " + styles.camposCadastro__butons
        }
      >
        Esportes
      </InteressesButton>
      <InteressesButton
        className={
          styles.camposCadastro__roupas + " " + styles.camposCadastro__butons
        }
      >
        Roupas
      </InteressesButton>
      <InteressesButton
        className={
          styles.camposCadastro__calcados + " " + styles.camposCadastro__butons
        }
      >
        Calçados
      </InteressesButton>
    </div>
  );
};
export default ListaInteresses;
