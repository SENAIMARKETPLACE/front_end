import { IEndereco } from "./IEndereco";

export interface IUsuario{
    nome: string | string[] ;
    cpf: string | string[] ; 
    dt_nascimento: string | string[];  
    senha: string | string[] ;
    telefone:  string | string[] ; 
    email: string | string[] ;

}