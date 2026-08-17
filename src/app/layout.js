import "./globals.css";

import "./globals.css";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { ReviewProvider } from "../context/ReviewContext";
import { OrderProvider } from "@/context/OrderContext";
import { CouponProvider } from "@/context/CouponContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>

          <WishlistProvider>

            <ReviewProvider>

              <OrderProvider>

                <CouponProvider>


                <Navbar />
                  {children}

                <Footer />
               </CouponProvider>
               
              </OrderProvider>

            </ReviewProvider>

          </WishlistProvider>

        </CartProvider>
      </body>
    </html>
  );
}