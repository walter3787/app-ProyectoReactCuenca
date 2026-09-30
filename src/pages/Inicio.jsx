import React from 'react';
import { Link } from 'react-router-dom';
import { ItemListContainer } from '../components/products/ItemListContainer';

export default function Inicio() {
  const heroStyle = {
    textAlign: 'center',
    padding: '3rem 1.5rem',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    borderRadius: '12px',
    marginBottom: '3rem',
    border: '1px solid #334155',
  };

  const btnStyle = {
    display: 'inline-block',
    marginTop: '1.5rem',
    backgroundColor: '#0d9488',
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontWeight: '600',
    transition: 'background-color 0.2s ease',
  };

  return (
    <div>
      <section style={heroStyle}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2dd4bf' }}>
          Bienvenido a SMDStore
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
          Encontrá los mejores periféricos, componentes de hardware y tecnología de punta con la mejor atención.
        </p>
        <Link to="/productos" style={btnStyle}>
          Ver Todo el Catálogo
        </Link>
      </section>

      {/* Reutilizamos el catálogo como sección de productos destacados */}
      <ItemListContainer saludo="⭐ Productos Destacados" />
    </div>
  );
}