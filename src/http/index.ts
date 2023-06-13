//  criar uma nova instância do axios com uma configuração customizada.

import axios from "axios";

export const httpEmpresa = axios.create({
    baseURL: 'http://localhost:8000/'
})

export const httpUsuario = axios.create({
    baseURL: 'http://localhost:8200/'
})

export const httpProduto = axios.create({
    baseURL: 'http://localhost:8100/'
})

export const httpCategoria = axios.create({
    baseURL: 'http://localhost:8100/'
})

export const httpPedido = axios.create({
    baseURL: 'http://localhost:8300'
})

export const httpApiMockada = axios.create({
    baseURL: 'http://localhost:5000/'
})


