// useState : guarda os valores dos campos do formulário
import { useState } from 'react';

// useNavigate : permite redirecionar o usuário para outra página após a criação do ticket
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../services/ticketService';
import LogoutButton from '../components/LogoutButton';

function NewTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Priority é um campo de seleção, então o valor inicial é definido como 'MEDIA'
  const [priority, setPriority] = useState('MEDIA');
  const [error, setError] = useState('');

  const navigate = useNavigate();

// Função chamada quando o formulário é enviado
async function handleSubmit(event) {
    event.preventDefault();//impede o navegador de recarregar a página ao enviar o formulário
    setError(''); // Limpa qualquer erro anterior

    try {
        await createTicket({ title, description, priority }); // Chama a função para criar o ticket com os dados do formulário
        navigate('/tickets'); // Redireciona o usuário para a lista de tickets após a criação bem-sucedida
    } catch (err) {
        setError(err.message); // Se houver um erro, atualiza o estado de erro para exibir a mensagem
    }
}

return (
    <div>
        <h1>Criar Novo Ticket</h1>
        <LogoutButton />
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required // o navegador impede o envio do formulário se o campo estiver vazio
                />
            </div>
            <div>
                <label>Descrição:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Prioridade:</label>
                {/* Os valores precisam ser exatamente os do enum Priority do backend */}
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="BAIXA">Baixa</option>
                    <option value="MEDIA">Média</option>
                    <option value="ALTA">Alta</option>
                </select>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Criar Ticket</button>
        </form>
    </div>
 )
}

export default NewTicket;