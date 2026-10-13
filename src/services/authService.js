// jwtDecode é uma biblioteca que permite decodificar tokens JWT para extrair informações do payload
import { jwtDecode } from 'jwt-decode'


//url base da API do backend, rodando na porta 30000
const API_URL = 'http://localhost:3000'

//função assíncrona para fazer login do usuário na API
//Recebe email e senha como parâmetros, retorna o token JWT se o login for bem-sucedido
export async function login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // avisa o servidor que estamos enviando JSON
        },
        body: JSON.stringify({ email, password }) // transforma o objeto JS em teto JSON para enviar na requisição
    });
    // Se o servidor respondeu com um status de erro (não OK), lança um erro para ser tratado pelo chamador da função
    if (!response.ok) {
        throw new Error('Erro ao fazer login');
    }
    // Se o login foi bem-sucedido, extrai o token JWT da resposta e retorna
    const data = await response.json();
    return data.token; // retorna o objeto inteiro, que contém o campo token, que é o JWT que vamos usar para autenticar as próximas requisições
}

// Retorna o papel do usuário logado ('ADMIN', 'USER', etc.) a partir do token JWT armazenado no localStorage
export function getUserRole() {
    const token = localStorage.getItem('token'); // pega o token do localStorage

    if (!token) return null; // se não houver token, retorna null

    try {
        const payload = jwtDecode(token); // decodifica o payload (userId, role, companyId)
        return payload.role; // retorna o papel do usuário a partir do payload do token
    } catch {
        return null;
    }
}