import { IEndereco } from "./IEndereco";

export interface IResponseLoginUser{
    id: string, 
    data_requisicao: string, 
    nome: string,
    cpf: string, 
    email: string,
    data_nascimento: string,
    telefone: string
    genero: string,
    img: string, 
    gruposDeInteresse: string[],
    enderecos: IEndereco[]
}
