import { useState } from 'react'

import { login } from '../services/authService'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

// Função para lidar com o envio do formulário de login
async function handleSubmit(event) {  
    event.preventDefault();

    setError(''); // Limpa o erro antes de tentar fazer login
  
    try {
        const data = await login(email, password); // Chama a função de login do serviço de autenticação
        console.log('Login bem-sucedido:', data); // Exibe o token JWT no console
        // Aqui você pode redirecionar o usuário para outra página ou armazenar o token em algum lugar seguro
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