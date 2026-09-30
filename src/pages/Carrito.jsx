import React from 'react';
import { Link } from 'react-router-dom';

export default function Carrito() {
  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '3rem 2rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '2rem auto',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#0f172a', marginBottom: '1rem', fontSize: '2rem' }}>🛒 Tu Carrito de Compras</h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Por el momento el carrito se encuentra vacío. En la entrega final vas a poder sumar y gestionar tus productos con Context API.
      </p>
      <Link
        to="/productos"
        style={{
          backgroundColor: '#0d9488',
          color: '#ffffff',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          fontWeight: '600',
        }}
      >
        Explorar Productos
      </Link>
    </div>
  );
}