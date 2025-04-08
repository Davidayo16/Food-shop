"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Logo from "../../public/logo.png";

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      {/* Top Bar */}
      <div className="bg-[#E8F3EA] w-full text-sm px-4 py-2">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <span className="text-center">+443574545</span>
          <div className="flex items-center gap-2 sm:gap-4 text-center">
            <span>Get 20% off selected food items</span>
            <Link href="/shop" className="text-[#FF4500] hover:underline">
              Shop Now
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <select className="bg-transparent text-sm border-none">
              <option>Eng</option>
            </select>
            <select className="bg-transparent text-sm border-none">
              <option>Location</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={50} height={40} className="h-8 w-8" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium">Home</Link>
          <Link href="/services" className="text-sm font-medium">Services</Link>
          <Link href="/location" className="text-sm font-medium">Location</Link>
          <Link href="/contact" className="text-sm font-medium">Contact</Link>
        </nav>

        {/* Right Section (Search, Cart, User) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input type="search" placeholder="Search food item" className="w-full pl-9" />
          </div>
          <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white">
                5
              </span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu (Slide-In) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg flex flex-col p-4">
            <Button variant="ghost" size="icon" className="self-end" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
            <nav className="mt-4 space-y-4">
              <Link href="/" className="block text-lg font-medium">Home</Link>
              <Link href="/services" className="block text-lg font-medium">Services</Link>
              <Link href="/location" className="block text-lg font-medium">Location</Link>
              <Link href="/contact" className="block text-lg font-medium">Contact</Link>
            </nav>
            <div className="mt-6 flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="search" placeholder="Search food item" className="w-full pl-9" />
              </div>
              <Button variant="outline">Login</Button>
              <Link href="/cart">
                <Button variant="outline" className="w-full flex justify-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart (5)
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
