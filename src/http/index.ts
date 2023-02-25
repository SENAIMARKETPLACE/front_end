//  criar uma nova instância do axios com uma configuração customizada.

import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:5000/'
})

export default http;