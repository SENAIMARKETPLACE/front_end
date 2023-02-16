import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import styles from "./FormCadastroUsuario.module.scss";

const InputField = styled(TextField)({
  gridColumn: '1/3', 
  width: '90%', 
  margin: '5px 0',
});

const ButtonForm = styled(Button)({
  backgroundColor: "#25D3DC", 
  marginTop: '10px',

});


const LinkForm = styled(Link)({
  gridColumn: '2/3', 
})


const FormCadastroUsuario = () => {
  return (      
    <form className={styles.form__body}>
      <InputField
        id="nome"
        label="Nome"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <InputField
        id="dt_nasc"
        label="Data de Nascimento"
        variant="outlined"
        type="date"
        InputLabelProps={{ shrink: true }}
      />

      <InputField
        id="cpf"
        label="CPF"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <InputField
        id="email"
        label="E-mail"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <InputField
        id="telefone"
        label="Telefone"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <InputField
        id="senha"
        label="Senha"
        variant="outlined"
        type="password"
        InputLabelProps={{ shrink: true }}
      />
      <InputField
        id="confirmaSenha"
        label="Confirme sua Senha"
        variant="outlined"
        type="password"
        InputLabelProps={{ shrink: true }}
      />
      <LinkForm href='/cadastroEndereco'>
        <ButtonForm variant="contained">
          Salvar e Continuar
        </ButtonForm>
      </LinkForm>
    </form>
  );
};
export default FormCadastroUsuario;
