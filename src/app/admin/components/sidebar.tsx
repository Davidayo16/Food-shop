// src/components/SidebarMenu.tsx
"use client"; // Ensure this component runs in the client

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
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
import { useUserStore } from "@/lib/user-store";
import type React from "react";

const logo = "/logo.png";
const userSrc = "/user.png"; // Not used, kept for consistency

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Vendors", href: "/admin/dashboard/vendors", icon: ShoppingCart },
  { name: "Orders", href: "/admin/dashboard/Orders", icon: HelpCircle },
  { name: "Transactions", href: "/admin/dashboard/tracking/transactions", icon: HelpCircle },
  { name: "Invoice", href: "/admin/dashboard/invoice", icon: HelpCircle },
  { name: "Tracking", href: "/admin/dashboard/tracking/transactions", icon: Settings },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
  { name: "Support", href: "/admin/dashboard/support", icon: HelpCircle },
];

export function SidebarMenu({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { clearUser } = useUserStore();

  const handleLogout = () => {
    clearUser();
    router.push("/onboard");
  };

  return (
    <div className={cn("flex h-screen w-[240px] flex-col border-r bg-white", className)}>
      <div className="p-6">
        <Link href="/">
          <Image src={logo} alt="Logo" width={40} height={40} className="h-10 w-10" />
        </Link>
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
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
}