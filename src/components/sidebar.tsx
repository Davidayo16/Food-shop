"use client"; // Ensure this component runs in the client

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../../public/logo.png";
import User from "../../public/user.png";
import {
  LayoutDashboard,
  ShoppingCart,
  Receipt,
  FileText,
  MapPin,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type React from "react";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Transactions", href: "/dashboard/transactions", icon: Receipt },
  { name: "Invoice", href: "/dashboard/invoice", icon: FileText },
  { name: "Tracking", href: "/dashboard/tracking", icon: MapPin },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Support", href: "/dashboard/support", icon: HelpCircle },
];

export function SidebarMenu({ className }: SidebarProps) {
  const pathname = usePathname(); // ✅ Corrected to usePathname for App Router

  return (
    <div className={cn("flex h-screen w-[240px] flex-col border-r bg-white", className)}>
      <div className="p-6">
        <Image src={Logo} alt="Logo" width={40} height={40} className="h-10 w-10" />
      </div>
      <div className="flex-1 space-y-1 px-3">
        {menuItems.map(({ name, href, icon: Icon }) => (
          <Link key={href} href={href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                pathname === href ? "bg-green-500 text-white" : "text-gray-700"
              )}
            >
              <Icon className="h-5 w-5" />
              {name}
            </Button>
          </Link>
        ))}
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 px-2 py-3">
          <Image src={User} alt="User" width={30} height={30} className="h-10 w-10 rounded-full" />
          <div>
            <p className="font-medium">Tobi Makinde</p>
            <p className="text-sm text-gray-500">Customer</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start gap-2 text-red-500">
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
