import React, { useState, useEffect } from 'react';
import { ItemList } from './ItemList';

export function ItemListContainer({ saludo }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/productos.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('No se pudo cargar el catálogo de productos');
        }
        return res.json();
      })
      .then((data) => {
        setProductos(data);
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
        <h2>Cargando catálogo... ⏳</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#e11d48' }}>
        <h2>Ups, ocurrió un error:</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section>
      {saludo && (
        <h2 style={{ color: '#0f172a', marginBottom: '0.5rem', fontSize: '1.75rem' }}>
          {saludo}
        </h2>
      )}
      <ItemList productos={productos} />
    </section>
  );
}