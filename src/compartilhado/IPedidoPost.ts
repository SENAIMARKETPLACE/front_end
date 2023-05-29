export interface IPedidoPost {
    "usuario_id": string;
    "endereco_id": string;
    "pagamento_id": string;
    "produtos_selecionados": IPedidoProduto[]
}