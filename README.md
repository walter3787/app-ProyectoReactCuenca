# SMDStore - Entrega Final React JS

SMDStore es una plataforma de comercio electrónico desarrollada con React, Vite y Firebase, orientada a la venta de periféricos, hardware, componentes tecnológicos y accesorios informáticos.

El proyecto fue desarrollado como trabajo final para el curso de React JS de Talento Tech, implementando autenticación de usuarios, carrito de compras con Context API, gestión completa de productos mediante Firebase Firestore, control de acceso por roles y una interfaz responsive adaptada a distintos dispositivos.

---

## 🌐 Demo en Vivo

👉 https://app-proyecto-react-cuenca.vercel.app

---

## 🚀 Funcionalidades Implementadas

### 🛍️ Catálogo de Productos

- Visualización dinámica de productos almacenados en Firebase Firestore.
- Listado completo de productos.
- Página de detalle individual por producto.
- Búsqueda en tiempo real.
- Paginación de resultados.
- Navegación SPA mediante React Router.

### 🛒 Carrito de Compras

Implementado mediante Context API.

Permite:

- Agregar productos.
- Eliminar productos.
- Incrementar cantidades.
- Disminuir cantidades.
- Vaciar el carrito.
- Mantener el estado global de la aplicación.

Características adicionales:

- Persistencia mediante localStorage.
- Control de stock disponible.
- Actualización automática de cantidades.
- Resumen dinámico del total de compra.

### 🔐 Sistema de Autenticación

Implementado con Firebase Authentication.

Incluye:

- Registro de usuarios.
- Inicio de sesión.
- Cierre de sesión.
- Gestión global mediante AuthContext.
- Persistencia de sesión.

### 👥 Roles y Control de Acceso

Se implementó diferenciación entre usuarios:

- Usuario estándar.
- Administrador.

Los administradores tienen acceso al panel de gestión y al CRUD de productos mediante rutas protegidas.

---

## ⚙️ Panel de Gestión Administrativa

**Acceso exclusivo para usuarios con rol de administrador.**

Implementación completa de CRUD utilizando Firebase Firestore.

Permite:

### Crear productos

- Nombre
- Precio
- Categoría
- Stock
- Descripción
- Imagen

### Editar productos

- Modificación completa de datos desde modal.

### Eliminar productos

- Confirmación previa antes de eliminar.

### Gestión avanzada

- Dashboard de stock.
- Indicadores visuales.
- Estado normal, bajo y crítico.
- Búsqueda de productos.
- Filtro por categoría.
- Ordenamiento de resultados.
- Paginación configurable.
- Dashboard interactivo mediante tarjetas clickeables.

---

## 📊 Dashboard de Stock

Panel visual para supervisar el inventario.

Incluye:

- 🟢 Stock normal
- 🟡 Stock bajo
- 🔴 Stock crítico
- 📦 Total de productos

Cada tarjeta funciona como filtro directo para agilizar la gestión del catálogo.

---

## 🎨 Diseño y Experiencia de Usuario

Se implementaron mejoras orientadas a la usabilidad:

- CSS Modules.
- Diseño responsive.
- Menú hamburguesa para dispositivos móviles.
- Menú lateral tipo drawer en dispositivos móviles.
- Modal para altas y modificaciones.
- Página 404 personalizada.
- Indicadores de carga.
- Manejo de errores.
- Feedback visual al agregar productos al carrito.
- Navegación optimizada para desktop y móvil.

---

## 🔍 Funcionalidades de Búsqueda y Navegación

### Búsqueda en Tiempo Real

Permite localizar productos instantáneamente mientras el usuario escribe.

### Paginación

Implementada en:

- Catálogo de productos.
- Panel administrativo.

Esto mejora la experiencia de navegación y el rendimiento cuando la cantidad de productos aumenta.

---

## 🏷️ SEO Básico

Se implementó React Helmet Async para gestionar:

- Títulos dinámicos por página.
- Mejor organización de metadatos.
- Optimización básica para navegadores y motores de búsqueda.

Ejemplos:

- SMDStore | Inicio
- SMDStore | Productos
- SMDStore | Carrito
- SMDStore | Gestión
- SMDStore | Login
- SMDStore | Registro

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- React
- Vite
- React Router DOM
- Context API
- CSS Modules
- React Helmet Async

### Backend y Base de Datos

- Firebase Authentication
- Cloud Firestore

### Herramientas

- JavaScript ES6+
- Git
- GitHub

### Despliegue

- Vercel

---

## ⚙️ Instalación Local

Clonar el repositorio:

```bash
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
```

Ingresar al directorio del proyecto:

```bash
cd app-ProyectoReactCuenca
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` con las credenciales de Firebase correspondientes:

```env
VITE_API_KEY=xxxxxxxxxxxxxxxx
VITE_AUTH_DOMAIN=xxxxxxxxxxxxxxxx
VITE_PROJECT_ID=xxxxxxxxxxxxxxxx
VITE_STORAGE_BUCKET=xxxxxxxxxxxxxxxx
VITE_MESSAGING_SENDER_ID=xxxxxxxxxxxxxxxx
VITE_APP_ID=xxxxxxxxxxxxxxxx
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

---

## 🧪 Casos de Prueba

### Navegación

- Acceder a Inicio.
- Acceder al catálogo.
- Navegar al detalle de un producto.
- Verificar el funcionamiento de la página 404.

### Autenticación

- Registrar un nuevo usuario.
- Iniciar sesión con un usuario existente.
- Cerrar sesión.
- Verificar persistencia de sesión.

### Carrito

- Agregar productos.
- Incrementar cantidades.
- Disminuir cantidades.
- Eliminar productos.
- Vaciar carrito.
- Verificar persistencia tras recargar la página.

### Gestión Administrativa

- Acceder con una cuenta administradora.
- Crear productos.
- Editar productos.
- Eliminar productos.
- Utilizar filtros y búsqueda.
- Utilizar el dashboard de stock.

### Responsive Design

- Probar en escritorio.
- Probar en tablet.
- Probar en dispositivos móviles.
- Verificar funcionamiento del menú hamburguesa.

### Build de Producción

Verificar que el proyecto compile correctamente:

```bash
npm run build
```

---

## 📁 Estructura del Proyecto

```text
src
├── assets
│   └── react.svg
│
├── components
│   ├── cart
│   │   └── CartDrawer.jsx
│   │
│   ├── layout
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── Nav.jsx
│   │   ├── Nav.module.css
│   │   ├── Footer.jsx
│   │   ├── Footer.module.css
│   │   ├── Layout.jsx
│   │   └── Layout.module.css
│   │
│   ├── products
│   │   ├── Item.jsx
│   │   ├── Item.module.css
│   │   ├── ItemList.jsx
│   │   ├── ItemListContainer.jsx
│   │   └── ItemListContainer.module.css
│   │
│   └── ProtectedRoute.jsx
│
├── context
│   ├── AuthContext.jsx
│   └── CartContext.jsx
│
├── firebase
│   └── config.js
│
├── pages
│   ├── Inicio.jsx
│   ├── Inicio.module.css
│   ├── ProductoDetalle.jsx
│   ├── ProductoDetalle.module.css
│   ├── Carrito.jsx
│   ├── Carrito.module.css
│   ├── Login.jsx
│   ├── Login.module.css
│   ├── Registro.jsx
│   ├── Registro.module.css
│   ├── Gestion.jsx
│   ├── Gestion.module.css
│   ├── CargaProductos.jsx
│   ├── NotFound.jsx
│   └── NotFound.module.css
│
├── utils
│   └── productosFicticios.js
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

---

## 🔒 Seguridad Implementada

- Rutas protegidas mediante ProtectedRoute.
- Autenticación con Firebase Authentication.
- Restricción de acceso al panel administrativo.
- Gestión de roles.
- Persistencia de sesión autenticada.

---

## 📱 Responsive Design

La aplicación fue optimizada para:

- Computadoras de escritorio.
- Tablets.
- Smartphones Android.
- Dispositivos iPhone.

Características:

- Menú hamburguesa responsive.
- Menú lateral tipo drawer.
- Layout adaptable.
- Formularios optimizados para móvil.
- Navegación táctil.

---

## 🚀 Despliegue

Aplicación desplegada en:

**Vercel**

URL de producción:

https://app-proyecto-react-cuenca.vercel.app

---

## 👨‍💻 Autor

**Walter Adrián Cuenca**

Proyecto desarrollado como entrega final para el curso de React JS de Talento Tech.