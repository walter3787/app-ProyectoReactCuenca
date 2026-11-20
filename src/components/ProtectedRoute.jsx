import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}) {
  const {
    user,
    rol,
  } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (rol !== "admin") {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
        }}
      >
        <h2>
          Acceso restringido
        </h2>

        <p>
          Esta sección está
          disponible únicamente
          para administradores.
        </p>
      </div>
    );
  }

  return children;
}