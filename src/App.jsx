import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import TicketList from "./pages/TicketList"
import TicketDetail from "./pages/TicketDetail"
import NewTicket from "./pages/NewTicket"
import ProtectedRoute from "./components/ProtectedRoute"
import Register from "./pages/Register"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/tickets/new" element={<NewTicket />} />
      </Route>
      {/* :id é um parâmetro de rota que será usado para buscar o ticket específico, capturado pelo useParams */}
      <Route path="/tickets/:id" element={<TicketDetail />} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  )  
}

export default App