// components/SidebarWrapper.tsx
"use client";

import React, { useEffect } from "react";
import { Sidebar } from "./sidebar";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

function SidebarWrapperContent({ children }: SidebarWrapperProps) {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const sidebar = document.getElementById('mobile-sidebar');
      const hamburgerButton = document.getElementById('hamburger-button');
      
      if (sidebar && 
          !sidebar.contains(event.target as Node) && 
          hamburgerButton && 
          !hamburgerButton.contains(event.target as Node) &&
          isSidebarOpen && 
          window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen, setIsSidebarOpen]);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar - fixed position on mobile, static on desktop */}
      <div
        id="mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Dark overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content - always full width */}
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}

export function SidebarWrapper({ children }: SidebarWrapperProps) {
  return (
    <SidebarProvider>
      <SidebarWrapperContent>{children}</SidebarWrapperContent>
    </SidebarProvider>
  );
}