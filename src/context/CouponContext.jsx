"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CouponContext = createContext(null);

/*
|--------------------------------------------------------------------------
| Available Coupons
|--------------------------------------------------------------------------
*/

const COUPONS = [
  {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minimumAmount: 50,
  },
  {
    code: "SAVE20",
    type: "percentage",
    value: 20,
    minimumAmount: 100,
  },
  {
    code: "FLAT15",
    type: "fixed",
    value: 15,
    minimumAmount: 75,
  },
  {
    code: "MARKETX25",
    type: "fixed",
    value: 25,
    minimumAmount: 150,
  },
];

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
*/

export function CouponProvider({ children }) {
  const [coupon, setCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Load saved coupon
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const savedCoupon =
      localStorage.getItem("marketx_coupon");

    if (savedCoupon) {
      try {
        const parsedCoupon =
          JSON.parse(savedCoupon);

        setCoupon(parsedCoupon);

        setCouponCode(
          parsedCoupon.code || ""
        );
      } catch (error) {
        console.error(
          "Failed to load coupon:",
          error
        );

        localStorage.removeItem(
          "marketx_coupon"
        );
      }
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Apply Coupon
  |--------------------------------------------------------------------------
  */

  const applyCoupon = (code, subtotal) => {
    const normalizedCode = code
      .trim()
      .toUpperCase();

    if (!normalizedCode) {
      return {
        success: false,
        message: "Please enter a coupon code.",
      };
    }

    const foundCoupon = COUPONS.find(
      (item) =>
        item.code === normalizedCode
    );

    if (!foundCoupon) {
      return {
        success: false,
        message: "Invalid coupon code.",
      };
    }

    if (
      Number(subtotal) <
      Number(foundCoupon.minimumAmount)
    ) {
      return {
        success: false,
        message: `Minimum order amount is $${foundCoupon.minimumAmount}.`,
      };
    }

    const couponData = {
      ...foundCoupon,
    };

    setCoupon(couponData);

    setCouponCode(foundCoupon.code);

    localStorage.setItem(
      "marketx_coupon",
      JSON.stringify(couponData)
    );

    return {
      success: true,
      message: "Coupon applied successfully!",
      coupon: couponData,
    };
  };

  /*
  |--------------------------------------------------------------------------
  | Remove Coupon
  |--------------------------------------------------------------------------
  */

  const removeCoupon = () => {
    setCoupon(null);
    setCouponCode("");

    localStorage.removeItem(
      "marketx_coupon"
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Calculate Discount
  |--------------------------------------------------------------------------
  */

  const calculateDiscount = (subtotal) => {
    if (!coupon) {
      return 0;
    }

    const amount = Number(subtotal);

    if (amount < coupon.minimumAmount) {
      return 0;
    }

    if (coupon.type === "percentage") {
      return (
        (amount * coupon.value) / 100
      );
    }

    if (coupon.type === "fixed") {
      return Math.min(
        coupon.value,
        amount
      );
    }

    return 0;
  };

  return (
    <CouponContext.Provider
      value={{
        coupon,
        couponCode,
        setCouponCode,
        applyCoupon,
        removeCoupon,
        calculateDiscount,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

/*
|--------------------------------------------------------------------------
| Hook
|--------------------------------------------------------------------------
*/

export function useCoupon() {
  const context =
    useContext(CouponContext);

  if (!context) {
    throw new Error(
      "useCoupon must be used inside CouponProvider"
    );
  }

  return context;
}