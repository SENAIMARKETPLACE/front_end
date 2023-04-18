import { IEndereco } from "./IEndereco";

export interface IUsuario{
    id?: string | string[];
    nome: string | string[] ;
    cpf: string | string[] ; 
    dt_nascimento: string | string[];  
    senha: string | string[] ;
    telefone:  string | string[];
    genero: string | string[];  
    email: string | string[] ;
    grupos_interesses: string | string[];
    img: string | string[],
    endereco : IEndereco; 
}