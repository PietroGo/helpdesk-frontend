import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../services/authService";

function ResetPassword(){
    const [searchParams] = useSearchParams()
    // Se a URL for /rest-password?token=abc, aqui token vale "abc"
    const token = searchParams.get('token')

    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')

        try {
            await resetPassword(token, newPassword)
            // Senha trocada: manda para o login para entrar com a senha nova
            navigate('/')
        } catch (err){
            setError(err.message)
        }
     }
        if (!token) {
            return (
                <div className="container">
                    <div className="card">
                        <p className="error">Link inválido: o token não foi encontrado</p>
                        <Link to="/forgot-password">Pedir um novo link</Link>
                    </div>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="card">
                    <h2>Nova senha</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label htmlFor="newPassword">Nova senha:</label>
                            <input id="newPassword" type="password" value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} required />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button type="submit" className="btn">Redefinir senha</button>
                    </form>
                </div>
            </div>
    )
}

export default ResetPassword