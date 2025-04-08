"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Google from "../../../../public/ic_google.png";
import { useRouter } from "next/navigation";
import { Mail, CheckCircle } from "lucide-react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup Successful:", data);
        setShowOtpVerification(true);
      } else {
        setError(data.message || "Signup failed, please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center px-4">
      {showOtpVerification ? (
        <OtpVerification email={formData.email} />
      ) : (
        <div className="w-full max-w-lg  p-6 bg-white rounded-lg shadow-lg">
          <h1 className="mt-4 text-center  text-3xl font-semibold">Create Account</h1>
          <p className="mb-6 text-center">
            Already have an account? {" "}
            <Link href="/login" className="text-[#FFA84A] hover:underline">
              Login
            </Link>
          </p>  
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField label="First Name" name="firstName" value={formData.firstName} onChange={setFormData} />
              <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={setFormData} />
            </div>
            <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={setFormData} type="tel" />
            <InputField label="Email" name="email" value={formData.email} onChange={setFormData} type="email" />
            <InputField label="Password" name="password" value={formData.password} onChange={setFormData} type="password" />
            
            <div className="flex flex-col gap-4">
              <Button type="submit" className="h-12 w-full bg-[#006634] text-white text-base font-semibold hover:bg-[#006634]/90" disabled={loading}>
                {loading ? "Creating Account..." : "CREATE ACCOUNT"}
              </Button>
              <Button variant="outline" className="h-12 w-full bg-white text-base font-semibold flex items-center justify-center border">
                <Image src={Google} alt="Google" width={20} height={20} className="mr-2" />
                Signup with Google
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    <Input 
      name={name} 
      type={type} 
      placeholder={label} 
      value={value} 
      onChange={(e) => onChange((prev) => ({ ...prev, [name]: e.target.value }))} 
      required 
      className="w-full p-2 border rounded-md"
    />
  </div>
);


// ✅ OTP Verification Component (Unchanged)
const OtpVerification = ({ email }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // ✅ Initialize router

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp_token: otp.join("") }),
      });

      const data = await response.json();
      if (response.ok) {
        // ✅ Redirect to Signup Success Page
        router.push("/SignupSuccessful");

      } else {
        setError(data.message || "Invalid OTP, please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8 bg-white shadow-lg rounded-lg text-center">
      <svg width="82" height="82" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
<path d="M30.7474 30.7539L46.1224 41.0039L61.4974 30.7539M10.2474 46.1289H17.0807M3.41406 35.8789H17.0807" stroke="#23C55E" strokeWidth="5.125" strokeLinecap="round" stroke-linejoin="round"/>
<path d="M17.082 25.6276V23.9193C17.082 22.107 17.802 20.3689 19.0835 19.0874C20.365 17.8059 22.1031 17.0859 23.9154 17.0859H68.332C70.1443 17.0859 71.8824 17.8059 73.1639 19.0874C74.4454 20.3689 75.1654 22.107 75.1654 23.9193V58.0859C75.1654 59.8982 74.4454 61.6363 73.1639 62.9178C71.8824 64.1993 70.1443 64.9193 68.332 64.9193H23.9154C22.1031 64.9193 20.365 64.1993 19.0835 62.9178C17.802 61.6363 17.082 59.8982 17.082 58.0859V56.3776" stroke="#23C55E" stroke-width="5.125" stroke-linecap="round"/>
</svg>

      <h2 className="text-2xl font-semibold mb-4">Check your Email</h2>
      <p className="text-gray-600 mb-4">A verification code has been sent to your email.</p>
      
      <div className="flex justify-center space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            className="border w-10 h-12 text-center text-xl"
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
          />
        ))}
      </div>
      
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      
      <Button className="mt-4 bg-[#006634] text-white w-full" onClick={handleVerifyOtp} disabled={loading}>
        {loading ? "Verifying..." : "CONFIRM"}
      </Button>
      </div>
    

  );
};
