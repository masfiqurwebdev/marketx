"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("marketx-cart");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "marketx-cart",
      JSON.stringify(cart)
    );
  }, [cart, isLoaded]);

  // Add product
  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  item.stock
                ),
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    });
  };

  // Remove product
  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  // Increase quantity
  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.min(
            item.quantity + 1,
            item.stock
          ),
        };
      })
    );
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== productId) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Number of products
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Subtotal
  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Shipping
  const shipping =
    subtotal === 0
      ? 0
      : subtotal >= 50
        ? 0
        : 5;

  // Total
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        shipping,
        total,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}