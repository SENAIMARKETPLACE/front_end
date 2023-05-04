import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React, { use, useState } from "react";
import styles from "./FormCadastroUsuario.module.scss";
import { IUsuario } from "../../compartilhado/IUsuario";
import Router, { useRouter } from "next/router";
import { httpApiMockada, httpUsuario } from "../../http";
import axios, { AxiosResponse } from "axios";
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdDone,
  MdCheckCircle,
  MdError,
} from "react-icons/md";
import Agradecimento from "../../components/userFormStepper/ListaInteresses";
import DadosPessoais from "../../components/userFormStepper/DadosPessoais/main";
import DadosResidencial from "../../components/userFormStepper/DadosResidencial";
import Steps from "../../components/userFormStepper/Steps";
import { IDataUser } from "../../compartilhado/IDataUser";
import ListaInteresses from "../../components/userFormStepper/ListaInteresses";
import { IEndereco } from "../../compartilhado/IEndereco";
import ModalInformacaoCadastro from "../../components/Modais/modalInformacaoCadastro";
import { IconType } from "react-icons/lib";

const formTemplate: IDataUser = {
  nome: "",
  cpf: "",
  telefone: "",
  urlFotoPerfil: "",
  dataNasc: "",
  genero: "",
  email: "",
  senha: "",
  confirmeSenha: "",
  cep: "",
  logradouro: "",
  complemento: "",
  numero: "",
  cidade: "",
  estado: "",
  bairro: "",
  id: "",
};

const FormCadastroUsuario = () => {
  const [data, setData] = useState(formTemplate);
  const [isDisabled, setIsDisable] = useState<boolean>(true);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [mensagemModal, setMensagemModal] = useState<string>("");
  const [descricaoModal, setDescricaoModal] = useState<string>("");
  const [legendaBotao, setLegendaBotao] = useState<string>("");
  const [corModal, setCorModal] = useState<string>("");
  const [iconModal, setIconModal] = useState<IconType>();

  const atualizarPeloFilho = (dadoFilho: boolean) => {
    setIsDisable(dadoFilho);
  };

  const atualizarCampo = (key: string, value: string) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const capturarIdUser = (
    respApi: AxiosResponse,
    dataRecebida: IDataUser,
    variavelEndereco: IEndereco
  ): void => {
    dataRecebida.id = respApi.data.id;
    variavelEndereco.usuario_id = dataRecebida.id;
  };

  const formComponents = [
    <DadosPessoais
      onData={atualizarPeloFilho}
      data={data}
      atualizarCampo={atualizarCampo}
    />,
    <ListaInteresses data={data} />,
    <DadosResidencial data={data} atualizarCampo={atualizarCampo} />,
  ];
  const [idPasso, setIdPasso] = useState(0);

  // TRATAR DADOS RECEBIDOS
  const converterParaDataLocal = (dataInformada: string): string => {
    let data = new Date(dataInformada);

    // data local
    return data.toLocaleDateString();
  };

  const removeSpecialCaracteres = (campoInformado: string) => {
    return campoInformado.replace(/[,!()-.]/g, "").replaceAll(" ", "");
  };

  const salvarUsuarioEEndereco = (
    e: React.MouseEvent<HTMLButtonElement>,
    dados: IDataUser
  ) => {
    e.preventDefault();
    console.log(dados);
    const user: IUsuario = {
      nome: dados.nome,
      cpf: removeSpecialCaracteres(dados.cpf),
      dt_nascimento: converterParaDataLocal(dados.dataNasc),
      senha: dados.senha,
      telefone: removeSpecialCaracteres(dados.telefone),
      genero: dados.genero,
      email: dados.email,
      grupos_interesses: dados.listaInteresses,
      img: dados.urlFotoPerfil,
      endereco: {
        cep: removeSpecialCaracteres(dados.cep),
        logradouro: dados.logradouro,
        numero: dados.numero,
        bairro: dados.bairro,
        cidade: dados.cidade,
        estado: dados.estado,
        complemento: dados.complemento,
      },
    };
    // httpUsuario.post('/api/users', user)
    //   // MULTIPLAS REQUISIÇÕES -> POS
    //   .then((resp) => alert(`${user.nome} criado com sucesso`))
    //   .catch((err) => alert("Deu Ruim"))
    httpUsuario
      .post("/api/users", user)
      // MULTIPLAS REQUISIÇÕES -> POS
      .then((resp) => {
        {
          console.log(user);
          setOpenModalRegister(true);
          setMensagemModal("CADASTRO REALIZADO COM SUCESSO!");
          setDescricaoModal(
            "Agora você está pronto para aproveitar nossos benefícios!"
          );
          setCorModal("#06C270");
          setLegendaBotao("VOLTAR PARA A HOME E REALIZAR O LOGIN");
          setIconModal(MdCheckCircle);
          console.log(openModalRegister);
        }
      })
      .catch((err) => {
        setOpenModalRegister(true);
        setMensagemModal("FALHA A REALIZAR O CADASTRO!");
        setCorModal("#CC3A3A");
        setIconModal(MdError);
        setLegendaBotao("REALIZAR O CADASTRO NOVAMENTE");
      });
  };

  //EVENTOS DE ANTERIOR E PRÓXIMO PASSo
  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (idPasso === formComponents.length - 1) {
      setIdPasso(2);
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

  const exibirDadosCapturados = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    return console.log(data);
  };

  return (
    <>
      <ModalInformacaoCadastro
        isOpen={openModalRegister}
        mensagemModalPrincipalProps={mensagemModal}
        descricaoModalProps={descricaoModal}
        colorProps={corModal}
        iconeProps={iconModal}
        legendaBotaoProps={legendaBotao}
      />
      <section className={styles.section__Form}>
        <div className={styles.section__FormContainer}>
          {<Steps passoAtual={idPasso} />}
          <form>
            {/* FORMULÁRIO SERÁ MODIFICADO DE FORMA DINÂMICA. */}
            <div className="section__InputsContainer">
              {formComponents[idPasso]}
            </div>
            <div className={styles.section__FormButtons}>
              {idPasso === 0 ? (
                ""
              ) : (
                <Button variant="contained" color="success" onClick={prevStep}>
                  <MdNavigateBefore />
                  <span>VOLTAR</span>
                </Button>
              )}

              {idPasso === 2 ? (
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  onClick={(e) => {
                    salvarUsuarioEEndereco(e, data);
                  }}
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
                  disabled={isDisabled}
                >
                  <span>PRÓXIMO</span>
                  <MdNavigateNext />
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
export default FormCadastroUsuario;

