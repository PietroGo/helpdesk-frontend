// useState é um hook do React que permite adicionar estado a componentes funcionais
import { useState } from 'react'

// useNavigate é um hook do React Router que permite navegar programaticamente entre rotas
import { useNavigate } from 'react-router-dom'

// login é uma função que faz a requisição de login para o backend
import { login } from '../services/authService'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

// useNavigate é um hook do React Router que permite navegar programaticamente entre rotas
  const navigate = useNavigate()

// Função para lidar com o envio do formulário de login
async function handleSubmit(event) {  
    event.preventDefault();

    setError(''); // Limpa o erro antes de tentar fazer login
  
    try {
        const token = await login(email, password); // Chama a função de login do serviço de autenticação
        console.log('Login bem-sucedido:', token); // Exibe o token JWT no console
        localStorage.setItem('token', token); // Armazena o token JWT no localStorage
        navigate('/tickets'); // Redireciona para a página de tickets após o login bem-sucedido

    } catch (error) { 
        setError(error.message)
    }
}
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;