import CadastroEnderecoScreen from "../screens/CadastroEnderecoScreen";
import { useRouter } from "next/router";
import { IUsuario } from "../compartilhado/IUsuario";

const CadastroEndereco = () => {

    const router = useRouter()
    const {
        query : {nome, dataNasc, cpf, email, telefone, senha}
    } = router

    const props = {
        nome, 
        dataNasc,  
        cpf, 
        email, 
        telefone, 
        senha
    }

    const dadosUsuarios: IUsuario = {
        nome: props.nome, 
        cpf: props.cpf, 
        dtNascimento: props.dataNasc,
        telefone: props.telefone, 
        email: props.email, 
        senha: props.senha 
    }

    
    return(
        <CadastroEnderecoScreen dadosUsuarios={dadosUsuarios}/>
    )
}
export default CadastroEndereco;