// components/LoginSimulator.tsx
"use client";

import { useState } from "react";
import { useUserStore } from "@/lib/user-store";
import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react"; // Using lucide-react for a stylish icon

export function LoginSimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, login, logout } = useUserStore();

  return (
    <div className="relative font-inter">
      {/* Trigger Icon */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#006634] hover:text-[#006634]/80 hover:bg-[#F0FFF0] rounded-full p-2 transition-colors duration-200"
      >
        <UserCircle2 className="h-5 w-5" />
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed top-30 right-4 z-50 w-70 bg-white rounded-lg shadow-xl border border-gray-100 p-4 animate-fade-in">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#1A1A1A] text-center">
              {user ? "User Session" : "Demo Login"}
            </h4>
            {user ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-700 text-center">
                  Logged in as <span className="font-medium text-[#006634]">{user.name}</span> ({user.role})
                </p>
                <Button
                  onClick={() => {
                    logout();
                    setIsOpen(false); // Close modal on logout
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600]/10 rounded-full transition-all duration-200"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
            
                <Button
                  onClick={() => {
                    login("biker", "Bob");
                    setIsOpen(false); // Close modal on login
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full border-[#006634] text-[#006634] hover:bg-[#006634]/10 rounded-full transition-all duration-200"
                >
                  Driver
                </Button>
                <Button
                  onClick={() => {
                    login("vendor", "Charlie");
                    setIsOpen(false); // Close modal on login
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full border-[#006634] text-[#006634] hover:bg-[#006634]/10 rounded-full transition-all duration-200"
                >
                  Vendor
                </Button>
              </div>
            )}
          </div>
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-400">*Demo tool for testing</p>
          </div>
        </div>
      )}
    </div>
  );
}