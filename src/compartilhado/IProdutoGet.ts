import { ICategory } from "./ICategory"
import { IDetalhesProduto } from "./IDetalhesProduto"

export interface IProdutoGet{
    id?: string,
    nome: string,
    descricao: string, 
    preco: string, 
    img: string
    publico: string, 
    categoria: ICategory, 
    detalhes_dos_produtos: IDetalhesProduto[]
}