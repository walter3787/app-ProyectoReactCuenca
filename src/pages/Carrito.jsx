import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Carrito() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  if (cart.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "3rem 2rem",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          textAlign: "center",
          maxWidth: "600px",
          margin: "2rem auto",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
        }}
      >
        <h2>🛒 Tu Carrito de Compras</h2>

        <p>
          No hay productos en el carrito.
        </p>

        <Link to="/productos">
          Explorar Productos
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "2rem auto",
        padding: "1rem",
      }}
    >
      <h1>🛒 Carrito</h1>

      {cart.map((producto) => (
        <div
          key={producto.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3>{producto.nombre}</h3>

          <p>
            Precio: ${producto.precio.toLocaleString("es-AR")}
          </p>

          <p>
            Cantidad: {producto.cantidad}
          </p>

          <button
            onClick={() =>
              decreaseQuantity(producto.id)
            }
          >
            -
          </button>

          <button
            onClick={() =>
              increaseQuantity(producto.id)
            }
            style={{ marginLeft: "0.5rem" }}
          >
            +
          </button>

          <button
            onClick={() =>
              removeFromCart(producto.id)
            }
            style={{ marginLeft: "0.5rem" }}
          >
            Eliminar
          </button>
        </div>
      ))}

      <h2>
        Total: ${total.toLocaleString("es-AR")}
      </h2>

      <button onClick={clearCart}>
        Vaciar carrito
      </button>
    </div>
  );
}