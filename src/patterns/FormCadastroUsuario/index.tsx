
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './FormCadastroUsuario.module.scss';
import { IUsuario } from '../../compartilhado/IUsuario';
import Router from 'next/router'

const InputField = styled(TextField)({
  gridColumn: '1/3',
  width: '100%',
  margin: '5px 0',
});

const ButtonForm = styled(Button)({
  backgroundColor: '#25D3DC',
  gridColumn: '2/3',
  marginTop: '10px',
});

const LinkForm = styled(Link)({
  color: '#fff',
});

const FormCadastroUsuario = () => {
  const [nome, setNome] = useState('')
  const [dataNasc, setDataNasc] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmeSenha, setConfirmeSenha] = useState('')

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




  const criarDados = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const usuario: IUsuario = { nome: nome, cpf: cpf, dtNascimento: dataNasc, senha: senha, email: email, telefone: telefone}
    console.log(usuario)
    alert(JSON.stringify(usuario))
  
    fetch('http://localhost:5000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(usuario),
    })
    .then((response) => response.json())
    .then((data) => {
      alert(`Usuário ${usuario.nome} Cadastrado com sucesso!`)
      setNome('')
      setDataNasc('')
      setCpf('')
      setEmail('')
      setTelefone('')
      setSenha('')
      setConfirmeSenha('')
    })
    .catch((error) =>{
      console.log('Error:', error)
      
    })

  }


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
