export interface IPersonalData{
    usuario_id: string;
    nome: string;
    email: string;
    img: string;
    cpf: string; 
    genero: string; 
    data_nascimento?: string;
    telefone: string;
    grupo_de_interesses: string[]
}