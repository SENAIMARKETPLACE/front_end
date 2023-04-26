import { IDetalhesProduto } from "./IDetalhesProduto";

export interface IProdutoPost{
    empresa_id?: string, 
    categoria_id: string, 
    sub_categoria_id: string,
    nome: string, 
    descricao: string, 
    img: string, 
    publico: string, 
    preco: string, 
    detalhes_do_produto?: IDetalhesProduto; 
    quantidade?: string,
}