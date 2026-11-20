import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { productosFicticios } from "../utils/productosFicticios";

export default function CargaProductos() {

  const cargarProductos = async () => {
    try {

      const productosRef = collection(db, "productos");

      for (const producto of productosFicticios) {
        await addDoc(productosRef, producto);
      }

      alert("3 productos cargados correctamente");

    } catch (error) {
      console.error(error);
      alert("Error al cargar productos");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Carga Inicial</h1>

      <button onClick={cargarProductos}>
        Cargar 3 productos de prueba
      </button>
    </div>
  );
}