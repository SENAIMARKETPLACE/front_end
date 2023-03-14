export interface IEndereco {
    id? : string;
    usuario_id?: string; 
    empresa_id?: string;
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento?: string;
}