import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { register } from "../services/authService";


function Register() {
    // Um estado para cada campo do formulário
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault() // impede o navegador de recarregar a página
        setError('')           // limpa erro de tentativa anterior

        try {
            // envia tudo de uma vez, com os nomes de campo que o backend espera
            await register({ name, email, password, companyName, cnpj })
            // Conta criada: leva para o login, onde a pessoa entra com os dados que acabou de cadastrar
            navigate('/')
        } catch (err){
            setError(err.message)
        }
    }



return (
    <div className="container">
        <div className="card">
            <h2>Criar conta</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="name">Seu nome:</label>
                    <input id ="name" type="text" value={name}
                      onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="field">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" value={email}
                       onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="field">
                    <label htmlFor="password">Senha:</label>
                    <input id="password" type="password" value={password}
                       onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="field">
                    <label htmlFor="companyName">Nome da empresa:</label>
                    <input id="companyName" type="text" value={companyName}
                       onChange={(e) => setCompanyName(e.target.value)} required />
                </div>
                <div className="field">
                    <label htmlFor="cnpj">CNPJ:</label>
                    <input id="cnpj" type="text" value={cnpj}
                       onChange={(e) => setCnpj(e.target.value)} required />
                </div>
                
                {error && <p className="error">{error}</p>}
                <button type="submit"  className="bnt">Criar conta</button>
            </form>

            {/* Saida para quem já tem conta*/}
            <p className="form-links">
                já tem conta? <Link to="/">Entrar</Link>
            </p>
        </div>
    </div> 
    )
}

export default Register