// useState: guarda dados que mudam ao longo do tempo
// useEffect: roda código quando o componente é exibido
import { useState, useEffect } from "react";
// useParams: pega parâmetros da URL
import { useParams } from "react-router-dom";
import { getTicketById, addComment } from "../services/ticketService";

function TicketDetail() {
  // Pega o parâmetro "id" da URL
  const { id } = useParams();

  // Guarda o ticket buscado da API
  const [ticket, setTicket] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estado para o campo de texto do novo comentário
  const [message, setMessage] = useState('');

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

  if (loading) { return <p>Carregando ticket...</p> }
  if (error) { return <p style={{ color: 'red' }}>{error}</p> }
  if (!ticket) { return <p>Ticket não encontrado.</p> } // proteção extra

  return (
    <div>
      <h1>Detalhes do Ticket</h1>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Descrição:</strong> {ticket.description}</p>
      <p><strong>Prioridade:</strong> {ticket.priority}</p>

      <h2>Comentários</h2>
      <ul>
        {ticket.comments.map((comment) => (
          <li key={comment.id}>{comment.message}</li>
        ))}
      </ul>

      <h3>Adicionar Comentário</h3>
      <form onSubmit={handleAddComment}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite seu comentário..."
        />
        <button type="submit">Adicionar Comentário</button>
      </form>
    </div>
  )
}

export default TicketDetail