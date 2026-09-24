import { useState, useEffect } from 'react'
import { getTickets } from '../services/ticketService'

function TicketList() {
     // Estado para armazenar os tickets vindo da API
    // começa como um array vazio, e será preenchido com os dados da API quando o componente for montado

    const [tickets, setTickets] = useState([])

    // Estado para controlar o carregamento dos tickets
    const [loading, setLoading] = useState(true) 
    
    // Estado para armazenar qualquer erro que possa ocorrer durante a requisição
    const [error, setError] = useState(null)

    useEffect(() => {
        // Função assíncrona para buscar os tickets da API
        async function fetchTickets() {
            try {
                const data = await getTickets()
                setTickets(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTickets()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h1>Lista de Tickets</h1>
            <u>
                {tickets.map(ticket => (
                    <li key={ticket.id}>
                        <strong>{ticket.title}</strong> - {ticket.status} - {ticket.priority}
                    </li>
                ))}
            </u>
        </div>
    );
}

export default TicketList;