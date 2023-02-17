import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { Link, TextField } from "@mui/material";
import styles from "./FormCadastroEndereco.module.scss";
import { useState } from "react";

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

const FormCadastroEndereco = () => {

  const [nome, setNome] = useState('')
  const [data, setData] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')



  return (
    <form className={styles.form__body}>
      <InputField
        id="cep"
        label="CEP"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => console.log(setNome(e.target.value))}
      />
      <InputField
        id="logradouro"
        label="Logradouro"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setData(e.target.value)}

      />

      <InputField
        id="numero"
        label="Número"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setCpf(e.target.value)}
      />
      <InputField
        id="bairro"
        label="Bairro"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        id="cidade"
        label="Cidade"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setTelefone(e.target.value)}
      />
      <InputField
        id="estado"
        label="Estado"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setSenha(e.target.value)}
      />
      <InputField
        id="complemento"
        label="Complemento"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />

      <ButtonForm variant="contained" type="submit">
          Finalizar Cadastro
      </ButtonForm>
    </form>
  );
};
export default FormCadastroEndereco;