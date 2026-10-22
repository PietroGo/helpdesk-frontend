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


// Cadastra uma empresa nova junto com o usuário admin dela
// Recebe um objeto com nome, email, password, companyName e cnpj
export async function register(userData) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userData) // o objeto já tem exatamente os campos que o backend espera
    });

    if (!response.ok){
        // Tenta ler a mensagem de erro que o backend mandou, e usa uma genérica se não houver
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erro ao criar conta');
    }
    return await response.json();
}

// Pede ao backend para gerar o token de recuperação para esse email
export async function forgotPassword(email) {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email })
    });

    if (!response.ok) {
        // Usa a mensagem do backend quando existir, e uma genérica se não vier em JSON
        const errorData = await response.json().catch(() => ({}));
        throw new Error (errorData.error || 'Erro ao solicitar recuperação de senha'); 
    }

    return await response.json();
    
}


// Troca a senha usando o token que veio no link
export async function resetPassword(token, newPassword) {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        // O backend espera exatamente os campos "token" e "newPassword"
        body: JSON.stringify({ token, newPassword})
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erro ao redefinir senha');
    }
    
    return await response.json();
}