import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const carritoGuardado =
      localStorage.getItem("carrito");

    return carritoGuardado
      ? JSON.parse(carritoGuardado)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "carrito",
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (producto) => {
    const existe = cart.find(
      (item) => item.id === producto.id
    );

    if (existe) {
      if (existe.cantidad >= existe.stock) {
        alert(
          `Solo hay ${existe.stock} unidades disponibles`
        );
        return;
      }

      setCart(
        cart.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          stock: producto.stock,
          imagen: producto.imagen,
          cantidad: 1,
        },
      ]);
    }
  };

  const removeFromCart = (id) => {
    setCart(
      cart.filter(
        (item) => item.id !== id
      )
    );
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          if (
            item.cantidad >=
            item.stock
          ) {
            return item;
          }

          return {
            ...item,
            cantidad:
              item.cantidad + 1,
          };
        }

        return item;
      })
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                cantidad:
                  item.cantidad - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.cantidad > 0
        )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce(
    (acc, item) =>
      acc + item.cantidad,
    0
  );

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc +
      item.precio *
        item.cantidad,
    0
  );

  const value = {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};