// src/components/site-header.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../../public/logo.png";
import { useUserStore } from "@/lib/user-store";
import { LoginSimulator } from "@/components/LoginSimulator";

export function SiteHeader() {
  const { user, loadUser } = useUserStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const accountLink = user?.role
    ? user.role === "admin"
      ? "/admin/dashboard"
      : user.role === "vendor"
      ? "/vendor/dashboard"
      : user.role === "customer"
      ? "/dashboard/customer"
      : user.role === "biker"
      ? "/biker-dashboard/app"
      : "/onboard"
    : "/onboard";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
      <div className="bg-[#082814] w-full py-2 px-4 md:px-8 flex items-center justify-between text-sm">
        <span className="text-[#FFFFFF]">+443574545</span>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-[#FFFFFF]">Get 20% off selected food items</span>
          <Link href="/shop" className="text-[#FFC859]">
            Shop Now
          </Link>
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
      <div className="container-fluid bg-[#F0FFF0] mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        <Link href="/" className="flex items-center">
          <Image src={Logo} alt="Logo" width={60} height={60} />
        </Link>
        <div className="flex items-center gap-6 md:gap-10">
          <Link href={accountLink}>
            <Button variant="ghost" size="icon" className="flex items-center gap-1">
              {user ? (
                <>
                  {/* <span className="hidden md:block text-xs text-gray-700">{user.name}</span> */}
                  <div className="w-5 h-5 rounded-full p-4 bg-gray-300 flex items-center justify-center">
                    <span className="text-xs text-gray-700">{user.name?.[0].toUpperCase()}</span>
                  </div>
                </>
              ) : (
                <>
                  <span className="hidden md:block text-xs text-gray-700">Sign up</span>
                  <User className="h-5 w-5 text-gray-700" />
                </>
              )}
            </Button>
          </Link>
          <Link href="/cart" className="relative flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <span className="hidden md:block text-xs text-gray-700">Cart</span>
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white">
                5
              </span>
            </Button>
          </Link>
          <LoginSimulator />
        </div>
      </div>
    </header>
  );
}