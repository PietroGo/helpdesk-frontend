import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import TicketList from "./pages/TicketList"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/tickets" element={<TicketList />} />
    </Routes>
  )  
}

export default App