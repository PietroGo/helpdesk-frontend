// useState: guarda dados que mudam ao longo do tempo
// useEffect: roda código quando o componente é exibido
import { useState, useEffect } from "react";
// useParams: pega parâmetros da URL
import { useParams, Link } from "react-router-dom";
import { getTicketById, addComment, updateTicketStatus } from "../services/ticketService";
import LogoutButton from "../components/LogoutButton";
import { getUserRole } from "../services/authService";
import { statusLabels, priorityLabels } from "../utils/labels";

function TicketDetail() {
  // Pega o parâmetro "id" da URL
  const { id } = useParams();

  // Guarda o ticket buscado da API
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estado para o campo de texto do novo comentário
  const [message, setMessage] = useState('');

  const [statusError, setStatusError] = useState(''); // Estado para erros ao atualizar status
  const isAdmin = getUserRole() === 'ADMIN'; // Verifica se o usuário logado é um administrador

  // Busca o ticket da API quando o componente é exibido
  useEffect(() => {
    async function fetchTicket() {
      try {
        const data = await getTicketById(id);
        setTicket(data);
      } catch (err) {
        setError(err.message || 'Erro ao buscar ticket.');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
    // O array de dependências [id] faz com que o useEffect seja executado novamente se o id mudar
  }, [id])

  async function handleAddComment(event) {
    event.preventDefault();

    try {
      const newComment = await addComment(id, message);

      // Atualiza o estado do ticket com o novo comentário
      // Isso evita ter que buscar o ticket novamente da API, melhorando a performance
      setTicket(prevTicket => ({
        ...prevTicket, // Mantém os dados do ticket anterior
        comments: [...prevTicket.comments, newComment] // Adiciona o novo comentário ao array de comentários
      }));

      setMessage(''); // Limpa o campo de texto após adicionar o comentário
    } catch (err) {
      setError(err.message || 'Erro ao adicionar comentário.');
    }
  }

  async function handleStatusChange(event) {
    const newStatus = event.target.value;
    setStatusError(''); // Limpa qualquer erro anterior
    try {
      //corrigir
      const updated = await updateTicketStatus(id, newStatus);
      // Atualiza o estado do ticket com o novo status
      // A API não retorna o ticket atualizado, então atualizamos manualmente o estado
      setTicket(prevTicket => ({ ...prevTicket, status: updated.status }));
    } catch (err) {
      setStatusError(err.message || 'Erro ao atualizar status do ticket.');
    }
  }

  if (loading) { return <p>Carregando ticket...</p> }
  if (error) { return <p style={{ color: 'red' }}>{error}</p> }
  if (!ticket) { return <p>Ticket não encontrado.</p> } // proteção extra

  return (
    <div className="container">
    <div className="page-header">
      <h1>Detalhes do Ticket</h1>
      <div className="actions">
        <Link className="btn btn-secondary" to="/tickets"> ←voltar</Link>
        <LogoutButton />
      </div>
    </div>    
    
    <div className="card">
      <h2>{ticket.title}</h2>
      <p>
        <span className="badge">{statusLabels[ticket.status]}</span>{' '}
        <span className="badge">{priorityLabels[ticket.priority]}</span>
      </p>

      <p>{ticket.description}</p>

      {isAdmin && (
        <div className="field">
          <label htmlFor="Alterar Status" >Alterar status:</label>
          {/* value={ticket.status}: o seletor sempre mostra o status atual do ticket
              onChange: dispara a função handleStatusChange quando o usuário muda o valor do seletor */}

          <select id="Alterar status" value={ticket.status} onChange={handleStatusChange}>
            {/* Os valores do seletor são os mesmos que a API espera ('ABERTO', 'EM_ANDAMENTO', 'FECHADO') */}
            <option value="ABERTO">Aberto</option>
            <option value="EM_ANDAMENTO">Em Andamento</option>
            <option value="RESOLVIDO">Resolvido</option>
            <option value="FECHADO">Fechado</option>
          </select>
          {statusError && <p className="error">{statusError}</p>}
        </div>
      )}
      </div>
      <div className="card section">
      <h2>Comentários</h2>
      {ticket.comments.length === 0 && <p>Nenhum comentário ainda.</p>}
      
      <ul className="comment-list">
        {ticket.comments.map((comment) => (
          <li className="comment" key={comment.id}>{comment.message}</li>
        ))}
      </ul>

      <form className="section" onSubmit={handleAddComment}>
        <div className="field">
          <label htmlFor="comentario">Novo comentário:</label>
        <textarea
          id="comentario"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite seu comentário..."
        />
      </div>
        <button type="submit" className="btn">Adicionar Comentário</button>
      </form>
    </div>
  </div>
  )
}

export default TicketDetail