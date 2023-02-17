import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./FormCadastroUsuario.module.scss";
import { IUsuario } from "../../compartilhado/IUsuario";
import Router from 'next/router'

const InputField = styled(TextField)({
  gridColumn: "1/3",
  width: "90%",
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

  const [nome, setNome] = useState('')
  const [dataNasc, setDataNasc] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')

  const enviarDados = (nome: string, dataNasc:string, cpf: string, email: string, telefone: string, senha: string) => {
    Router.push({
      pathname: '/cadastroEndereco', 
      query: {
        nome: nome, 
        dataNasc: dataNasc,  
        cpf: cpf, 
        email: email, 
        telefone: telefone, 
        senha: senha
      }
    })
  }




  const criarDados = (e: React.FormEvent<HTMLFormElement>): IUsuario => {
    e.preventDefault()
    const usuario: IUsuario = { nome: nome, dtNascimento: dataNasc, cpf: cpf, email: email, telefone: telefone, senha: senha }
    alert(JSON.stringify(usuario))
    enviarDados(nome, dataNasc, cpf  ,email, telefone, senha)
    return usuario;

  }



  return (
    <form className={styles.form__body} onSubmit={criarDados}>
      <InputField
        id="nome"
        label="Nome"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => console.log(setNome(e.target.value))}
      />
      <InputField
        id="dt_nasc"
        label="Data de Nascimento"
        variant="outlined"
        type="date"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setDataNasc(e.target.value)}

      />

      <InputField
        id="cpf"
        label="CPF"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setCpf(e.target.value)}
      />
      <InputField
        id="email"
        label="E-mail"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        id="telefone"
        label="Telefone"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setTelefone(e.target.value)}
      />
      <InputField
        id="senha"
        label="Senha"
        variant="outlined"
        type="password"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setSenha(e.target.value)}
      />
      <InputField
        id="confirmaSenha"
        label="Confirme sua Senha"
        variant="outlined"
        type="password"
        InputLabelProps={{ shrink: true }}
      />

      <ButtonForm variant="contained" type="submit" onClick={() => criarDados}>
        {/* <LinkForm href="/cadastroEndereco"> */}
          Salvar e Continuar
        {/* </LinkForm> */}
      </ButtonForm>
    </form>
  );
};
export default FormCadastroUsuario;
