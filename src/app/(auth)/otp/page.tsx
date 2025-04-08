"use client"; 

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

function OtpVerificationContent() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array for 6-digit OTP input
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  useEffect(() => {
    if (!email) router.push("/forgotPassword");
  }, [email, router]);

  // Handle OTP input change
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only keep last digit
    setOtp(newOtp);

    // Move to the next input if a digit is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    router.push(`/resetPassword?email=${email}&otp=${enteredOtp}`);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* OTP Icon */}
        <div className="flex justify-center mb-4">
        <svg width="82" height="82" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.7474 30.7539L46.1224 41.0039L61.4974 30.7539M10.2474 46.1289H17.0807M3.41406 35.8789H17.0807" stroke="#23C55E" stroke-width="5.125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.082 25.6276V23.9193C17.082 22.107 17.802 20.3689 19.0835 19.0874C20.365 17.8059 22.1031 17.0859 23.9154 17.0859H68.332C70.1443 17.0859 71.8824 17.8059 73.1639 19.0874C74.4454 20.3689 75.1654 22.107 75.1654 23.9193V58.0859C75.1654 59.8982 74.4454 61.6363 73.1639 62.9178C71.8824 64.1993 70.1443 64.9193 68.332 64.9193H23.9154C22.1031 64.9193 20.365 64.1993 19.0835 62.9178C17.802 61.6363 17.082 59.8982 17.082 58.0859V56.3776" stroke="#23C55E" stroke-width="5.125" stroke-linecap="round"/>
</svg>

        </div>

        <h1 className="text-2xl font-bold text-gray-800">Check Mail for OTP</h1>
        <p className="text-gray-600 mb-4">Enter the code sent to your email here. <strong>{email}</strong></p>

        {/* OTP Input */}
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 focus:border-[#9CA3AF] focus:ring-2 focus:ring-[#006634] rounded-md transition"
              />
            ))}
           
          </div>

          {/* Verify Button */}
          <p>Resend in 0:59</p>
          <Button 
            type="submit" 
            className="w-full bg-[#9CA3AF] text-white py-2 rounded-md hover:bg-[#006634] transition"
          >
            Verify OTP
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default function OtpVerification() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpVerificationContent />
    </Suspense>
  );
}
