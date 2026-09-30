# SMDStore - Pre-Entrega React JS

Plataforma de comercio electrónico desarrollada con **React** y **Vite**, orientada a la venta de periféricos y componentes tecnológicos de alto rendimiento. Proyecto desarrollado para la pre-entrega del curso de desarrollo web con React JS en Talento Tech.

---

## 🚀 Características y Requerimientos Implementados

* **Estructura y Layout Modular:** 
  * Maquetación centralizada mediante `Layout.jsx` con persistencia de cabecera (`Header.jsx`) y pie de página (`Footer.jsx`).
  * Barra de navegación (`Nav.jsx`) interactiva implementada con componentes `<Link>` para evitar recargas completas.
  * Pie de página institucional que incluye información legal, datos de contacto de la empresa y tarjetas dinámicas de los integrantes del equipo cargadas desde `nosotros.json`.
* **Catálogo de Productos y Consumo de API Local:**
  * Componente contenedor `ItemListContainer.jsx` que consume el archivo `productos.json` de manera asíncrona mediante `fetch` dentro de un hook `useEffect`.
  * Manejo declarativo de estados de carga (`loading`), error y almacenamiento de datos con `useState`.
  * Visualización desacoplada mediante `ItemList.jsx` y tarjetas presentacionales individuales reutilizables `Item.jsx`.
* **Sistema de Navegación Dinámica:**
  * Enrutamiento SPA gestionado mediante `react-router-dom`.
  * Soporte para rutas principales (`/`, `/productos`, `/carrito`).
  * Ruta parametrizada dinámica (`/producto/:id`) que resuelve los detalles puntuales del artículo a través del hook `useParams`.
* **Aislamiento de Estilos:**
  * Implementación de **CSS Modules** por componente para garantizar encapsulamiento, prevenir colisiones de clases y asegurar un diseño responsivo.

---

## 🛠️ Tecnologías Utilizadas

* **React 18 / 19**
* **Vite**
* **React Router DOM v6 / v7**
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
    ├── productos.json
    └── nosotros.json