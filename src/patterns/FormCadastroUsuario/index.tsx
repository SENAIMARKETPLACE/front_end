import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React, { use, useState } from "react";
import styles from "./FormCadastroUsuario.module.scss";
import { IUsuario } from "../../compartilhado/IUsuario";
import Router from "next/router";
import http from "../../http";
import axios from "axios";
import { MdNavigateNext, MdNavigateBefore, MdDone } from "react-icons/md";
import Agradecimento from "../../components/userFormStepper/ListaInteresses";
import DadosPessoais from "../../components/userFormStepper/DadosPessoais/main";
import DadosResidencial from "../../components/userFormStepper/DadosResidencial";
import Steps from "../../components/userFormStepper/Steps";
import { IDataUser } from "../../compartilhado/IDataUser";
import ListaInteresses from "../../components/userFormStepper/ListaInteresses";
import { IEndereco } from "../../compartilhado/IEndereco";



const formTemplate: IDataUser = {
  nome: "",
  cpf: "", 
  telefone: "", 
  urlFotoPerfil: "", 
  dataNasc: "", 
  genero: "", 
  email: "", 
  senha: "", 
  confirmeSenha: "", 
  cep: "", 
  logradouro: "", 
  complemento: "", 
  numero: "", 
  cidade: "", 
  estado: "", 
  bairro: "", 
}

const FormCadastroUsuario = () => {
  const [data, setData] = useState(formTemplate)
 
  const atualizarCampo = (key: string, value: string) => {
    setData((prev) => {
      return {...prev, [key]: value}
    })

  }
  

  const formComponents = [
    <DadosPessoais data={data} atualizarCampo={atualizarCampo}/>,
    <ListaInteresses data={data}/>,
    <DadosResidencial data={data} atualizarCampo={atualizarCampo}/>,
  ];
  const [idPasso, setIdPasso] = useState(0);


  const salvarUsuarioEEndereco = (e: React.MouseEvent<HTMLButtonElement>, dados: IDataUser) => {
    e.preventDefault()
    const user: IUsuario = {
      nome: dados.nome, 
      cpf: dados.cpf, 
      dt_nascimento: dados.dataNasc, 
      senha: dados.senha, 
      telefone: dados.telefone, 
      genero: dados.genero, 
      email: dados.email, 
      grupos_interesses: dados.listaInteresses, 
      img: dados.urlFotoPerfil, 
    }
    const endereco: IEndereco = {
      cep: dados.cep, 
      logradouro: dados.logradouro, 
      numero: dados.numero, 
      bairro: dados.bairro, 
      cidade: dados.cidade, 
      estado: dados.estado, 
      complemento: dados.complemento
    }
    http.post('usuarios', user)
    // MULTIPLAS REQUISIÇÕES -> POS
    .then((resp) => http.post('enderecos', endereco))
    .then((resp) => alert(`${user.nome} criado com sucesso`))
    .catch((err) => alert("Deu Ruim"))
  }


  
  //EVENTOS DE ANTERIOR E PRÓXIMO PASSo
  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (idPasso === formComponents.length - 1) {
      setIdPasso(2);
    } else {
      const passo = idPasso + 1;
      return setIdPasso(passo);
    }
  };


  
  const prevStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (idPasso === 0) {
      setIdPasso(0);
    } else {
      const passo = idPasso - 1;
      return setIdPasso(passo);
    }
  };

  
  const exibirDadosCapturados = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    return console.log(data)
  }

  const renderizacaoButtons = (step: number) => {
    if (step == 3) {
      return <Button onClick={nextStep}>CADASTRAR</Button>;
    }
    return <Button>ENVIAR</Button>;
  };

  return (
    <section className={styles.section__Form}>
      <div className={styles.setion__FormContainer}>
        {<Steps passoAtual={idPasso}/>}
        <form>
          {/* FORMULÁRIO SERÁ MODIFICADO DE FORMA DINÂMICA. */}
          <div className="section__InputsContainer">
            {formComponents[idPasso]}
          </div>
          <div className={styles.section_FormButtons}>
            {idPasso === 0 ? (
              ""
            ) : (
              <Button variant="contained" color="success" onClick={prevStep}>
                <MdNavigateBefore />
                <span>VOLTAR</span>
              </Button>
            )}

            {idPasso === 2 ? (
              <Button
                variant="contained"
                color="success"
                type="submit"
                onClick={(e) => {salvarUsuarioEEndereco(e, data)}}
              >
                <span>CADASTRAR</span>
                <MdDone />
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                type="submit"
                onClick={nextStep}
              >
                <span>PRÓXIMO</span>
                <MdNavigateNext />
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
export default FormCadastroUsuario;
