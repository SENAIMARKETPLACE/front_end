import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

const InputField = styled(TextField)({
  gridColumn: "1/3",
  width: "100%",
  margin: "5px 0",
});

const DadosResidencial = () => {
  return (
    <div>
      <InputField label="CEP" InputLabelProps={{ shrink: true }}></InputField>
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
