import React from "react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import styles from "./Nav.module.css";

export default function Nav() {
  const { cart } = useCart();

  const cantidadItems = cart.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={styles.navLink}>
            Inicio
          </Link>
        </li>

        <li>
          <Link to="/productos" className={styles.navLink}>
            Productos
          </Link>
        </li>

        <li>
          <Link to="/carrito" className={styles.cartLink}>
            🛒 Carrito ({cantidadItems})
          </Link>
        </li>
      </ul>
    </nav>
  );
}