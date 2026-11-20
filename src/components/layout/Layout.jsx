import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import CartDrawer from "../cart/CartDrawer";

import styles from "./Layout.module.css";

export default function Layout() {
  const [carritoAbierto, setCarritoAbierto] =
    useState(false);

  return (
    <div className={styles.layoutWrapper}>
      <Header
        abrirCarrito={() =>
          setCarritoAbierto(true)
        }
      />

      <CartDrawer
        abierto={carritoAbierto}
        cerrar={() =>
          setCarritoAbierto(false)
        }
      />

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}