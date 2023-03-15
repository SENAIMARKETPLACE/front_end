import { Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { IDataUser } from "../../../compartilhado/IDataUser";
import React from "react";
import styles from "./DadosPessoais.module.scss";
import { height } from "@mui/system";


interface DadosPessoaisProps {
  data: IDataUser
  atualizarCampo: (key: string, value: string) => void
}

const InputField = styled(TextField)({
  width: "100%",
  margin: "5px 0",
});

const SelectField = styled(Select)({
  width: "100%",
  height: "55px", 
  margin: "5px 0",  
})



const DadosPessoais = ({ data, atualizarCampo }: DadosPessoaisProps) => {

  // const [genero, setGenero] = React.useState('');

  // const setarGenero = (event: SelectChangeEvent) => {
  //   setGenero(event.target.value);
  // };

  
  return (
    <section className={styles.camposCadastro}>
      <InputField label="Nome" InputLabelProps={{ shrink: true }} required value={data.nome || ""} onChange={(e) => atualizarCampo("nome", e.target.value)} className={styles.camposCadastro__nome} ></InputField>
      <InputField label="CPF" InputLabelProps={{ shrink: true }} required value={data.cpf || ""} onChange={(e) => atualizarCampo("cpf", e.target.value)} className={styles.camposCadastro__cpf}></InputField>
      <InputField label="URL Foto de Perfil" InputLabelProps={{ shrink: true }} required value={data.urlFotoPerfil || ""} onChange={(e) => atualizarCampo("urlFotoPerfil", e.target.value)} className={styles.campoCadastro__urlPerfil}></InputField>
      <InputField label="Telefone" InputLabelProps={{ shrink: true }} required value={data.telefone || ""} onChange={(e) => atualizarCampo("telefone", e.target.value)} className={styles.camposCadastro__telefone}></InputField>
      <InputField label="Data de Nascimento" type="date" InputLabelProps={{ shrink: true }} required value={data.dataNasc || ""} onChange={(e) => atualizarCampo("dataNasc", e.target.value)} className={styles.camposCadastro__dtNasc}></InputField>
      <SelectField
          value={data.genero || ""}
          onChange={(e: SelectChangeEvent) => atualizarCampo("genero", e.target.value)}
          displayEmpty
          required
          className={styles.camposCadastro__genero}
        >
          <MenuItem value="">
            Gênero
          </MenuItem>
          <MenuItem value="Feminino">Feminino</MenuItem>
          <MenuItem value="Masculino">Masculino</MenuItem>
          <MenuItem value="Não Informar">Não Informar</MenuItem>
        </SelectField>
      <InputField label="E-mail" InputLabelProps={{ shrink: true }} required value={data.email || ""} onChange={(e) => atualizarCampo("email", e.target.value)} className={styles.camposCadastro__email}></InputField>
      <InputField label="Senha"  type="password" InputLabelProps={{ shrink: true }} required value={data.senha || ""} onChange={(e) => atualizarCampo("senha", e.target.value)} className={styles.camposCadastro__senha}></InputField>
      <InputField label="Confirmar Senha" type="password" InputLabelProps={{ shrink: true }} required value={data.confirmeSenha || ""} onChange={(e) => atualizarCampo("confirmeSenha", e.target.value)} className={styles.camposCadastro__confirmarSenha}></InputField>
    </section>
  );
};
export default DadosPessoais;
