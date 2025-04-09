// app/biker-dashboard/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Adjust the path if needed
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers"; // Adjust the path if needed
import { SidebarWrapper } from "../components/SidebarWrapper"; // Adjust the path if needed

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickFoodShop",
  description: "Food delivery dashboard for bikers",
  generator: "v0.dev",
};

export default function BikerDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <Providers>
        <SidebarWrapper>{children}</SidebarWrapper>
        <Toaster />
      </Providers>
    // </ThemeProvider>
  );
}