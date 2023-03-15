import { Button } from "@mui/material"
import { useState } from "react"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { IDataEmpresa } from "../../compartilhado/IDataEmpresa"

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
    const atualizarCampo = (key: string, value: string) => {
        setData((prev) => {
            return { ...prev, [key]: value }
        })
    }
    return (
        <section>
            <form>
                <div className={styles.section_FormButton}>
                    <Button variant="contained" color="success">
                        <MdNavigateBefore />
                        <span>VOLTAR</span>
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        type="submit"

                    >
                        <span>PRÓXIMO</span>
                        <MdNavigateNext />
                    </Button>
                </div>
            </form>
        </section>
    )

}
export default FormCadastroEmpresa