import React, {
  useState,
  useEffect,
} from "react";

import { Helmet } from "react-helmet-async";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import { ItemList } from "./ItemList";

import styles from "./ItemListContainer.module.css";

export function ItemListContainer({
  saludo,
}) {
  const [productos, setProductos] =
    useState([]);

  const [cargando, setCargando] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [busqueda, setBusqueda] =
    useState("");

  const [paginaActual,
    setPaginaActual] =
    useState(1);

  useEffect(() => {
    const obtenerProductos =
      async () => {
        try {
          const productosRef =
            collection(
              db,
              "productos"
            );

          const respuesta =
            await getDocs(
              productosRef
            );

          const productosFirestore =
            respuesta.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setProductos(
            productosFirestore
          );
        } catch (err) {
          setError(
            err.message
          );
        } finally {
          setCargando(false);
        }
      };

    obtenerProductos();
  }, []);

  const productosFiltrados =
    productos.filter(
      (producto) =>
        producto.nombre
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )
    );

  const productosPorPagina =
    12;

  const indiceUltimoProducto =
    paginaActual *
    productosPorPagina;

  const indicePrimerProducto =
    indiceUltimoProducto -
    productosPorPagina;

  const productosPaginados =
    productosFiltrados.slice(
      indicePrimerProducto,
      indiceUltimoProducto
    );

  const totalPaginas =
    Math.ceil(
      productosFiltrados.length /
        productosPorPagina
    );

  if (cargando) {
    return (
      <div
        className={
          styles.centerMessage
        }
      >
        <h2>
          Cargando catálogo...
          ⏳
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={
          styles.centerMessage
        }
      >
        <h2>
          Error al obtener
          productos
        </h2>

        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          SMDStore |
          Productos
        </title>
      </Helmet>

      <section>
        {saludo && (
          <h2
            className={
              styles.title
            }
          >
            {saludo}
          </h2>
        )}

        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(
              e.target.value
            );

            setPaginaActual(
              1
            );
          }}
          className={
            styles.searchInput
          }
        />

        <ItemList
          productos={
            productosPaginados
          }
        />

        <div
          className={
            styles.pagination
          }
        >
          {Array.from(
            {
              length:
                totalPaginas,
            },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() =>
                  setPaginaActual(
                    index + 1
                  )
                }
                className={
                  paginaActual ===
                  index + 1
                    ? styles.activePage
                    : styles.pageButton
                }
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </section>
    </>
  );
}