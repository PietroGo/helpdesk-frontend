import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate(); 

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/'); // Redireciona para a página de login após o logout

    }

    return <button onClick={handleLogout}>Desconectar</button>;
}

export default LogoutButton;