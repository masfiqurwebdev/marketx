import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-10 bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-[1500px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-white"
            >
              Market<span className="text-emerald-400">X</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Your one-stop destination for quality products,
              great prices, and an amazing shopping experience.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex gap-3">
              <SocialIcon>
                <FaFacebookF size={15} />
              </SocialIcon>

              <SocialIcon>
                <FaInstagram size={17} />
              </SocialIcon>

              <SocialIcon>
                <FaTwitter size={16} />
              </SocialIcon>

              <SocialIcon>
                <FaYoutube size={17} />
              </SocialIcon>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-white">
              Shop
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <FooterLink href="/shop">
                All Products
              </FooterLink>

              <FooterLink href="/deals">
                Flash Deals
              </FooterLink>

              <FooterLink href="/categories/electronics">
                Electronics
              </FooterLink>

              <FooterLink href="/categories/fashion">
                Fashion
              </FooterLink>

              <FooterLink href="/categories/home-kitchen">
                Home & Kitchen
              </FooterLink>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-white">
              Customer Service
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <FooterLink href="/contact">
                Contact Us
              </FooterLink>

              <FooterLink href="/shipping">
                Shipping Info
              </FooterLink>

              <FooterLink href="/returns">
                Returns & Refunds
              </FooterLink>

              <FooterLink href="/faq">
                FAQ
              </FooterLink>

              <FooterLink href="/track-order">
                Track Order
              </FooterLink>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white">
              Company
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <FooterLink href="/about">
                About Us
              </FooterLink>

              <FooterLink href="/privacy">
                Privacy Policy
              </FooterLink>

              <FooterLink href="/terms">
                Terms & Conditions
              </FooterLink>

              <FooterLink href="/careers">
                Careers
              </FooterLink>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} MarketX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block transition hover:text-emerald-400"
    >
      {children}
    </Link>
  );
}

function SocialIcon({ children }) {
  return (
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-gray-400 transition hover:bg-emerald-500 hover:text-white"
    >
      {children}
    </button>
  );
}