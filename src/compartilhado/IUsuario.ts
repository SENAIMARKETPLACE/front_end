import { IEndereco } from "./IEndereco";

export interface IUsuario{
    nome: string;
    cpf: string; 
    dtNascimento: Date; 
    telefone:  string; 
    email: string;
    senha: string;
    endereco: IEndereco;
}