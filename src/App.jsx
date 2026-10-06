import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import TicketList from "./pages/TicketList"
import TicketDetail from "./pages/TicketDetail"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/tickets" element={<TicketList />} />

      {/* :id é um parâmetro de rota que será usado para buscar o ticket específico, capturado pelo useParams */}
      <Route path="/tickets/:id" element={<TicketDetail />} />
    </Routes>
  )  
}

export default App