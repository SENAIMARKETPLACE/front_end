import { Button } from "@mui/material"
import { useState } from "react"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { IDataEmpresa } from "../../compartilhado/IDataEmpresa"
import DadosEmpresa from "../../components/empresaFormStepper/DadosEmpresa";
import EnderecoEmpresa from "../../components/empresaFormStepper/EnderecoEmpresa";
import Steps from "../../components/empresaFormStepper/Steps";

import styles from "./FormCadastroEmpresa.module.scss";

const formTemplate: IDataEmpresa = {
    nome_fantasia: "",
    razao_social: "",
    cnpj: "",
    telefone: "",
    email: "",
    senha: "",
    confirme_senha: "",
    cep: "",
    logradouro: "",
    numero: "",
    estado: "",
    bairro: "",
    cidade: "",
    complemento: ""
}


const FormCadastroEmpresa = () => {
    const [data, setData] = useState(formTemplate)
    const [idPasso, setIdPasso] = useState(0) 
    const atualizarCampo = (key: string, value: string) => {
        setData((prev) => {
            return { ...prev, [key]: value }
        })
    }

    const formComponents = [
        <DadosEmpresa data={data} atualizarCampo={atualizarCampo}/>, 
        <EnderecoEmpresa data={data} atualizarCampo={atualizarCampo}/>
    ]

    //EVENTOS DE ANTERIOR E PRÓXIMO PASSo
  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (idPasso === formComponents.length -1) {
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



    return (
        <section className="section_form">
            <div className="section__formContainer">
                <Steps passoAtual={idPasso}/>
                <form>
                    {formComponents[idPasso]}
                    <div className={styles.section_FormButton}>
                        <Button variant="contained" color="success" onClick={prevStep}>
                            <MdNavigateBefore />
                            <span>VOLTAR</span>
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            onClick={nextStep}
                        >
                            <span>PRÓXIMO</span>
                            <MdNavigateNext />
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    )

}
export default FormCadastroEmpresa