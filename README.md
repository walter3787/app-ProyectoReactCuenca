# SMDStore - Pre-Entrega React JS

Plataforma de comercio electrónico desarrollada con **React** y **Vite**, orientada a la venta de periféricos, componentes de hardware y accesorios tecnológicos. Proyecto desarrollado para la pre-entrega del curso de desarrollo web con React JS en Talento Tech.

---

## 🚀 Características y Requerimientos Implementados

* **Estructura y Layout Modular:** 
  * Maquetación centralizada mediante `Layout.jsx` con persistencia de cabecera (`Header.jsx`) y pie de página (`Footer.jsx`).
  * Barra de navegación (`Nav.jsx`) interactiva implementada con componentes `<Link>` para evitar recargas completas.
  * Pie de página institucional con información legal, canales de contacto y tarjetas dinámicas de los integrantes del equipo cargadas desde `nosotros.json` local.
* **Catálogo de Productos y Consumo de API Externa:**
  * Componente contenedor `ItemListContainer.jsx` que consume de forma asíncrona datos en vivo desde **Fake Store API** (`/category/electronics` combinada con accesorios afines mediante `Promise.all`).
  * Manejo declarativo de estados de carga (`loading`), errores y almacenamiento de datos con `useState` y `useEffect`.
  * Visualización desacoplada mediante `ItemList.jsx` y tarjetas presentacionales individuales reutilizables `Item.jsx`.
* **Sistema de Navegación Dinámica:**
  * Enrutamiento SPA gestionado mediante `react-router-dom`.
  * Soporte para rutas principales (`/`, `/productos`, `/carrito`).
  * Ruta parametrizada dinámica (`/producto/:id`) que resuelve los detalles puntuales de cada artículo en tiempo real a través del hook `useParams`.
* **Aislamiento de Estilos:**
  * Implementación de **CSS Modules** por componente para garantizar encapsulamiento, prevenir colisiones de clases y asegurar un diseño responsivo y consistente.

---

## 🛠️ Tecnologías Utilizadas

* **React 18 / 19**
* **Vite**
* **React Router DOM v6 / v7**
* **Fake Store API** (Catálogo de productos)
* **CSS Modules & CSS3**
* **JavaScript (ES6+)**

---

## 📁 Estructura del Proyecto

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx & Header.module.css
│   │   ├── Nav.jsx & Nav.module.css
│   │   ├── Footer.jsx & Footer.module.css
│   │   └── Layout.jsx & Layout.module.css
│   └── products/
│       ├── Item.jsx & Item.module.css
│       ├── ItemList.jsx
│       └── ItemListContainer.jsx
├── pages/
│   ├── Inicio.jsx
│   ├── ProductoDetalle.jsx
│   └── Carrito.jsx
├── App.jsx
├── index.css
└── main.jsx
public/
└── data/
    └── nosotros.json