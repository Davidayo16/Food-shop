// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/Page Components/Restaurant Page Components/cartContext"; // Adjust path if needed

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quick Foods",
  description: "Get your grubs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-inter ${inter.className}`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}