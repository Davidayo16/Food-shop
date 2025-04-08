import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../../public/logo.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-[#082814] w-full py-2 px-4 md:px-8 flex items-center justify-between text-sm">
        <span className="text-[#FFFFFF]">+443574545</span>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-[#FFFFFF]">Get 20% off selected food items</span>
          <Link href="/shop" className="text-[#FFC859]">Shop Now</Link>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[#FFFFFF]">
          <select className="bg-transparent focus:outline-none">
            <option>Eng</option>
          </select>
          <select className="bg-transparent focus:outline-none">
            <option>Location</option>
          </select>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-fluid bg-[#F0FFF0] mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={Logo} alt="Logo" width={60} height={60} />
        </Link>

        {/* Icons (Responsive) */}
        <div className="flex items-center gap-6">
          {/* User Icon */}
          <Link href="/onboard">
          <Button variant="ghost" size="icon" className="flex items-center gap-1">
            <span className="hidden md:block text-xs text-gray-700">Account</span>
            <User className="h-5 w-5 text-gray-700" />
          </Button>
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" className="relative flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <span className="hidden md:block text-xs text-gray-700">Cart</span>
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white">
                5
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
