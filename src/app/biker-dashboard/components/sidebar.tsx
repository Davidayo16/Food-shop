"use client"

import type React from "react"

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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutGrid,
    },
    {
      name: "Requests",
      path: "/requests",
      icon: ClipboardList,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: PackageCheck,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: BarChart3,
    },
    {
      name: "Tracking",
      path: "/tracking",
      icon: MapPin,
    },
    {
      name: "Withdrawal",
      path: "/withdrawal",
      icon: Wallet,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
    {
      name: "Support",
      path: "/support",
      icon: HelpCircle,
    },
  ]

  return (
    <div className="w-60 border-r bg-white flex flex-col h-screen">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-green-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">QFS</span>
            </div>
          </div>
          <span className="font-bold text-green-600 text-lg">QUICKFOODSHOP</span>
        </Link>
      </div>
      <div className="flex-1 py-4 space-y-1">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors",
              pathname === route.path && "bg-green-800 text-white font-medium",
            )}
          >
            <route.icon className="w-5 h-5" />
            <span>{route.name}</span>
          </Link>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center justify-between bg-gray-50 p-2 rounded-full mb-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>TM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Tobi Makinde</span>
              <span className="text-xs text-gray-500">Customer</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-green-600 text-white h-6 w-6">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" className="w-full justify-start text-orange-500 gap-2">
          <LogOut className="h-5 w-5" />
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

