import React, { useState, useEffect } from 'react';
import { ItemList } from './ItemList';

export function ItemListContainer({ saludo }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Usamos %27 para evitar conflictos con la comilla simple en producción
    Promise.all([
      fetch('https://fakestoreapi.com/products/category/electronics').then((res) => {
        if (!res.ok) throw new Error('Error al cargar electrónica');
        return res.json();
      }),
      fetch('https://fakestoreapi.com/products/category/men%27s%20clothing').then((res) => {
        if (!res.ok) throw new Error('Error al cargar accesorios');
        return res.json();
      }),
    ])
      .then(([electronica, accesorios]) => {
        const combinados = [...electronica, ...accesorios.slice(0, 2)];

        const productosFormateados = combinados.map((item) => ({
          id: item.id,
          nombre: item.title,
          precio: Math.round(item.price * 1000),
          stock: item.rating ? item.rating.count : 10,
          descripcion: item.description,
          imagen: item.image,
        }));

        setProductos(productosFormateados);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#0f766e' }}>
        <h2>Cargando catálogo completo (8 productos)... ⏳</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#e11d48' }}>
        <h2>Error al obtener productos:</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section>
      {saludo && (
        <h2 style={{ color: '#0f172a', marginBottom: '1rem', fontSize: '1.75rem' }}>
          {saludo}
        </h2>
      )}
      <ItemList productos={productos} />
    </section>
  );
}