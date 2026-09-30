import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Inicio from './pages/Inicio';
import ProductoDetalle from './pages/ProductoDetalle';
import Carrito from './pages/Carrito';
import { ItemListContainer } from './components/products/ItemListContainer';

export default function App() {
  return (
    <Routes>
      {/* Ruta padre que envuelve todo con el Layout (Header y Footer) */}
      <Route element={<Layout />}>
        {/* Ruta principal / bienvenida */}
        <Route path="/" element={<Inicio />} />

        {/* Catálogo completo de productos */}
        <Route
          path="/productos"
          element={<ItemListContainer saludo="Catálogo Completo de Productos" />}
        />

        {/* Detalle dinámico del producto por su ID */}
        <Route path="/producto/:id" element={<ProductoDetalle />} />

        {/* Vista requerida del carrito */}
        <Route path="/carrito" element={<Carrito />} />

        {/* Ruta comodín por si escriben cualquier otra dirección */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h2>404 - Página no encontrada</h2>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}