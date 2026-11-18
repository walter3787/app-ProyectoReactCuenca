import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Gestion() {
  const { user, logout } = useAuth();

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosRef = collection(db, "productos");

        const respuesta = await getDocs(productosRef);

        const productosFirestore = respuesta.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(productosFirestore);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div>
      <h1>Panel de Gestión</h1>

      <p>Usuario: {user?.email}</p>

      <button onClick={logout}>
        Cerrar sesión
      </button>

      <hr />

      <h2>Productos</h2>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              {producto.nombre} - ${producto.precio}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}