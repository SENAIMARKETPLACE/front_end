import { TextField } from "@mui/material";
import { styled } from "@mui/styles";
import { IDataEmpresa } from "../../../compartilhado/IDataEmpresa";
import styles from './DadosEmpresa.module.scss'
interface DadosEmpresaProps {
  data: IDataEmpresa;
  atualizarCampo: (key: string, value: string) => void;
}
const InputField = styled(TextField)({
  width: "100%",
  margin: "5px 0",
});

const DadosEmpresa = ({ data, atualizarCampo }: DadosEmpresaProps) => {
  return (
    <section className={styles.camposCadastros}>
      <InputField
        className={styles.camposCadastros__NomeProprietario}
        label="Nome Proprietário"
        InputLabelProps={{ shrink: true }}
        required
        value={data.nome_proprietario || ""}
        onChange={(e) => atualizarCampo("nome_proprietario", e.target.value)}
      ></InputField>
      <div className={styles.camposCadastros__Cnpj}>
        <InputField
          label="CNPJ"
          InputLabelProps={{ shrink: true }}
          required
          value={data.cnpj || ""}
          onChange={(e) => atualizarCampo("cnpj", e.target.value)}
        ></InputField>
        <p>
          • Se você não tem uma conta empresa, pode abrir um CNPJ MEI no{" "}
          <a
            target="_blank"
            href="https://portaldoempreendedor.me/produto/registro-cnpj-mei"
          >
            Portal do Empreendedor
          </a>
          , de forma rápida e simples!
        </p>
      </div>
      <InputField
        label="Razão Social"
        InputLabelProps={{ shrink: true }}
        required
        value={data.razao_social || ""}
        onChange={(e) => atualizarCampo("razao_social", e.target.value)}
        className={styles.camposCadastros__RazaoSocial}
      ></InputField>
      <InputField
        label="Nome Fantasia"
        InputLabelProps={{ shrink: true }}
        required
        value={data.nome_fantasia || ""}
        onChange={(e) => atualizarCampo("nome_fantasia", e.target.value)}
        className={styles.camposCadastros__NomeFantasia}
      ></InputField>
      <InputField
        label="Telefone"
        InputLabelProps={{ shrink: true }}
        value={data.telefone || ""}
        onChange={(e) => atualizarCampo("telefone", e.target.value)}
        required
      ></InputField>
      <InputField
        label="E-mail"
        InputLabelProps={{ shrink: true }}
        value={data.email || ""}
        onChange={(e) => atualizarCampo("email", e.target.value)}
        required
      ></InputField>
      <InputField
        label="URL LOGO MARCA"
        InputLabelProps={{ shrink: true }}
        required
        value={data.url_logo || ""}
        onChange={(e) => atualizarCampo("url_logo", e.target.value)}
      ></InputField>
      <InputField
        label="Senha"
        InputLabelProps={{ shrink: true }}
        required
        type="password"
        value={data.senha || ""}
        onChange={(e) => atualizarCampo("senha", e.target.value)}
      ></InputField>
      <InputField
        label="Confirmação de Senha"
        InputLabelProps={{ shrink: true }}
        required
        type="password"
        value={data.confirme_senha || ""}
        onChange={(e) => atualizarCampo("confirme_senha", e.target.value)}
        
      ></InputField>
    </section>
  );
};
export default DadosEmpresa;
