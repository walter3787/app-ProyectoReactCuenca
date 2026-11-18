import { useAuth } from "../context/AuthContext";

export default function Gestion() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Panel de Gestión</h1>

      <p>{user?.email}</p>

      <button onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}