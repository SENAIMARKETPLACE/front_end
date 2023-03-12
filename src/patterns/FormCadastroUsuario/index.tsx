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
import { Idata } from "../../compartilhado/IData";
import ListaInteresses from "../../components/userFormStepper/ListaInteresses";

const InputField = styled(TextField)({
  gridColumn: "1/3",
  width: "100%",
  margin: "5px 0",
});

const ButtonForm = styled(Button)({
  backgroundColor: "#25D3DC",
  width: "50px",
});

const LinkForm = styled(Link)({
  color: "#fff",
});


const formTemplate: Idata = {
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
  
  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");
  const formComponents = [
    <DadosPessoais data={data} atualizarCampo={atualizarCampo}/>,
    <ListaInteresses data={data} atualizarCampo={atualizarCampo}/>,
    <DadosResidencial data={data} atualizarCampo={atualizarCampo}/>,
  ];
  const [idPasso, setIdPasso] = useState(0);

  const enviarDados = (
    nome: string,
    dataNasc: string,
    cpf: string,
    email: string,
    telefone: string,
    senha: string
  ) => {
    Router.push({
      pathname: "/cadastroEndereco",
      query: {
        nome: nome,
        dataNasc: dataNasc,
        cpf: cpf,
        email: email,
        telefone: telefone,
        senha: senha,
      },
    });
  };

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

  const criarDados = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const usuario: IUsuario = {
      nome: nome,
      cpf: cpf,
      dt_nascimento: dataNasc,
      senha: senha,
      email: email,
      telefone: telefone,
    };

    http
      .post("usuarios", {
        nome: nome,
        cpf: cpf,
        dt_nascimento: dataNasc,
        senha: senha,
        email: email,
        telefone: telefone,
      })
      .then(() => {
        alert(`Usuário Cadastrado: ${usuario.nome} com sucesso`);
        setNome("");
        setDataNasc("");
        setCpf("");
        setEmail("");
        setTelefone("");
        setSenha("");
        setConfirmeSenha("");
      })
      .catch((error) => console.log(error));

    // const usuarioEnv = new FormData();
    // usuarioEnv.append('nome', nome)
    // usuarioEnv.append('cpf', cpf )
    // usuarioEnv.append('dt_nascimento', dataNasc)
    // usuarioEnv.append('senha', senha)
    // usuarioEnv.append('email', email)
    // usuarioEnv.append('telefone', telefone)

    // http.request({
    //     url: 'usuarios/',
    //     method: 'POST',
    //     data: usuarioEnv,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then(() => {
    //     setNome("");
    //     setDataNasc("");
    //     setCpf("");
    //     setEmail("");
    //     setTelefone("");
    //     setSenha("");
    //     setConfirmeSenha("");
    //     alert(`Usuário ${usuario.nome} Cadastrado com sucesso!`);
    //   })
    //   .catch(error => console.log(error));
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
                onClick={exibirDadosCapturados}
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
