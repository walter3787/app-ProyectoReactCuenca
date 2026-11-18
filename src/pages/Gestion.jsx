import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Gestion() {
  const { user, logout } = useAuth();

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productoAEditar, setProductoAEditar] = useState(null);  

  const [formulario, setFormulario] = useState({
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

  const obtenerProductos = async () => {
    try {
      const productosRef = collection(db, "productos");

      const respuesta = await getDocs(productosRef);

      const productosFirestore = respuesta.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProductos(productosFirestore);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const guardarProducto = async (e) => {
    e.preventDefault();

    const productoData = {
      nombre: formulario.nombre,
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      categoria: formulario.categoria,
      descripcion: formulario.descripcion,
      imagen: formulario.imagen,
    };

    try {
      if (productoAEditar) {
        await updateDoc(
          doc(db, "productos", productoAEditar.id),
          productoData
        );

        alert("Producto actualizado correctamente");
      } else {
        await addDoc(
          collection(db, "productos"),
          productoData
        );

        alert("Producto guardado correctamente");
      }

      setFormulario({
        nombre: "",
        precio: "",
        stock: "",
        categoria: "",
        descripcion: "",
        imagen: "",
      });

      setProductoAEditar(null);

      obtenerProductos();

    } catch (error) {
      console.error(error);
      alert("Error al guardar producto");
    }
  };

  const eliminarProducto = async (id) => {
  const confirmar = window.confirm(
    "¿Seguro que deseas eliminar este producto?"
  );

  if (!confirmar) return;

  try {
    await deleteDoc(doc(db, "productos", id));

    obtenerProductos();

      alert("Producto eliminado");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

  const editarProducto = (producto) => {
    setProductoAEditar(producto);

    setFormulario({
      nombre: producto.nombre || "",
      precio: producto.precio || "",
      stock: producto.stock || "",
      categoria: producto.categoria || "",
      descripcion: producto.descripcion || "",
      imagen: producto.imagen || "",
    });
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1>Panel de Gestión</h1>

      <p>Usuario: {user?.email}</p>

      <button onClick={logout}>
        Cerrar sesión
      </button>

      <hr />

      <h2>Alta de Producto</h2>

      <form onSubmit={guardarProducto}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />

        <br /><br />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formulario.precio}
          onChange={manejarCambio}
          required
        />

        <br /><br />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formulario.stock}
          onChange={manejarCambio}
          required
        />

        <br /><br />

        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={formulario.categoria}
          onChange={manejarCambio}
          required
        />

        <br /><br />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formulario.descripcion}
          onChange={manejarCambio}
          required
        />

        <br /><br />

        <input
          type="text"
          name="imagen"
          placeholder="URL de imagen"
          value={formulario.imagen}
          onChange={manejarCambio}
          required
        />

        <br /><br />

        <button type="submit">
          {productoAEditar
            ? "Actualizar Producto"
            : "Guardar Producto"}
        </button>
      </form>

      <hr />

      <h2>Productos</h2>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
            <strong>{producto.nombre}</strong>
            {" - "}
            ${producto.precio}
            {" - "}
            Stock: {producto.stock}

            <button
              onClick={() => editarProducto(producto)}
              style={{ marginLeft: "1rem" }}
            >
              Editar
            </button>

            <button
              onClick={() => eliminarProducto(producto.id)}
              style={{ marginLeft: "1rem" }}
            >
              Eliminar
            </button>
          </li>
          ))}
        </ul>
      )}
    </div>
  );
}