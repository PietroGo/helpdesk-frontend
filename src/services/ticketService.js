//URL base da API backend
const API_URL = 'http://localhost:3000'

// Função para buscar todos os tickets
export async function getTickets() {
  

// Obtém o token JWT do localStorage
  const token = localStorage.getItem('token') 

  console.log('Token JWT:', token) // Exibe o token JWT no console para depuração

// Faz a requisição para a API backend para buscar os tickets, incluindo o token JWT no cabeçalho Authorization
  const response = await fetch(`${API_URL}/tickets`, {
    method: 'GET',
    headers: {
       // Envia o token JWT no cabeçalho Authorization para autenticação
       // sem isso, o middleware de autenticação no backend não permitirá o acesso aos tickets
      'Authorization': `Bearer ${token}`
    }
  });

// Se a resposta não for bem-sucedida, lança um erro
  if (!response.ok) {
    throw new Error('Erro ao buscar tickets');
  }

// Converte a resposta para JSON e retorna os dados dos tickets
const data = await response.json();

  return data
}