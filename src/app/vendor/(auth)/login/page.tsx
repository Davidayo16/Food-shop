"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PendingVerificationAlert from "@/components/PendingVerificationAlert";
import { SiteHeader } from "@/components/site-header";

const VendorLoginPage = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPending, setShowPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShowPending(false); // Reset pending alert on new login attempt
  
    try {
      console.log("🔄 Checking if vendor is pending...");
      const pendingResponse = await fetch("https://app.quickfoodshop.co.uk/v1/dashboard/pending-vendors", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      const pendingData = await pendingResponse.json();
      console.log("📄 Pending Vendors List:", JSON.stringify(pendingData, null, 2));
  
      if (pendingResponse.ok && pendingData?.data) {
        const isPending = pendingData.data.some((vendor: any) => vendor.phoneNumber === formData.phoneNumber);
        if (isPending) {
          console.log("❌ Vendor is pending. Showing Pending Alert.");
          setShowPending(true);
          setLoading(false);
          return; // Stop login process here
        }
      }
  
      console.log("🟢 Vendor is not pending. Proceeding with login...");
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/vendor/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("🟡 Login Response Data:", JSON.stringify(data, null, 2));
  
      if (!response.ok) {
        if (data.message?.toLowerCase().includes("pending")) {
          console.log("⚠️ Backend confirmed vendor is pending.");
          setShowPending(true);
        } else {
          console.log("❌ Login failed:", data.message);
          setError(data.message || "Login failed. Please try again.");
        }
        return;
      }
  
      if (data.success && data.token) {
        console.log("✅ Login successful. Storing token and redirecting...");
        localStorage.setItem("authToken", data.token);
        router.push("/vendor/dashboard");
      } else {
        console.error("🚨 No token received!");
        setError("Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("🚨 Error during login:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <SiteHeader />
      <div className="min-h-screen w-full bg-white flex justify-center items-center">
        {showPending ? (
          <PendingVerificationAlert /> // Show pending verification alert after clicking login
        ) : (
          <div className="mx-auto max-w-xl px-4 py-8 bg-white shadow-lg rounded-lg">
            <h1 className="mb-2 text-center text-4xl font-semibold">Vendor Login</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={setFormData} />
              <InputField label="Password" name="password" value={formData.password} onChange={setFormData} type="password" />
              <Button type="submit" className="w-full bg-[#006634] text-white hover:bg-[#006634]/90" disabled={loading}>
                {loading ? "Loging in..." : "LOGIN"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

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
    />
  </div>
);

export default VendorLoginPage;
