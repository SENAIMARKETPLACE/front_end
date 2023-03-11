import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { Idata } from "../../../compartilhado/IData";
import { use, useState } from "react";
import axios from "axios";
import { ICep } from "../../../compartilhado/ICep";
import styles from "./DadosResidencial.module.scss";

interface DadosResidencialProps {
  data: Idata;
  atualizarCampo: (key: string, value: string) => void;
}

const InputField = styled(TextField)({
  gridColumn: "1/3",
  width: "100%",
  margin: "5px 0",
});

const DadosResidencial = ({ data, atualizarCampo }: DadosResidencialProps) => {
  const [cepDados, setCEPDados] = useState<ICep>(null);

  function preencherDados(cepRecebido: ICep, dataPreencher: Idata) {
    if (cepRecebido) {
      (dataPreencher.bairro = cepRecebido.bairro),
      (dataPreencher.cidade = cepRecebido.localidade),
      (dataPreencher.estado = cepRecebido.uf),
      (dataPreencher.logradouro = cepRecebido.logradouro);
      return console.log(cepRecebido);
    }
  }

  const consumirApiViaCEP = (cep: string, dataPreencher: Idata) => {
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => setCEPDados(response.data))
      .catch((erro) => alert("CEP não encontrado!"));

    return preencherDados(cepDados, dataPreencher);
  };

  return (
    <div className={styles.camposCadastros}>
      <InputField
        label="CEP"
        InputLabelProps={{ shrink: true }}
        required
        value={data.cep || ""}
        onChange={(e) => {
          atualizarCampo("cep", e.target.value);
        }}
        className={styles.camposCadastros__cep}
      ></InputField>
      <Button
        variant="contained"
        onClick={(e) => {
          consumirApiViaCEP(data.cep, data);
        }}
      >
        Preencher Dados
      </Button>
      <InputField
        label="Logradouro"
        InputLabelProps={{ shrink: true }}
        value={data.logradouro || ""}
        className={styles.camposCadastros__logradouro}
      ></InputField>
      <InputField
        label="Complemento"
        InputLabelProps={{ shrink: true }}
        className={styles.camposCadastros__complemento}
      ></InputField>
      <InputField
        label="Número"
        InputLabelProps={{ shrink: true }}
        className={styles.camposCadastros__numero}
      ></InputField>
      <InputField
        label="Cidade"
        InputLabelProps={{ shrink: true }}
        value={data.cidade || ""}
        onChange={(e) => {
          atualizarCampo("cidade", e.target.value);
        }}
        className={styles.camposCadastros__cidade}
      ></InputField>
      <InputField
        label="Estado"
        InputLabelProps={{ shrink: true }}
        value={data.estado || ""}
        onChange={(e) => {
          atualizarCampo("estado", e.target.value);
        }}
        className={styles.camposCadastros__estado}
      ></InputField>
      <InputField
        label="Bairro"
        InputLabelProps={{ shrink: true }}
        value={data.bairro || ""}
        onChange={(e) => {
          atualizarCampo("bairro", e.target.value);
        }}
        className={styles.camposCadastros__bairro}
      ></InputField>
    </div>
  );
};
export default DadosResidencial;
