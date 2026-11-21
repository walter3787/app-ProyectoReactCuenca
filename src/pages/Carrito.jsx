import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCart } from "../context/CartContext";


import styles from "./Carrito.module.css";

export default function Carrito() {
  const {
    cart,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
    <><Helmet>
        <title>SMDStore | Carrito</title>
      </Helmet>
      <div className={styles.emptyCart}>
          <h2>🛒 Tu Carrito de Compras</h2>

          <p className={styles.emptyText}>
            No hay productos en el carrito.
          </p>

          <Link
            to="/productos"
            className={styles.shopButton}
          >
            Explorar Productos
          </Link>
        </div></>
    );
  }

return (
    <><Helmet>
      <title>SMDStore | Carrito</title>
    </Helmet>

    <div className={styles.container}>

      <h1 className={styles.title}>
        🛒 Carrito de Compras
      </h1>

      {cart.map((producto) => (
        <div
          key={producto.id}
          className={styles.itemCard}
        >
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className={styles.image}
          />

          <div className={styles.info}>
            <h3 className={styles.productTitle}>
              {producto.nombre}
            </h3>

            <p>
              Precio unitario:
              {" "}
              $
              {producto.precio.toLocaleString(
                "es-AR"
              )}
            </p>

            <p>
              Stock disponible:
              {" "}
              <strong>
                {producto.stock}
              </strong>
            </p>

            <p>
              Subtotal:
              {" "}
              <strong>
                $
                {(
                  producto.precio *
                  producto.cantidad
                ).toLocaleString(
                  "es-AR"
                )}
              </strong>
            </p>

            <div
              className={
                styles.quantityControls
              }
            >
              <button
                className={
                  styles.quantityButton
                }
                onClick={() =>
                  decreaseQuantity(
                    producto.id
                  )
                }
              >
                −
              </button>

              <span
                className={
                  styles.quantity
                }
              >
                {producto.cantidad}
              </span>

              <button
                className={
                  styles.quantityButton
                }
                onClick={() =>
                  increaseQuantity(
                    producto.id
                  )
                }
                disabled={
                  producto.cantidad >=
                  producto.stock
                }
                title={
                  producto.cantidad >=
                  producto.stock
                    ? "Stock máximo alcanzado"
                    : "Agregar unidad"
                }
              >
                +
              </button>
            </div>
          </div>

          <button
            className={
              styles.deleteButton
            }
            onClick={() =>
              removeFromCart(
                producto.id
              )
            }
          >
            Eliminar
          </button>
        </div>
      ))}

      <div className={styles.summary}>
        <h2 className={styles.total}>
          Total: $
          {totalPrice.toLocaleString(
            "es-AR"
          )}
        </h2>

        <div className={styles.actions}>
          <Link
            to="/productos"
            className={
              styles.continueButton
            }
          >
            Seguir comprando
          </Link>

          <button
            onClick={clearCart}
            className={
              styles.clearButton
            }
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
    </>
  );
}