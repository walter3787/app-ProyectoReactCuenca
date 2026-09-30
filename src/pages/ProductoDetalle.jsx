import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('No se encontró el producto en la API');
        return res.json();
      })
      .then((data) => {
        if (!data || !data.id) {
          throw new Error('Producto inexistente');
        }
        setProducto({
          id: data.id,
          nombre: data.title,
          precio: Math.round(data.price * 1000),
          stock: data.rating ? data.rating.count : 10,
          descripcion: data.description,
          imagen: data.image,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#0f766e' }}>
        <h2>Cargando detalle del producto... ⏳</h2>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2 style={{ color: '#e11d48' }}>{error || 'Producto no encontrado'}</h2>
        <Link
          to="/productos"
          style={{ color: '#0d9488', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}
        >
          ← Volver a productos
        </Link>
      </div>
    );
  }

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2.5rem',
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
    maxWidth: '900px',
    margin: '0 auto',
    alignItems: 'center',
  };

  return (
    <div>
      <Link to="/productos" style={{ display: 'inline-block', marginBottom: '1.5rem', color: '#0d9488', fontWeight: '500' }}>
        ← Volver al catálogo
      </Link>

      <article style={containerStyle}>
        <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{ width: '100%', maxHeight: '320px', objectFit: 'contain' }}
          />
        </div>

        <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.75rem' }}>{producto.nombre}</h2>
          <p style={{ color: '#64748b', marginBottom: '1.25rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
            {producto.descripcion}
          </p>
          <p style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0f766e', marginBottom: '0.75rem' }}>
            ${producto.precio.toLocaleString('es-AR')}
          </p>
          <p style={{ color: '#475569', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Stock disponible: <strong>{producto.stock}</strong> unidades
          </p>

          <button
            onClick={() => alert(`Agregaste 1 unidad de ${producto.nombre} al carrito`)}
            style={{
              backgroundColor: '#0d9488',
              color: '#ffffff',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Agregar al Carrito
          </button>
        </div>
      </article>
    </div>
  );
}