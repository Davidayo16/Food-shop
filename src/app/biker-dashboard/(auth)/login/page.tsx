// app/driver/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import Image from "next/image";
import { useUserStore } from "@/lib/user-store"; // Import to set user role
import PendingVerificationAlert from "@/components/PendingVerificationAlert";
import { Chrome } from "lucide-react"; // Using lucide-react for the Google icon

const DriverLoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
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
      if (mockPendingDrivers.includes(formData.emailOrUsername)) {
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
      login("biker", "Driver " + formData.emailOrUsername.slice(-4)); // Mock name from email/username

      router.push("/dashboard/biker");
    } catch (error) {
      console.error("🚨 Mock error during login:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Simulate Google login (no backend yet)
    console.log("🟢 Simulating Google login...");
    // In a real app, this would redirect to Google OAuth or trigger a Google Sign-In flow
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Use the existing SiteHeader */}
      <SiteHeader />

      {/* Outer Container for Spacing */}
      <div className="m-4 md:m-8">
        {/* Inner Container */}
        <div className="flex flex-col md:flex-row rounded-lg bg-[#003A1F] p-4 md:p-8">
          {/* Left Side - Image */}
          <div className="hidden md:block w-full md:w-1/2 rounded-t-lg md:rounded-t-none md:rounded-l-lg overflow-hidden">
            <Image
              src="/login.png" // Same image as signup page
              alt="Chef with RAW & FRESH background"
              width={600} // Adjust based on your image dimensions
              height={800} // Adjust based on your image dimensions
              className="w-full h-full object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 flex justify-center p-4 md:p-4">
            <div className="max-w-md w-full  rounded-lg">
              {showPending ? (
                <PendingVerificationAlert /> // Reuse your alert component
              ) : (
                <>
                  {/* Form Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Driver Login</h2>
                  <p className="text-xs md:text-sm text-white mb-6">
                    Don’t have an account?{" "}
                    <a href="/driver/signup" className="text-[#F97316] font-semibold">
                      Sign Up
                    </a>
                  </p>

                  {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                      <label className="block text-white text-xs md:text-sm mb-1">Email or Username</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-gray-300 rounded-full"></span>
                        <input
                          name="emailOrUsername"
                          type="text"
                          placeholder="Email or Username"
                          value={formData.emailOrUsername}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, emailOrUsername: e.target.value }))
                          }
                          className="w-full pl-10 p-2 md:p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006634] text-black placeholder:text-xs md:placeholder:text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white text-xs md:text-sm mb-1">Password</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-gray-300 rounded-full"></span>
                        <input
                          name="password"
                          type="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, password: e.target.value }))
                          }
                          className="w-full pl-10 p-2 md:p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006634] text-black placeholder:text-xs md:placeholder:text-sm"
                          required
                        />
                      </div>
                      <div className="text-right mt-2">
                        <a href="/forgotPassword" className="text-white text-xs md:text-sm hover:underline">
                          Forgotten Password?
                        </a>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#006634] text-white py-2 md:py-3 rounded-lg hover:bg-[#005528] transition-colors uppercase font-semibold mt-4 md:mt-6"
                    >
                      {loading ? "Logging in..." : "LOGIN"}
                    </Button>

                     <Button variant="outline" className="h-12 w-full bg-white text-base font-semibold flex items-center justify-center gap-2">
              <Image src="/ic_google.png" alt="Google" width={20} height={20} />
              Login with Google
            </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverLoginPage;