import React from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import { ItemListContainer } from "../components/products/ItemListContainer";

import styles from "./Inicio.module.css";

export default function Inicio() {
  return (
    <>
      <Helmet>
        <title>SMDStore | Inicio</title>

        <meta
          name="description"
          content="Tienda online de hardware, periféricos y componentes tecnológicos."
        />
      </Helmet>

      <div>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Bienvenido a SMDStore
          </h1>

          <p className={styles.description}>
            Encontrá los mejores periféricos,
            componentes de hardware y tecnología
            de punta con la mejor atención.
          </p>

          <Link
            to="/productos"
            className={styles.button}
          >
            Ver Todo el Catálogo
          </Link>
        </section>

        <ItemListContainer
          saludo="⭐ Productos Destacados"
        />
      </div>
    </>
  );
}