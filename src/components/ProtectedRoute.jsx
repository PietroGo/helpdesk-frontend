

import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute () {

// Lê o token salvo no login
const token = localStorage.getItem('token');

if (!token) {
  // Se não houver token, redireciona para a página de login
  // "replace" substitui a entrada atual no histórico, evitando que o usuário volte para a rota protegida usando o botão de voltar do navegador
  return <Navigate to="/" replace />;
}

return <Outlet />; // Renderiza os componentes filhos (rotas protegidas) se houver token
}

export default ProtectedRoute;