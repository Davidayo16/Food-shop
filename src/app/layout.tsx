import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/Page Components/Restaurant Page Components/cartContext"; // Import your cart context

export const metadata: Metadata = {
  title: "Quick Foods",
  description: "Get your grubs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-inter">
        <CartProvider> {/* Wrap your app with CartProvider */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
