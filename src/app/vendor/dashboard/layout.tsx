import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/vendor/components/app-sidebar";
import { Input } from "@/app/admin/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <h1 className="text-2xl font-semibold">Welcome back, Femi!</h1>
            <p className="text-gray-500">
              See what's happening with your store today!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative rounded-[0]">
              <Search className="absolute left-3 top-1/2  -translate-y-1/2 text-gray-500" />
              <Input  className="w-[0px] pl-9 " />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <img
                src="/user.png"
                alt="Avatar"
                className="rounded-full"
              />
            </Button>
          </div>
        </header>
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
