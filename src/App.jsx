import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Inicio from './pages/Inicio';
import ProductoDetalle from './pages/ProductoDetalle';
import Carrito from './pages/Carrito';
import { ItemListContainer } from './components/products/ItemListContainer';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Gestion from './pages/Gestion';
import ProtectedRoute from './components/ProtectedRoute';
import CargaProductos from "./pages/CargaProductos";
import NotFound from "./pages/NotFound";

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

        {/* Vista de login */}
        <Route path="/login" element={<Login />} />
        
        {/* Vista de registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Vista de gestión protegida */}
        <Route
          path="/gestion"
          element={
            <ProtectedRoute>
              <Gestion />
            </ProtectedRoute>
          }
        />
        
        {/* Vista de carga de productos protegida */}
        <Route
          path="/carga-productos"
          element={<CargaProductos />}
        />

        {/* Ruta comodín por si escriben cualquier otra dirección */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}