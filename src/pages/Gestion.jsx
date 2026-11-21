import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AuthContext";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/config";

import styles from "./Gestion.module.css";

export default function Gestion() {
  const { user } = useAuth();

  const [productos, setProductos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    productoAEditar,
    setProductoAEditar,
  ] = useState(null);

  const [
    mostrarModal,
    setMostrarModal,
  ] = useState(false);

  const [busqueda, setBusqueda] =
    useState("");

  const [
    categoriaFiltro,
    setCategoriaFiltro,
  ] = useState("Todas");

  const [filtroStock, setFiltroStock] =
    useState("Todos");

  const [ordenarPor,
    setOrdenarPor] =
    useState("nombreAsc");

  const [paginaActual,
    setPaginaActual] =
    useState(1);

  const [
    productosPorPagina,
    setProductosPorPagina,
  ] = useState(10);

  const [formulario,
    setFormulario] =
    useState({
      nombre: "",
      precio: "",
      stock: "",
      categoria: "",
      descripcion: "",
      imagen: "",
    });

  useEffect(() => {
    obtenerProductos();
  }, []);

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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const manejarCambio = (
    e
  ) => {
    setFormulario({
      ...formulario,
      [e.target.name]:
        e.target.value,
    });
  };

  const guardarProducto =
    async (e) => {
      e.preventDefault();

      if (
        formulario.nombre.trim() ===
        "" ||
        Number(
          formulario.precio
        ) <= 0
      ) {
        alert(
          "Nombre obligatorio y precio válido"
        );

        return;
      }

      const productoData = {
        nombre:
          formulario.nombre,
        precio: Number(
          formulario.precio
        ),
        stock: Number(
          formulario.stock
        ),
        categoria:
          formulario.categoria,
        descripcion:
          formulario.descripcion,
        imagen:
          formulario.imagen,
      };

      try {
        if (
          productoAEditar
        ) {
          await updateDoc(
            doc(
              db,
              "productos",
              productoAEditar.id
            ),
            productoData
          );
        } else {
          await addDoc(
            collection(
              db,
              "productos"
            ),
            productoData
          );
        }

        setFormulario({
          nombre: "",
          precio: "",
          stock: "",
          categoria: "",
          descripcion: "",
          imagen: "",
        });

        setProductoAEditar(
          null
        );

        setMostrarModal(
          false
        );

        obtenerProductos();
      } catch (error) {
        console.error(error);
      }
    };

  const eliminarProducto =
    async (id) => {
      const confirmar =
        window.confirm(
          "¿Eliminar producto?"
        );

      if (!confirmar)
        return;

      await deleteDoc(
        doc(
          db,
          "productos",
          id
        )
      );

      obtenerProductos();
    };

  const editarProducto = (
    producto
  ) => {
    setProductoAEditar(
      producto
    );

    setFormulario({
      nombre:
        producto.nombre ||
        "",
      precio:
        producto.precio ||
        "",
      stock:
        producto.stock ||
        "",
      categoria:
        producto.categoria ||
        "",
      descripcion:
        producto.descripcion ||
        "",
      imagen:
        producto.imagen ||
        "",
    });

    setMostrarModal(
      true
    );
  };

  const nuevoProducto =
    () => {
      setProductoAEditar(
        null
      );

      setFormulario({
        nombre: "",
        precio: "",
        stock: "",
        categoria: "",
        descripcion: "",
        imagen: "",
      });

      setMostrarModal(
        true
      );
    };


  let productosFiltrados =
    productos.filter(
      (producto) => {
        const coincideBusqueda =
          producto.nombre
            ?.toLowerCase()
            .includes(
              busqueda.toLowerCase()
            );

        const coincideCategoria =
          categoriaFiltro === "Todas" ||
          producto.categoria === categoriaFiltro;

        const coincideStock =
          filtroStock === "Todos" ||
          (filtroStock === "Normal" &&
            producto.stock > 10) ||
          (filtroStock === "Bajo" &&
            producto.stock > 5 &&
            producto.stock <= 10) ||
          (filtroStock === "Crítico" &&
            producto.stock <= 5);

        return (
          coincideBusqueda &&
          coincideCategoria &&
          coincideStock
        );
      }
    );

  productosFiltrados.sort(
    (a, b) => {
      switch (ordenarPor) {
        case "nombreAsc":
          return a.nombre.localeCompare(
            b.nombre
          );

        case "nombreDesc":
          return b.nombre.localeCompare(
            a.nombre
          );

        case "precioAsc":
          return (
            a.precio - b.precio
          );

        case "precioDesc":
          return (
            b.precio - a.precio
          );

        case "stockAsc":
          return (
            a.stock - b.stock
          );

        case "stockDesc":
          return (
            b.stock - a.stock
          );

        default:
          return 0;
      }
    }
  );

  const categorias = [
    "Todas",
    ...new Set(
      productos.map(
        (p) => p.categoria
      )
    ),
  ];

  const indiceFinal =
    paginaActual *
    productosPorPagina;

  const indiceInicial =
    indiceFinal -
    productosPorPagina;

  const productosPagina =
    productosFiltrados.slice(
      indiceInicial,
      indiceFinal
    );

  const totalPaginas =
    Math.ceil(
      productosFiltrados.length /
      productosPorPagina
    );

  const stockCritico =
    productos.filter(
      (producto) =>
        producto.stock <= 5
    ).length;

  const stockBajo =
    productos.filter(
      (producto) =>
        producto.stock > 5 &&
        producto.stock <= 10
    ).length;

  const stockNormal =
    productos.filter(
      (producto) =>
        producto.stock > 10
    ).length;
return (
  <>
    <Helmet>
      <title>
        SMDStore | Gestión
      </title>
    </Helmet>

    <div className={styles.container}>
      <h1 className={styles.title}>
        Panel de Gestión
      </h1>

      <p className={styles.userInfo}>
        Usuario: {user?.email}
      </p>

      <div className={styles.stockSummary}>
        <div
          className={styles.stockCardGreen}
          onClick={() => {
            setFiltroStock("Normal");
            setPaginaActual(1);
          }}
        >
          <div className={styles.stockCircle}></div>

          <span>Stock normal</span>

          <strong>{stockNormal}</strong>
        </div>

        <div
          className={styles.stockCardYellow}
          onClick={() => {
            setFiltroStock("Bajo");
            setPaginaActual(1);
          }}
        >
          <div
            className={`${styles.stockCircle} ${styles.yellowCircle}`}
          ></div>

          <span>Stock bajo</span>

          <strong>{stockBajo}</strong>
        </div>


        <div
          className={styles.stockCardRed}
          onClick={() => {
            setFiltroStock("Crítico");
            setPaginaActual(1);
          }}
        >
          <div
            className={`${styles.stockCircle} ${styles.redCircle}`}
          ></div>

          <span>Stock crítico</span>

          <strong>{stockCritico}</strong>
        </div>

        <div
          className={styles.stockCardBlue}
          onClick={() => {
            setFiltroStock("Todos");
            setPaginaActual(1);
          }}
        >
          <div
            className={`${styles.stockCircle} ${styles.blueCircle}`}
          ></div>

          <span>Todos los productos</span>

          <strong>{productos.length}</strong>
        </div>
      </div>

      <p className={styles.dashboardHint}>
        💡 Hacé clic en una tarjeta para filtrar productos por estado de stock.
      </p>

      <p className={styles.activeFilter}>
        Filtro actual:
        {" "}
        <strong>{filtroStock}</strong>
      </p>

      <button
        className={styles.newProductButton}
        onClick={nuevoProducto}
      >
        ➕ Nuevo Producto
      </button>

      {mostrarModal && (
        <div
          className={styles.modalOverlay}
          onClick={() =>
            setMostrarModal(false)
          }
        >
          <div
            className={styles.modal}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className={styles.modalHeader}>
              <h2>
                {productoAEditar
                  ? "Editar producto"
                  : "Nuevo producto"}
              </h2>

              <button
                className={styles.closeButton}
                onClick={() =>
                  setMostrarModal(false)
                }
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={guardarProducto}
              className={styles.form}
            >
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
              />

              <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={formulario.precio}
                onChange={manejarCambio}
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formulario.stock}
                onChange={manejarCambio}
              />

              <input
                type="text"
                name="categoria"
                placeholder="Categoría"
                value={formulario.categoria}
                onChange={manejarCambio}
              />

              <input
                type="text"
                name="imagen"
                placeholder="URL imagen"
                value={formulario.imagen}
                onChange={manejarCambio}
              />

              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={formulario.descripcion}
                onChange={manejarCambio}
              />

              <div className={styles.formActions}>
                <button type="submit">
                  {productoAEditar
                    ? "Actualizar Producto"
                    : "Guardar Producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
        />

        <select
          value={categoriaFiltro}
          onChange={(e) => {
            setCategoriaFiltro(
              e.target.value
            );
            setPaginaActual(1);
          }}
        >
          {categorias.map((categoria) => (
            <option
              key={categoria}
              value={categoria}
            >
              {categoria}
            </option>
          ))}
        </select>

        <select
          value={ordenarPor}
          onChange={(e) =>
            setOrdenarPor(e.target.value)
          }
        >
          <option value="nombreAsc">
            Nombre A-Z
          </option>

          <option value="nombreDesc">
            Nombre Z-A
          </option>

          <option value="precioAsc">
            Precio ↑
          </option>

          <option value="precioDesc">
            Precio ↓
          </option>

          <option value="stockAsc">
            Stock ↑
          </option>

          <option value="stockDesc">
            Stock ↓
          </option>
        </select>

        <select
          value={productosPorPagina}
          onChange={(e) => {
            setProductosPorPagina(
              Number(e.target.value)
            );

            setPaginaActual(1);
          }}
        >
          <option value="10">
            10 por página
          </option>

          <option value="20">
            20 por página
          </option>

          <option value="50">
            50 por página
          </option>

          <option value="100">
            100 por página
          </option>
        </select>
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Img</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {productosPagina.map(
                  (producto) => (
                    <tr key={producto.id}>
                      <td>
                        <img
                          src={producto.imagen}
                          alt={
                            producto.nombre
                          }
                          className={
                            styles.thumb
                          }
                        />
                      </td>

                      <td>
                        {producto.nombre}
                      </td>

                      <td>
                        {
                          producto.categoria
                        }
                      </td>

                      <td>
                        $
                        {producto.precio.toLocaleString(
                          "es-AR"
                        )}
                      </td>

                      <td>
                        {producto.stock}
                      </td>

                      <td>
                        {producto.stock <=
                          5 ? (
                          <span
                            className={
                              styles.stockCritical
                            }
                          >
                            Crítico
                          </span>
                        ) : producto.stock <=
                          10 ? (
                          <span
                            className={
                              styles.stockLow
                            }
                          >
                            Bajo
                          </span>
                        ) : (
                          <span
                            className={
                              styles.stockOk
                            }
                          >
                            Normal
                          </span>
                        )}
                      </td>

                      <td>
                        <button
                          onClick={() =>
                            editarProducto(
                              producto
                            )
                          }
                        >
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            eliminarProducto(
                              producto.id
                            )
                          }
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button
              disabled={paginaActual === 1}
              onClick={() =>
                setPaginaActual(
                  (prev) => prev - 1
                )
              }
            >
              ← Anterior
            </button>

            <span>
              Página {paginaActual} de{" "}
              {totalPaginas}
            </span>

            <button
              disabled={
                paginaActual ===
                totalPaginas
              }
              onClick={() =>
                setPaginaActual(
                  (prev) => prev + 1
                )
              }
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  </>
  );
}