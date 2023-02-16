import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import styles from "./FormCadastroEndereco.module.scss";

const InputField = styled(TextField)({
  gridColumn: "1/3",
  width: "90%",
  margin: "5px 0",
});

const ButtonForm = styled(Button)({
  backgroundColor: "#25D3DC",
  gridColumn: "2/3",
  marginTop: "10px",
  width: "100px",
});

const LinkForm = styled(Link)({
  color: "#fff"
});

const FormCadastroEndereco = () => {
  return (
    <form className={styles.form__body}>
      <InputField
        id="cep"
        label="CEP"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <InputField
        id="logradouro"
        label="Logradouro"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />

      <InputField
        id="numero"
        label="Número"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <InputField
        id="bairro"
        label="Bairro"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <InputField
        id="cidade"
        label="Cidade"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <InputField
        id="estado"
        label="Estado"
        variant="outlined"
        type="password"
        InputLabelProps={{ shrink: true }}
      />
      <InputField
        id="complemento"
        label="Complemento"
        variant="outlined"
        type="password"
        InputLabelProps={{ shrink: true }}
      />

        <ButtonForm variant="contained">
          <LinkForm href="/#">Concluir</LinkForm>
        </ButtonForm>
      
    </form>
  );
};
export default FormCadastroEndereco;
