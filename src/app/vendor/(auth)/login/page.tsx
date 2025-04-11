// src/pages/VendorLoginPage.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PendingVerificationAlert from "@/components/PendingVerificationAlert";
import { SiteHeader } from "@/components/site-header";
import { useUserStore } from "@/lib/user-store";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  id?: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

const VendorLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "", // Changed from phoneNumber
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
    setShowPending(false);

    try {
      // Check pending vendors using email
      const pendingResponse = await fetch("https://app.quickfoodshop.co.uk/v1/dashboard/pending-vendors", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const pendingData = await pendingResponse.json();

      if (pendingResponse.ok && pendingData?.data) {
        const isPending = pendingData.data.some((vendor: any) => vendor.email === formData.email); // Changed to email
        if (isPending) {
          setShowPending(true);
          setLoading(false);
          return;
        }
      }

      // Login request using email
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/vendor/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Now sends { email, password }
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message?.toLowerCase().includes("pending")) {
          setShowPending(true);
        } else {
          setError(data.message || "Login failed. Please try again.");
        }
        return;
      }

      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token);
        const decoded: CustomJwtPayload = jwtDecode(data.token);
        useUserStore.getState().setUser({
          name: decoded.email ? decoded.email.split("@")[0] : "Vendor", // Extract name from email
          role: decoded.role ? decoded.role.toLowerCase() : "vendor",
        });
        router.push("/vendor/dashboard");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("Vendor: Login error:", error);
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
          <PendingVerificationAlert />
        ) : (
          <div className="mx-auto max-w-xl px-4 py-8 bg-white shadow-lg rounded-lg">
            <h1 className="mb-2 text-center text-4xl font-semibold">Vendor Login</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField label="Email" name="email" value={formData.email} onChange={setFormData} /> {/* Changed to Email */}
              <InputField label="Password" name="password" value={formData.password} onChange={setFormData} type="password" />
              <Button type="submit" className="w-full bg-[#006634] text-white hover:bg-[#006634]/90" disabled={loading}>
                {loading ? "Logging in..." : "LOGIN"}
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