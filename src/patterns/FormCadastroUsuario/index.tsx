import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./FormCadastroUsuario.module.scss";
import { IUsuario } from "../../compartilhado/IUsuario";
import Router from "next/router";
import http from "../../http";
import axios from "axios";

const InputField = styled(TextField)({
  gridColumn: "1/3",
  width: "100%",
  margin: "5px 0",
});

const ButtonForm = styled(Button)({
  backgroundColor: "#25D3DC",
  gridColumn: "2/3",
  marginTop: "10px",
});

const LinkForm = styled(Link)({
  color: "#fff",
});

const FormCadastroUsuario = () => {
  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");

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

  return (
    <form className={styles.form__body} onSubmit={criarDados}>
      <InputField
        id="nome"
        label="Nome"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => console.log(setNome(e.target.value))}
        value={nome}
        required
      />
      <InputField
        id="dt_nasc"
        label="Data de Nascimento"
        variant="outlined"
        type="date"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setDataNasc(e.target.value)}
        value={dataNasc}
        required
      />

      <InputField
        id="cpf"
        label="CPF"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setCpf(e.target.value)}
        value={cpf}
        required
      />
      <InputField
        id="email"
        label="E-mail"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <InputField
        id="telefone"
        label="Telefone"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setTelefone(e.target.value)}
        value={telefone}
        required
      />
      <InputField
        id="senha"
        label="Senha"
        variant="outlined"
        type="password"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
        required
      />
      <InputField
        id="confirmaSenha"
        label="Confirme sua Senha"
        variant="outlined"
        type="password"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setConfirmeSenha(e.target.value)}
        value={confirmeSenha}
        required
      />

      <ButtonForm variant="contained" type="submit" onClick={() => criarDados}>
        {/* <LinkForm href="/cadastroEndereco"> */}
        Criar Usuário
        {/* </LinkForm> */}
      </ButtonForm>
    </form>
  );
};
export default FormCadastroUsuario;
