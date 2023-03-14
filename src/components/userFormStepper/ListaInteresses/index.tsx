import { Button, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Idata } from "../../../compartilhado/IData";
import styles from "./ListaInteresses.module.scss";

interface ListaInteressesProps {
  data: Idata;
}

const ListaInteresses = ({ data }: ListaInteressesProps) => {
  const listaInteresses: string[] = data.listaInteresses || [];

  useEffect(() => {
    persistirInteressesSelecionados(listaInteresses);
    console.log(data.listaInteresses);
  });

  const InteressesButton = styled(Button)({
    backgroundColor: "#b3b3b3",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#b3b3b3",
    },
  });

  function persistirInteressesSelecionados(arrayInteresses: string[]) {
    // data.listaInteresses = listaInteresses
    listaInteresses.map((categoria) => {
      console.log(categoria);
      document.getElementById(categoria).classList.add(`${styles.botaoAtivo}`);
    });
  }

  const ativarButton = (e: React.MouseEvent<HTMLElement>) => {
    const idButton = e.currentTarget.id;
    if (e.currentTarget.className.includes("botaoAtivo")) {
      document
        .getElementById(idButton)
        .classList.remove(`${styles.botaoAtivo}`);
      var index = listaInteresses.indexOf(idButton);
      listaInteresses.splice(index, 1);
      data.listaInteresses = listaInteresses;
      console.log(listaInteresses);
    } else {
      document.getElementById(idButton).classList.add(`${styles.botaoAtivo}`);
      listaInteresses.push(idButton);
      data.listaInteresses = listaInteresses;
      console.log(listaInteresses);
    }
  };

  return (
    <div className={styles.camposCadastro}>
      <InteressesButton
        value="acessorios"
        id="acessorios"
        className={styles.camposCadastro__acessorios}
        onClick={(e) => ativarButton(e)}
      >
        Acessórios
      </InteressesButton>
      <InteressesButton
        id="suplementos"
        className={
          styles.camposCadastro__suplementos +
          " " +
          styles.camposCadastro__butons
        }
        value="suplementos"
        onClick={(e) => ativarButton(e)}
      >
        Suplementos
      </InteressesButton>
      <InteressesButton
        className={
          styles.camposCadastro__esportes + " " + styles.camposCadastro__butons
        }
        id="esportes"
        value="esportes"
        onClick={(e) => ativarButton(e)}
      >
        Esportes
      </InteressesButton>
      <InteressesButton
        className={styles.camposCadastro__roupas}
        value="roupas"
        id="roupas"
        onClick={(e) => ativarButton(e)}
      >
        Roupas
      </InteressesButton>
      <InteressesButton
        className={styles.camposCadastro__calcados}
        value="calcados"
        id="calcados"
        onClick={(e) => ativarButton(e)}
      >
        Calçados
      </InteressesButton>
    </div>
  );
};
export default ListaInteresses;