import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartDrawer({
  abierto,
  cerrar,
}) {
  const {
    cart,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce(
    (acc, item) =>
      acc + item.precio * item.cantidad,
    0
  );

  return (
    <>
      {abierto && (
        <div
          onClick={cerrar}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.4)",
            zIndex: 998,
          }}
        />
      )}

      <aside
        style={{
          position: "fixed",
          top: 0,
          right: abierto ? 0 : "-420px",
          width: "420px",
          maxWidth: "100%",
          height: "100vh",
          background: "#ffffff",
          zIndex: 999,
          transition: "all .3s ease",
          padding: "1rem",
          overflowY: "auto",
          boxShadow: "-4px 0 15px rgba(0,0,0,.2)",
        }}
      >
        <button
          onClick={cerrar}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            border: "none",
            background: "transparent",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2
          style={{
            marginBottom: "1rem",
            color: "#0f172a",
          }}
        >
          🛒 Carrito
        </h2>

        <hr />

        {cart.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              marginTop: "2rem",
              color: "#64748b",
            }}
          >
            El carrito está vacío.
          </p>
        ) : (
          <>
            {cart.map((producto) => (
              <div
                key={producto.id}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "0.5rem",
                  }}
                />

                <h4
                  style={{
                    marginBottom: "0.5rem",
                  }}
                >
                  {producto.nombre}
                </h4>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <button
                    onClick={() =>
                      decreaseQuantity(producto.id)
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      fontWeight: "700",
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    {producto.cantidad}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(producto.id)
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                <p
                  style={{
                    fontWeight: "600",
                    color: "#0f766e",
                  }}
                >
                  $
                  {(
                    producto.precio *
                    producto.cantidad
                  ).toLocaleString("es-AR")}
                </p>

                <button
                  onClick={() =>
                    removeFromCart(producto.id)
                  }
                  style={{
                    marginTop: "0.5rem",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 0.8rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </div>
            ))}

            <div
              style={{
                borderTop: "2px solid #e2e8f0",
                paddingTop: "1rem",
                marginTop: "1rem",
              }}
            >
              <h3
                style={{
                  color: "#0f172a",
                }}
              >
                Total: $
                {total.toLocaleString("es-AR")}
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  marginTop: "1rem",
                }}
              >
                <Link
                  to="/carrito"
                  onClick={cerrar}
                  style={{
                    textAlign: "center",
                    background: "#0d9488",
                    color: "white",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                  }}
                >
                  Ver carrito completo
                </Link>

                <button
                  onClick={clearCart}
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}