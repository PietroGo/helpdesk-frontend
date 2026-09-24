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