"use client"

import type React from "react"
import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  ClipboardList,
  PackageCheck,
  BarChart3,
  MapPin,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSidebar } from "../context/SidebarContext"

interface SidebarProps {
  onClose: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()
  const { setIsSidebarOpen } = useSidebar();

  const routes = [
    {
      name: "Dashboard",
      path: "/biker-dashboard/app",
      icon: LayoutGrid,
    },
    {
      name: "Requests",
      path: "/biker-dashboard/app/requests",
      icon: ClipboardList,
    },
    {
      name: "Orders",
      path: "/biker-dashboard/app/orders",
      icon: PackageCheck,
    },
    {
      name: "Transactions",
      path: "/biker-dashboard/app/transactions",
      icon: BarChart3,
    },
    {
      name: "Tracking",
      path: "/biker-dashboard/app/tracking",
      icon: MapPin,
    },
    {
      name: "Withdrawal",
      path: "/biker-dashboard/app/withdrawal",
      icon: Wallet,
    },
    {
      name: "Settings",
      path: "/biker-dashboard/app/settings",
      icon: Settings,
    },
    {
      name: "Support",
      path: "/biker-dahboard/app/support",
      icon: HelpCircle,
    },
  ]

  // Handle navigation click - close sidebar on mobile when navigating
  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 sm:p-4 border-b flex justify-between items-center">
        {/* <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10">
            <div className="absolute inset-0 bg-green-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">QFS</span>
            </div>
          </div>
          <span className="font-bold text-green-600 text-base sm:text-lg hidden xs:inline">QUICKFOODSHOP</span>
        </Link> */}
          <Link href="/" className="flex items-center">
          <Image src='/logo.png' alt="Logo" width={60} height={60} />
        </Link>
        
        {/* Close button - only visible on mobile */}
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onClose}
          className="md:hidden rounded-full hover:bg-gray-100 hover:text-red-500 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
      
      <div className="flex-1 py-2 sm:py-4 space-y-1 overflow-y-auto">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            onClick={handleNavClick}
            className={cn(
              "flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 mx-1 sm:mx-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-sm sm:text-base",
              pathname === route.path && "bg-green-800 text-white font-medium",
            )}
          >
            <route.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{route.name}</span>
          </Link>
        ))}
      </div>
      
      <div className="p-3 sm:p-4 border-t">
        <div className="flex items-center justify-between bg-gray-50 p-2 rounded-full mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>TM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium">Tobi Makinde</span>
              <span className="text-xs text-gray-500 hidden xs:inline">Customer</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-green-600 text-white h-5 w-5 sm:h-6 sm:w-6">
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
        <Button variant="ghost" className="w-full justify-start text-orange-500 gap-2 text-sm sm:text-base">
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
          Log Out
        </Button>
      </div>
    </div>
  )
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}