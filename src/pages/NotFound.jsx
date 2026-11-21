import { Link } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>
          SMDStore | 404
        </title>
      </Helmet>

      <div className={styles.container}>
        <h1 className={styles.code}>
          404
        </h1>

        <h2>
          Página no encontrada
        </h2>

        <p>
          La página que intentás
          visitar no existe.
        </p>

        <Link
          to="/"
          className={styles.button}
        >
          Volver al inicio
        </Link>
      </div>
    </>
  );
}