// useState é um hook do React que permite adicionar estado a componentes funcionais
import { useState } from 'react'

// useNavigate é um hook do React Router que permite navegar programaticamente entre rotas
import { useNavigate, Link } from 'react-router-dom'

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
    // container centraliza e limita a largura, card dá o visual de caixa
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
           {/* .field empilha label e campo */}
          <div className="field">
            <label htmlFor="email">Email:</label>
            {/* id precisa ser igual ao htmlFor do label para associar o label ao input */}
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* className="error" aplica estilo de erro, e só é exibido se houver erro */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="btn">
          Entrar
        </button>
      </form>
      <p className='form-links'>
        Não tem conta? <Link to="/register">Criar conta</Link>
      </p>
    </div>
    </div>
  );
}
export default Login;