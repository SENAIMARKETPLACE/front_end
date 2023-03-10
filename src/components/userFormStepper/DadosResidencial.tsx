import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { Idata } from "../../compartilhado/IData";
import { useState } from "react";
import axios from "axios";


interface DadosResidencialProps{
  data: Idata, 
  atualizarCampo: (key: string, value: string) => void
}

const InputField = styled(TextField)({
  gridColumn: "1/3",
  width: "100%",
  margin: "5px 0",
});



const DadosResidencial = ({data, atualizarCampo}: DadosResidencialProps) => {
  const [cep, useCep] = useState("")

  


  axios({
    method: 'get', 
    url: `http://viacep.com.br/ws/${cep}/json/`
  })


  return (
    <div>
      <InputField label="CEP" InputLabelProps={{ shrink: true }} required value={data.cep || ""} onChange={(e) => atualizarCampo("cep", e.target.value)} ></InputField>
      <InputField label="Logradouro" InputLabelProps={{ shrink: true }}></InputField>
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
      ></InputField>
      <InputField
        label="Estado"
        InputLabelProps={{ shrink: true }}
      ></InputField>
      <InputField
        label="Bairro"
        InputLabelProps={{ shrink: true }}
      ></InputField>
    </div>
  );
};
export default DadosResidencial;
