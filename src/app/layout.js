import "./globals.css";
import Navbar from './components/layout/Navbar';

export const metadata = {
  title: "MarketX - Online Shopping",
  description: "Shop the latest products at MarketX",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}
      </body>
    </html>
  );
}