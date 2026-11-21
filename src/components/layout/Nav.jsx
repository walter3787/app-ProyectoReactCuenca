import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import styles from "./Nav.module.css";

export default function Nav({ abrirCarrito }) {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
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
  <nav className={styles.nav}>
    {menuOpen && (
      <div
        className={styles.overlay}
        onClick={() => setMenuOpen(false)}
      />
    )}

    <button
      className={styles.menuButton}
      onClick={() =>
        setMenuOpen(!menuOpen)
      }
    >
      ☰
    </button>

    <ul
      className={`${styles.navList} ${
        menuOpen
          ? styles.open
          : ""
      }`}
    >
      <li>
        <Link
          to="/"
          className={styles.navLink}
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Inicio
        </Link>
      </li>

      <li>
        <Link
          to="/productos"
          className={styles.navLink}
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Productos
        </Link>
      </li>

      <li>
        <button
          onClick={() => {
            abrirCarrito();
            setMenuOpen(false);
          }}
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
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Gestión
          </Link>
        </li>
      )}

      {user ? (
        <>
          <li
            className={
              styles.userLabel
            }
          >
            👤{" "}
            {rol === "admin"
              ? "Admin"
              : "Usuario"}
          </li>

          <li>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className={
                styles.logoutButton
              }
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
              className={
                styles.navLink
              }
            >
              Login
            </Link>
          </li>

          <li>
            <Link
              to="/registro"
              className={
                styles.navLink
              }
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