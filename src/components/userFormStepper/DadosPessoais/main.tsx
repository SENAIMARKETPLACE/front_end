import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { Idata } from "../../../compartilhado/IData";
import React from "react";
import styles from "./DadosPessoais.module.scss";


interface DadosPessoaisProps {
  data: Idata
  atualizarCampo: (key: string, value: string) => void
}

const InputField = styled(TextField)({
  gridColumn: "1/3",
  width: "100%",
  margin: "5px 0",
});



const DadosPessoais = ({ data, atualizarCampo }: DadosPessoaisProps) => {
  return (
    <section className={styles.camposCadastro}>
      <InputField label="Nome" InputLabelProps={{ shrink: true }} required value={data.nome || ""} onChange={(e) => atualizarCampo("nome", e.target.value)} className={styles.camposCadastro__nome} ></InputField>
      <InputField label="CPF" InputLabelProps={{ shrink: true }} required value={data.cpf || ""} onChange={(e) => atualizarCampo("cpf", e.target.value)} className={styles.camposCadastro__cpf}></InputField>
      <InputField label="URL Foto de Perfil" InputLabelProps={{ shrink: true }} required value={data.urlFotoPerfil || ""} onChange={(e) => atualizarCampo("urlFotoPerfil", e.target.value)} className={styles.campoCadastro__urlPerfil}></InputField>
      <InputField label="Telefone" InputLabelProps={{ shrink: true }} required value={data.telefone || ""} onChange={(e) => atualizarCampo("telefone", e.target.value)} className={styles.camposCadastro__telefone}></InputField>
      <InputField label="Data de Nascimento" type="date" InputLabelProps={{ shrink: true }} required value={data.dataNasc || ""} onChange={(e) => atualizarCampo("dataNasc", e.target.value)} className={styles.camposCadastro__dtNasc}></InputField>
      <InputField label="Gênero" InputLabelProps={{ shrink: true }} required value={data.genero|| ""} onChange={(e) => atualizarCampo("genero", e.target.value)} className={styles.camposCadastro__genero}></InputField>
      <InputField label="E-mail" InputLabelProps={{ shrink: true }} required value={data.email || ""} onChange={(e) => atualizarCampo("email", e.target.value)} className={styles.camposCadastro__email}></InputField>
      <InputField label="Senha"  type="password" InputLabelProps={{ shrink: true }} required value={data.senha || ""} onChange={(e) => atualizarCampo("senha", e.target.value)} className={styles.camposCadastro__senha}></InputField>
      <InputField label="Confirmar Senha" type="password" InputLabelProps={{ shrink: true }} required value={data.confirmeSenha || ""} onChange={(e) => atualizarCampo("confirmeSenha", e.target.value)} className={styles.camposCadastro__confirmarSenha}></InputField>
    </section>
  );
};
export default DadosPessoais;
