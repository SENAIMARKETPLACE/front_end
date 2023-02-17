import * as React from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { Link, TextField } from "@mui/material";
import styles from "./FormCadastroEndereco.module.scss";
import { useState } from "react";
import { IUsuario } from "../../compartilhado/IUsuario";


interface FormCadastroEnderecoProps{
  dadosUsuarios: IUsuario
}

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

const FormCadastroEndereco = ({dadosUsuarios}: FormCadastroEnderecoProps) => {

  const [cep, setCep] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [complemento, setComplemento] = useState('')



  return (
    <form className={styles.form__body}>

      <h1>{dadosUsuarios.nome} Insira seu endereço</h1>


      <InputField
        id="cep"
        label="CEP"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => console.log(setCep(e.target.value))}
      />
      <InputField
        id="logradouro"
        label="Logradouro"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setLogradouro(e.target.value)}

      />

      <InputField
        id="numero"
        label="Número"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setNumero(e.target.value)}
      />
      <InputField
        id="bairro"
        label="Bairro"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setBairro(e.target.value)}
      />
      <InputField
        id="cidade"
        label="Cidade"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setCidade(e.target.value)}
      />
      <InputField
        id="estado"
        label="Estado"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setEstado(e.target.value)}
      />
      <InputField
        id="complemento"
        label="Complemento"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setComplemento(e.target.value)}

      />

      <ButtonForm variant="contained" type="submit">
          Finalizar Cadastro
      </ButtonForm>
    </form>
  );
};
export default FormCadastroEndereco;