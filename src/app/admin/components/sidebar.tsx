"use client"; // Ensure this component runs in the client

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import Logo from "../../public/logo.png";
// import User from "../../public/user.png";
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
const logo = "/logo.png";
const userSrc = "/user.png";


type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Vendors", href: "/admin/dashboard/vendors", icon: ShoppingCart },
  { name: "Orders", href: "/admin/dashboard/Orders", icon: HelpCircle },
  { name: "Transactions", href: "/admin/dashboard/transactions", icon: HelpCircle },
  { name: "Invoice", href: "/admin/dashboard/invoice", icon: HelpCircle },
  { name: "Tracking", href: "/admin/dashboard/trackings", icon: Settings },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
  { name: "Support", href: "/admin/dashboard/support", icon: HelpCircle },
];

export function SidebarMenu({ className }: SidebarProps) {
  const pathname = usePathname(); // ✅ Corrected to usePathname for App Router

  return (
    <div className={cn("flex h-screen w-[240px] flex-col border-r bg-white", className)}>
      <div className="p-6">
        <Image src={logo} alt="Logo" width={40} height={40} className="h-10 w-10" />
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
        <Button variant="ghost" className="w-full justify-start gap-2 text-red-500">
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
} 
