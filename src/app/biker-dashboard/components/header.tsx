"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSidebar } from "../context/SidebarContext";

interface HeaderProps {
  username: string;
}

export function Header({ username }: HeaderProps) {
  const [notifications, setNotifications] = useState(2);
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  const handleNotificationsClick = () => {
    router.push("/notifications");
  };

  return (
    <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between p-2 sm:p-4 border-b">
      {/* Left Section: Hamburger Menu and Greeting */}
      <div className="flex items-center gap-2 mb-2 xs:mb-0 w-full xs:w-auto">
        {/* Hamburger Menu (visible on small screens) */}
        <Button
          id="hamburger-button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>

        {/* Greeting */}
        <div className="truncate">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate">Welcome back, {username}!</h1>
          <p className="text-gray-500 text-xs sm:text-sm hidden xs:block">See what's happening with your store today!</p>
        </div>
      </div>

      {/* Right Section: Buttons */}
      <div className="flex items-center gap-1 sm:gap-2 self-end xs:self-auto">
        <Button variant="outline" size="icon" className="rounded-full h-8 w-8 sm:h-9 sm:w-9">
          <Search className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="sr-only">Search</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8 sm:h-9 sm:w-9 relative"
          onClick={handleNotificationsClick}
        >
          <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
          {notifications > 0 && <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />}
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full flex items-center gap-1 sm:gap-2 h-8 sm:h-9 px-1 sm:px-2">
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>TM</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm">Tobi Makinde</span>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}