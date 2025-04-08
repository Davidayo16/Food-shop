"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Import Next.js router
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter(); // ✅ Initialize router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/auth/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);

        // ✅ Redirect to OTP page with email in query params
        setTimeout(() => {
          router.push(`/otp?email=${email}`);
        }, 2000); // Delay for better UX
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-white gap-10 p-6 rounded-lg shadow-md border border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
        <p className="text-gray-600 mb-4">Enter your registered email below</p>

        {success ? (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
            <p>OTP has been sent to your email. Redirecting...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Email address</label>
              <Input
                type="email"
                placeholder="Eg namaemail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full border-gray-300 rounded-md"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="text-gray-600 text-sm">
              Remember the password? {' '}
              <Link href="/login" className="text-green-600 hover:underline">
                Sign in
              </Link>
            </p>
            <Button type="submit" className="w-full mt-10 bg-[#006634] hover:bg-[#006624]/200 text-white py-2 rounded-md" disabled={loading}>
              {loading ? "Sending..." : "SEND LINK"}
            </Button>
          </form>
        )}
      </div>
    </div>  );
}
