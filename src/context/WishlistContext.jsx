"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedWishlist =
        localStorage.getItem("marketx-wishlist");

      if (savedWishlist) {
        const parsedWishlist =
          JSON.parse(savedWishlist);

        if (Array.isArray(parsedWishlist)) {
          setWishlist(parsedWishlist);
        }
      }
    } catch (error) {
      console.error(
        "Wishlist loading error:",
        error
      );
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        "marketx-wishlist",
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error(
        "Wishlist saving error:",
        error
      );
    }
  }, [wishlist, loaded]);

  const addToWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentWishlist;
      }

      return [
        ...currentWishlist,
        product,
      ];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) => item.id !== productId
      )
    );
  };

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [
        ...currentWishlist,
        product,
      ];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}