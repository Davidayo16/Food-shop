"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function OnboardPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
  };

  const getSignupRoute = () => {
    switch (selectedRole) {
      case "order":
        return "/restaurants";
      case "customer":
        return "/signup";
      case "vendor":
        return "/vendor/signup";
      case "driver":
        return "/biker-dashboard/signup";
      default:
        return "#";
    }
  };

  const roles = [
    { key: "order", label: "Order Now" },
    { key: "customer", label: "Customer" },
    { key: "vendor", label: "Vendor" },
     { key: "driver", label: "Driver" },

  ];

  return (
    <div className="flex flex-col items-center w-full sm:w-auto md:w-1/2 lg:w-auto h-auto justify-center gap-5 border-2 border-[#C6E3E5] rounded-[30px] p-6">
      <h1 className="text-2xl font-bold mt-6 mb-8 text-center">How do you want to sign up?</h1>
      <div className="flex flex-wrap justify-center space-x-4 lg:space-x-6 lg:space-y-0 lg:flex-row">
        {roles.map(({ key, label }) => (
          <div
            key={key}
            className={`relative flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 border   lg:border-2 rounded-lg cursor-pointer transition-all 
              ${selectedRole === key ? "border-[#006634] bg-green-50" : "border-gray-200 bg-white"}`}
            onClick={() => handleRoleSelection(key)}
          >
            <span className="text-gray-700 font-medium text-sm sm:text-base">{label}</span>
            <img
              src={selectedRole === key ? "/check.png" : "/unchecked.png"}
              alt="Checkbox Icon"
              className="absolute top-2 right-2 w-5 h-5"
            />
          </div>
        ))}
      </div>
      <Link href={selectedRole ? getSignupRoute() : "#"}>
        <Button
          className={`mt-6 w-48 py-3 rounded-lg transition-all 
            ${selectedRole ? "bg-[#006634] text-white hover:bg-green-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          disabled={!selectedRole}
        >
          CONTINUE
        </Button>
      </Link>
    </div>
  );
}
