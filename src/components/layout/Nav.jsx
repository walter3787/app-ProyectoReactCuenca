import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export default function Nav() {
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
            🛒 Carrito
          </Link>
        </li>
      </ul>
    </nav>
  );
}