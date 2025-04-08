"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SignUpSuccess({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-sm">
        <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Account Created</h2>
        <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
        <Button
          className="w-full bg-[#006634] text-white py-2 rounded-md text-lg"
          asChild
        >
          <Link href="/login">GO TO LOGIN</Link>
        </Button>
      </div>
    </div>
  );
}
