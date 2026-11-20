import React from "react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import styles from "./Nav.module.css";

export default function Nav({ abrirCarrito }) {
  const { cart } = useCart();

  const {
    user,
    rol,
    logout,
  } = useAuth();

  const cantidadItems = cart.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <Link
            to="/"
            className={styles.navLink}
          >
            Inicio
          </Link>
        </li>

        <li>
          <Link
            to="/productos"
            className={styles.navLink}
          >
            Productos
          </Link>
        </li>

        <li>
          <button
            onClick={abrirCarrito}
            className={styles.cartLink}
          >
            🛒 Carrito ({cantidadItems})
          </button>
        </li>

        {rol === "admin" && (
          <li>
            <Link
              to="/gestion"
              className={styles.navLink}
            >
              Gestión
            </Link>
          </li>
        )}

        {user ? (
          <>
            <li
              style={{
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                fontWeight: "600",
              }}
            >
              👤 {rol === "admin"
                ? "Admin"
                : "Usuario"}
            </li>

            <li>
              <button
                onClick={handleLogout}
                className={styles.navLink}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Salir
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className={styles.navLink}
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/registro"
                className={styles.navLink}
              >
                Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}