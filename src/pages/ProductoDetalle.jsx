import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { Helmet } from "react-helmet-async";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

import { useCart } from "../context/CartContext";

import styles from "./ProductoDetalle.module.css";

export default function ProductoDetalle() {
  const { id } = useParams();

  const [producto, setProducto] =
    useState(null);

  const [cargando, setCargando] =
    useState(true);

  const [error, setError] =
    useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const obtenerProducto =
      async () => {
        try {
          const productoRef =
            doc(
              db,
              "productos",
              id
            );

          const respuesta =
            await getDoc(
              productoRef
            );

          if (
            !respuesta.exists()
          ) {
            throw new Error(
              "Producto no encontrado"
            );
          }

          setProducto({
            id: respuesta.id,
            ...respuesta.data(),
          });
        } catch (err) {
          setError(
            err.message
          );
        } finally {
          setCargando(false);
        }
      };

    obtenerProducto();
  }, [id]);

  if (cargando) {
    return (
      <div
        className={
          styles.centerMessage
        }
      >
        <h2>
          Cargando detalle del
          producto... ⏳
        </h2>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div
        className={
          styles.centerMessage
        }
      >
        <Helmet>
          <title>
            SMDStore | Producto no encontrado
          </title>
        </Helmet>

        <h2>
          {error ||
            "Producto no encontrado"}
        </h2>

        <Link
          to="/productos"
          className={
            styles.backLink
          }
        >
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          SMDStore | {producto.nombre}
        </title>

        <meta
          name="description"
          content={
            producto.descripcion
          }
        />
      </Helmet>

      <div>
        <Link
          to="/productos"
          className={
            styles.backLink
          }
        >
          ← Volver al catálogo
        </Link>

        <article
          className={
            styles.container
          }
        >
          <div
            className={
              styles.imageContainer
            }
          >
            <img
              src={
                producto.imagen
              }
              alt={
                producto.nombre
              }
              className={
                styles.image
              }
            />
          </div>

          <div
            className={
              styles.content
            }
          >
            <h2>
              {producto.nombre}
            </h2>

            <p
              className={
                styles.description
              }
            >
              {
                producto.descripcion
              }
            </p>

            <p
              className={
                styles.price
              }
            >
              $
              {producto.precio.toLocaleString(
                "es-AR"
              )}
            </p>

            <p
              className={
                styles.stock
              }
            >
              Stock disponible:
              {" "}
              {producto.stock}
            </p>

            <button
              className={
                styles.cartButton
              }
              onClick={() =>
                addToCart(
                  producto
                )
              }
            >
              🛒 Agregar al carrito
            </button>
          </div>
        </article>
      </div>
    </>
  );
}