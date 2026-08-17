"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // ============================================
  // LOAD CART FROM LOCAL STORAGE
  // ============================================

  useEffect(() => {
    try {
      const savedCart =
        localStorage.getItem("marketx-cart");

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );
    } finally {
      setLoaded(true);
    }
  }, []);

  // ============================================
  // SAVE CART TO LOCAL STORAGE
  // ============================================

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        "marketx-cart",
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [cart, loaded]);

  // ============================================
  // ADD TO CART
  // ============================================

  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  // ============================================
  // REMOVE FROM CART
  // ============================================

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  // ============================================
  // INCREASE QUANTITY
  // ============================================

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // ============================================
  // DECREASE QUANTITY
  // ============================================

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ============================================
  // UPDATE QUANTITY
  // ============================================

  const updateQuantity = (
    productId,
    quantity
  ) => {
    const newQuantity = Number(quantity);

    if (newQuantity <= 0 || isNaN(newQuantity)) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  };

  // ============================================
  // CLEAR CART
  // ============================================

  const clearCart = () => {
    setCart([]);
  };

  // ============================================
  // CHECK IF PRODUCT IS IN CART
  // ============================================

  const isInCart = (productId) => {
    return cart.some(
      (item) => item.id === productId
    );
  };

  // ============================================
  // GET SPECIFIC CART ITEM
  // ============================================

  const getCartItem = (productId) => {
    return cart.find(
      (item) => item.id === productId
    );
  };

  // ============================================
  // TOTAL QUANTITY
  // ============================================

  const cartCount = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // ============================================
  // TOTAL PRICE
  // ============================================

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // ============================================
  // PROVIDER
  // ============================================

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,

        addToCart,
        removeFromCart,

        increaseQuantity,
        decreaseQuantity,
        updateQuantity,

        clearCart,

        isInCart,
        getCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ============================================
// CUSTOM HOOK
// ============================================

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}