"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const OrderContext = createContext(null);

const STORAGE_KEY = "marketx-orders";

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load orders
  useEffect(() => {
    try {
      const savedOrders =
        localStorage.getItem(STORAGE_KEY);

      if (!savedOrders) {
        setOrders([]);
        setLoaded(true);
        return;
      }

      const parsedOrders =
        JSON.parse(savedOrders);

      if (Array.isArray(parsedOrders)) {
        setOrders(parsedOrders);
      } else {
        localStorage.removeItem(
          STORAGE_KEY
        );

        setOrders([]);
      }
    } catch (error) {
      console.error(
        "Failed to load orders:",
        error
      );

      localStorage.removeItem(
        STORAGE_KEY
      );

      setOrders([]);
    }

    setLoaded(true);
  }, []);

  // Save orders
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(orders)
      );
    } catch (error) {
      console.error(
        "Failed to save orders:",
        error
      );
    }
  }, [orders, loaded]);

  // Create order
  const createOrder = ({
    items,
    customer,
    shipping,
    paymentMethod,
    subtotal,
    shippingCost,
    total,
  }) => {
    const order = {
      id: `MX-${Date.now()}`,

      items,

      customer,

      shipping,

      paymentMethod,

      subtotal,

      shippingCost,

      total,

      status: "Processing",

      createdAt:
        new Date().toISOString(),
    };

    setOrders((previousOrders) => [
      order,
      ...previousOrders,
    ]);

    return order;
  };

  // Get single order
  const getOrder = (orderId) => {
    return orders.find(
      (order) =>
        order.id === orderId
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context =
    useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrders must be used inside OrderProvider"
    );
  }

  return context;
}