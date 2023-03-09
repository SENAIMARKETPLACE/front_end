import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

const InputField = styled(TextField)({
  gridColumn: "1/3",
  width: "100%",
  margin: "5px 0",
});

const DadosPessoais = () => {
  return (
    <div>
        <InputField label="Nome" InputLabelProps={{shrink: true}}></InputField>
        <InputField label="CPF" InputLabelProps={{shrink: true}}></InputField>
        <InputField label="Telefone" InputLabelProps={{shrink: true}}></InputField>
        <InputField label="URL Foto de Perfil" InputLabelProps={{shrink: true}}></InputField>
        <InputField label="Data de Nascimento" type="date" InputLabelProps={{shrink: true}}></InputField>
        <InputField label="Gênero" InputLabelProps={{shrink: true}}></InputField>
        <InputField label="E-mail" InputLabelProps={{shrink: true}}></InputField>
        <InputField label="Senha" type="password" InputLabelProps={{shrink: true}}></InputField>
        <InputField label="Confirmar Senha" type="password" InputLabelProps={{shrink: true}}></InputField>
    </div>
  );
};
export default DadosPessoais;
