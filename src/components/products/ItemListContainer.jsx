import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase/config";
import { ItemList } from "./ItemList";

export function ItemListContainer({ saludo }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");

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
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  if (cargando) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>Cargando catálogo... ⏳</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>Error al obtener productos</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section>
      {saludo && (
        <h2
          style={{
            color: "#0f172a",
            marginBottom: "1rem",
            fontSize: "1.75rem",
          }}
        >
          {saludo}
        </h2>
      )}

      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          padding: "0.75rem",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <ItemList productos={productosFiltrados} />
    </section>
  );
}