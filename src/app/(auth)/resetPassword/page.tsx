"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setEmail(params.get("email"));
      setOtp(params.get("otp"));
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "https://app.quickfoodshop.co.uk/v1/auth/reset-password",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp_token: otp, password }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 200);
      } else {
        setError("Failed to reset password.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-[100%] flex flex-col items-center justify-center ">
      <div className=" pt-20 px-10 p-10 rounded-lg border border-[#C6E3E5] w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 rounded-xl">Change New Password</h1>
        <p className="text-gray-600 mb-4 rounded-xl">Create a new password for your account.</p>

        {success ? (
          <div className="mt-4 p-4  text-[#374151] rounded-lg flex flex-col items-center">
           <svg width="143" height="142" viewBox="0 0 143 142" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_12419)">
<rect x="30.5" y="20" width="82" height="82" rx="41" fill="#006634"/>
</g>
<path d="M58.9727 61.569L67.7041 70.1107L85.1671 53.0273" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<filter id="filter0_d_1_12419" x="0.5" y="0" width="142" height="142" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="10"/>
<feGaussianBlur stdDeviation="15"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.25098 0 0 0 0 0.74902 0 0 0 0 1 0 0 0 0.24 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_12419"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_12419" result="shape"/>
</filter>
</defs>
</svg>

            <p>Password reset successful!</p>
            <Button
              onClick={() => router.push("/login")}
              className="mt-3 bg-[#006634] text-white"
            >
              Go to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <Input className="rounded-xl"
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              className="rounded-xl"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />  
            {error && (
              <div className="flex items-center bg-red-100 text-red-700 p-3 rounded-md">
                <AlertCircle className="w-5 h-5 mr-2" />
                <p>{error}</p>
              </div>
            )}
            <Button type="submit" className="w-full bg-[#006634] text-white py-2 rounded-md">
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
