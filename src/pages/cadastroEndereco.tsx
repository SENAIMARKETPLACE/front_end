import CadastroEnderecoScreen from "../screens/CadastroEnderecoScreen";
import { useRouter } from "next/router";

const CadastroEndereco = () => {

    const router = useRouter()
    const {
        query : {nome, dataNasc, cpf, email, telefone, senha}
    } = router

    const usuario = {
        nome, 
        dataNasc,  
        cpf, 
        email, 
        telefone, 
        senha
    }

    console.log(usuario)
    return(
        <CadastroEnderecoScreen/>
    )
}
export default CadastroEndereco;