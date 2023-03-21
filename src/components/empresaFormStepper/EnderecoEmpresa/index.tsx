import { Button, styled, TextField } from "@mui/material";
import axios from "axios";
import { IDataEmpresa } from "../../../compartilhado/IDataEmpresa";
import { ICep } from "../../../compartilhado/ICep";
import { useState } from "react";
import styles from './EnderecoEmpresa.module.scss'

interface EnderecoEmpresaProps {
  data: IDataEmpresa;
  atualizarCampo: (key: string, value: string) => void;
}
const InputField = styled(TextField)({
  width: "100%",
  margin: "5px 0",
});

const EnderecoEmpresa = ({ data, atualizarCampo }: EnderecoEmpresaProps) => {
  const [cepDados, setCEPDados] = useState<ICep>(null);

  const consumirApiViaCEP = (cep: string, dataPreencher: IDataEmpresa) => {
    function preencherDados(cepRecebido: ICep, dataPreencher: IDataEmpresa) {
      if (cepRecebido) {
        (dataPreencher.bairro = cepRecebido.bairro),
          (dataPreencher.cidade = cepRecebido.localidade),
          (dataPreencher.estado = cepRecebido.uf),
          (dataPreencher.logradouro = cepRecebido.logradouro);
        return console.log(cepRecebido);
      }
    }
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => setCEPDados(response.data))
      .catch((erro) => alert("CEP não encontrado!"));

    return preencherDados(cepDados, dataPreencher);
  };

  return (
    <section className={styles.camposCadastros}>
      <InputField
        label="CEP"
        className={styles.camposCadastros__cep}
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
          consumirApiViaCEP(data.cep, data);
        }}
      >
        Preencher Dados
      </Button>
      <InputField
        className={styles.camposCadastros__logradouro}
        label="Logradouro"
        InputLabelProps={{ shrink: true }}
        value={data.logradouro || ""}
        onChange={(e) => atualizarCampo("logradouro", e.target.value)}
      ></InputField>
      <InputField
        className={styles.camposCadastros__complemento}
        label="Complemento"
        InputLabelProps={{ shrink: true }}
        value={data.complemento || ""}
        onChange={(e) => atualizarCampo("complemento", e.target.value)}
      ></InputField>
      <InputField
        className={styles.camposCadastros__numero}
        label="Número"
        InputLabelProps={{ shrink: true }}
        value={data.numero || ""}
        onChange={(e) => atualizarCampo("numero", e.target.value)}
      ></InputField>
      <InputField
        className={styles.camposCadastros__cidade}
        label="Cidade"
        InputLabelProps={{ shrink: true }}
        value={data.cidade || ""}
        onChange={(e) => {
          atualizarCampo("cidade", e.target.value);
        }}
      ></InputField>
      <InputField
        className={styles.camposCadastros__estado}
        label="Estado"
        InputLabelProps={{ shrink: true }}
        value={data.estado || ""}
        onChange={(e) => {
          atualizarCampo("estado", e.target.value);
        }}
      ></InputField>
      <InputField
        className={styles.camposCadastros__bairro}
        label="Bairro"
        InputLabelProps={{ shrink: true }}
        value={data.bairro || ""}
        onChange={(e) => {
          atualizarCampo("bairro", e.target.value);
        }}
      ></InputField>
    </section>
  );
};
export default EnderecoEmpresa;
