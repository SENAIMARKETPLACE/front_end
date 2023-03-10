import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { Idata } from "../../compartilhado/IData";
import { use, useState } from "react";
import axios from "axios";
import { ICep } from "../../compartilhado/ICep";

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

  function preencherDados(cepRecebido: ICep, data: Idata) {
    {
      (data.bairro = cepRecebido.bairro),
      (data.cidade = cepRecebido.localidade),
      (data.estado = cepRecebido.uf),
      (data.logradouro = cepRecebido.logradouro);
    }

    return console.log(cepRecebido);
  }

  const consumirApiViaCEP = (cep: string) => {
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => setCEPDados(response.data))
      .catch((erro) => alert("CEP não encontrado!"));

    return preencherDados(cepDados, data);
  };

  return (
    <div>
      <InputField
        label="CEP"
        InputLabelProps={{ shrink: true }}
        required
        value={data.cep || ""}
        onChange={(e) => {
          atualizarCampo("cep", e.target.value);
        }}
      ></InputField>
      <Button
        variant="contained"
        onClick={(e) => {
          consumirApiViaCEP(data.cep);
        }}
      >
        Preencher Dados
      </Button>
      <InputField
        label="Logradouro"
        InputLabelProps={{ shrink: true }}
        value={data.logradouro || ""}
      ></InputField>
      <InputField
        label="Complemento"
        InputLabelProps={{ shrink: true }}
      ></InputField>
      <InputField
        label="Número"
        InputLabelProps={{ shrink: true }}
      ></InputField>
      <InputField
        label="Cidade"
        InputLabelProps={{ shrink: true }}
        value={data.cidade || ""}
        onChange={(e) => {
          atualizarCampo("cidade", e.target.value);
        }}
      ></InputField>
      <InputField
        label="Estado"
        InputLabelProps={{ shrink: true }}
        value={data.estado || ""}
        onChange={(e) => {
          atualizarCampo("estado", e.target.value);
        }}
      ></InputField>
      <InputField
        label="Bairro"
        InputLabelProps={{ shrink: true }}
        value={data.bairro || ""}
        onChange={(e) => {
          atualizarCampo("bairro", e.target.value);
        }}
      ></InputField>
    </div>
  );
};
export default DadosResidencial;
