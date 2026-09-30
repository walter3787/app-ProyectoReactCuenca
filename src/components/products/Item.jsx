import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Item.module.css';

export function Item({ id, nombre, precio, stock, imagen }) {
  return (
    <article className={styles.card}>
      <img src={imagen} alt={nombre} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{nombre}</h3>
        <p className={styles.price}>${precio.toLocaleString('es-AR')}</p>
        <p className={styles.stock}>Disponibles: {stock} unidades</p>
        {/* Enlace dinámico al detalle del producto */}
        <Link to={`/producto/${id}`} className={styles.detailBtn}>
          Ver Detalle
        </Link>
      </div>
    </article>
  );
}