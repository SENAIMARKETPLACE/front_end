interface IPedido {
    pedido_id: string;
    usuario: {
      id: string;
      nome: string;
      cpf: string;
    };
    endereco: {
      id: string;
      cep: string;
      logradouro: string;
      numero: string;
      estado: string;
      bairro: string;
      cidade: string;
    };
    metodo_de_pagamento: {
      id: string;
      nome: string;
      descricao: string;
      tempoEmHoras: number;
    };
    produtos: {
      pedido_itens_id: string;
      produto_detalhado_id: string;
      nome: string;
      descricao: string;
      img: string;
      tamanho: string;
      peso: string;
      cor: string;
      quantidade: number;
      valorUnitario: number;
    }[];
    valorTotal: number;
  }