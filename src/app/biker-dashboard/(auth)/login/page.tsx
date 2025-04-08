// app/driver/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PendingVerificationAlert from "@/components/PendingVerificationAlert";
import { SiteHeader } from "@/components/site-header";
import { useUserStore } from "@/lib/user-store"; // Import to set user role

const DriverLoginPage = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPending, setShowPending] = useState(false);
  const router = useRouter();
  const { login } = useUserStore(); // Get login function from store

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShowPending(false);

    try {
      // Simulate API call (no backend yet)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay

      // Mock pending verification check (optional)
      const mockPendingDrivers = ["1234567890"]; // Example phone numbers that are "pending"
      if (mockPendingDrivers.includes(formData.phoneNumber)) {
        console.log("❌ Driver is pending. Showing Pending Alert.");
        setShowPending(true);
        setLoading(false);
        return;
      }

      // Simulate successful login
      console.log("🟢 Driver login successful:", formData);
      const mockToken = "mock-driver-token-12345";
      localStorage.setItem("authToken", mockToken);

      // Set user role in store (assuming firstName can be derived or mocked)
      login("biker", "Driver " + formData.phoneNumber.slice(-4)); // Mock name from phone number

      router.push("/dashboard/biker");
    } catch (error) {
      console.error("🚨 Mock error during login:", error);
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
          <PendingVerificationAlert /> // Reuse your alert component
        ) : (
          <div className="mx-auto max-w-xl px-4 py-8 bg-white shadow-lg rounded-lg">
            <h1 className="mb-2 text-center text-4xl font-semibold">Driver Login</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={setFormData}
              />
              <InputField
                label="Password"
                name="password"
                value={formData.password}
                onChange={setFormData}
                type="password"
              />
              <Button
                type="submit"
                className="w-full bg-[#006634] text-white hover:bg-[#006634]/90"
                disabled={loading}
              >
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

export default DriverLoginPage;