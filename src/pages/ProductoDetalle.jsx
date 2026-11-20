import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

import { useCart } from "../context/CartContext";

export default function ProductoDetalle() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const productoRef = doc(db, "productos", id);

        const respuesta = await getDoc(productoRef);

        if (!respuesta.exists()) {
          throw new Error("Producto no encontrado");
        }

        setProducto({
          id: respuesta.id,
          ...respuesta.data(),
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  if (cargando) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>Cargando detalle del producto... ⏳</h2>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>{error || "Producto no encontrado"}</h2>

        <Link to="/productos">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/productos">
        ← Volver al catálogo
      </Link>

      <article
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          maxWidth: "900px",
          margin: "2rem auto",
        }}
      >
        <div style={{ flex: 1 }}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{
              width: "100%",
              maxHeight: "320px",
              objectFit: "contain",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h2>{producto.nombre}</h2>

          <p>{producto.descripcion}</p>

          <p>
            <strong>
              ${producto.precio.toLocaleString("es-AR")}
            </strong>
          </p>

          <p>
            Stock disponible: {producto.stock}
          </p>

          <button
            onClick={() => addToCart(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </article>
    </div>
  );
}