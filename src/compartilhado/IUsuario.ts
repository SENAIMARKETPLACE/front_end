import { IEndereco } from "./IEndereco";

export interface IUsuario{
    nome: string | string[] ;
    cpf: string | string[] ; 
    dtNascimento: string | string[];  
    senha: string | string[] ;
    telefone:  string | string[] ; 
    email: string | string[] ;

}