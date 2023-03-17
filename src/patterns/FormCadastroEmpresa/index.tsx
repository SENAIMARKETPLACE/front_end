import { Button } from "@mui/material";
import { useState } from "react";
import { MdDone, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { IDataEmpresa } from "../../compartilhado/IDataEmpresa";
import { IEmpresa } from "../../compartilhado/IEmpresa";
import { IEndereco } from "../../compartilhado/IEndereco";
import DadosEmpresa from "../../components/empresaFormStepper/DadosEmpresa";
import EnderecoEmpresa from "../../components/empresaFormStepper/EnderecoEmpresa";
import Steps from "../../components/empresaFormStepper/Steps";
import http from "../../http";

import styles from "./FormCadastroEmpresa.module.scss";

const formTemplate: IDataEmpresa = {
  nome_proprietario: "",
  nome_fantasia: "",
  razao_social: "",
  cnpj: "",
  telefone: "",
  email: "",
  url_logo: "",
  senha: "",
  confirme_senha: "",
  cep: "",
  logradouro: "",
  numero: "",
  estado: "",
  bairro: "",
  cidade: "",
  complemento: "",
};

const FormCadastroEmpresa = () => {
  const [data, setData] = useState(formTemplate);
  const [idPasso, setIdPasso] = useState(0);
  const atualizarCampo = (key: string, value: string) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const formComponents = [
    <DadosEmpresa data={data} atualizarCampo={atualizarCampo} />,
    <EnderecoEmpresa data={data} atualizarCampo={atualizarCampo} />,
  ];

  //EVENTOS DE ANTERIOR E PRÓXIMO PASSo
  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (idPasso === formComponents.length - 1) {
      setIdPasso(1);
    } else {
      const passo = idPasso + 1;
      return setIdPasso(passo);
    }
  };

  const prevStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (idPasso === 0) {
      setIdPasso(0);
    } else {
      const passo = idPasso - 1;
      return setIdPasso(passo);
    }
  };

  
  const exibirDadosCapturados = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    return console.log(data)
  }

  const salvarEmpresa = (e: React.MouseEvent<HTMLButtonElement>, dados: IDataEmpresa) => {
    e.preventDefault()
    const empresa: IEmpresa = {
      nome_proprietario: dados.nome_proprietario, 
      nome_fantasia: dados.nome_fantasia, 
      razao_social: dados.razao_social, 
      cnpj: dados.cnpj, 
      telefone: dados.telefone, 
      email: dados.email, 
      url_logo: dados.url_logo, 
      senha: dados.senha
    }
    const endereco: IEndereco = {
      cep: dados.cep, 
      logradouro: dados.logradouro, 
      numero: dados.numero, 
      bairro: dados.bairro, 
      cidade: dados.cidade, 
      estado: dados.estado, 
      complemento: dados.complemento
    }
    http.post('empresas', empresa)
    .then((resp) => http.post('enderecos', endereco))
    .then((respo) => alert(`${empresa.nome_fantasia} cadastrada com sucesso!`))
    .catch((error) => alert("Deu Ruim"))
  }
  
  return (
    <section className="section__form">
      <div className={styles.section__FormContainer}>
        <Steps passoAtual={idPasso} />
        <form>
          {formComponents[idPasso]}
          <div className={styles.section__FormButton}>
            {idPasso === 0 ? (
              ""
            ) : (
              <Button variant="contained" color="success" onClick={prevStep}>
                <MdNavigateBefore />
                <span>VOLTAR</span>
              </Button>
            )}
            {idPasso == 1 ? (
              <Button
                variant="contained"
                color="success"
                type="submit"
                 onClick={(e) => salvarEmpresa(e, data)}
              >
                <span>CADASTRAR</span>
                <MdDone />
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                type="submit"
                onClick={nextStep}
              >
                <span>PRÓXIMO</span>
                <MdNavigateNext />
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
export default FormCadastroEmpresa;