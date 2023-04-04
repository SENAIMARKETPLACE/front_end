//  criar uma nova instância do axios com uma configuração customizada.

import axios from "axios";

export const httpEmpresa = axios.create({
    baseURL: 'http://localhost:8000/'
})

export const httpUsuario = axios.create({
    baseURL: 'http://localhost:8080/'
})

export const httpProduto = axios.create({
    baseURL: 'http://localhost:8100/'
})
