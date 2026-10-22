import { useState } from "react"
import { Link } from 'react-router-dom'
import { forgotPassword } from "../services/authService"

function ForgotPassword() {
    const [email, setEmail] = useState ('')
    const [error, setError] = useState('')
    // Mensagem de sucesso: apararece no lugar do formulário depois de enviar
    const [ sent, setSent] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')

        try { 
            await forgotPassword(email)
            setSent(true) // troca o formulário pela mensagem de confirmação
        }catch (err) {
            setError(err.message)
    }
}

return (
    <div className="container">
        <div className="card">
            <h2>Recuperar senha</h2>

            {/* Operador ternário: se já enviou, mostra a confirmação; senão, mostra o formulário */}
            {sent ? ( 
                <p> Se o email existir, enviamos um link para redefinir a senha.</p>
            ) : ( 
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="email">Email:</label>
                        <input id="email" type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="btn">Enviar link</button>
                </form>
            )}

            <p className="form-links">
                <Link to= "/">← Voltar para o login</Link>
            </p>
        </div>
    </div>
    )
}

export default ForgotPassword