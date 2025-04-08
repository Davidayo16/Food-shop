// app/driver/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import Image from "next/image";

export default function DriverSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call (no backend yet)
    try {
      // Mock delay to simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful signup
      console.log("Driver Signup Data:", formData);

      // Redirect to pending verification page
      router.push("/biker-dashboard/pending-verification");
    } catch (error) {
      console.error("Mock error during signup:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Use the existing SiteHeader */}
      <SiteHeader />

      {/* Outer Container for Spacing */}
      <div className="m-6 md:m-8">
        {/* Inner Container */}
        <div className="flex flex-col md:flex-row rounded-lg bg-[#002A1F] p-6 md:p-6">
          {/* Left Side - Image */}
          <div className="hidden md:block w-full md:w-1/2 rounded-t-lg md:rounded-t-none md:rounded-l-lg overflow-hidden">
            <Image
              src="/login.png" // Replace with the actual path to the chef image (includes "RAW & FRESH")
              alt="Chef with RAW & FRESH background"
              width={600} // Adjust based on your image dimensions
              height={800} // Adjust based on your image dimensions
              className="w-full h-full object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 flex justify-center p-4 md:p-4">
            <div className="max-w-md w-full   rounded-lg">
              {/* Form Title */}
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Register as Dispatch Rider</h2>
              <p className="text-xs md:text-sm text-white mb-6">
                Already have an account?{" "}
                <a href="/biker-dashboard/login" className="text-[#F99886] font-semibold">
                  Login
                </a>
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <label className="block text-white text-xs md:text-sm mb-1">First Name</label>
                    <div className="relative ">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-gray-300 rounded-full"></span>
                      <input
                      required
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        onChange={handleChange}
                        className="w-full pl-10 p-2 md:p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006634] text-black placeholder:text-xs md:placeholder:text-sm"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-white text-xs md:text-sm mb-1">Last Name</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-gray-300 rounded-full"></span>
                      <input
                      required
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        onChange={handleChange}
                        className="w-full pl-10 p-2 md:p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006634] text-black placeholder:text-xs md:placeholder:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white text-xs md:text-sm mb-1">Phone Number.</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-gray-300 rounded-full"></span>
                    <input
                    required
                      name="phoneNumber"
                      type="tel"
                      placeholder="Phone No."
                      onChange={handleChange}
                      className="w-full pl-10 p-2 md:p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006634] text-black placeholder:text-xs md:placeholder:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-xs md:text-sm mb-1">Email</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-gray-300 rounded-full"></span>
                    <input
                    required
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                      className="w-full pl-10 p-2 md:p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006634] text-black placeholder:text-xs md:placeholder:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-xs md:text-sm mb-1">Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-gray-300 rounded-full"></span>
                    <input
                      name="password"
                      required
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      className="w-full pl-10 p-2 md:p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006634] text-black placeholder:text-xs md:placeholder:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-xs md:text-sm mb-1">Confirm Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border border-gray-300 rounded-full"></span>
                    <input
                      name="confirmPassword"
                      required
                      type="password"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      className="w-full pl-10 p-2 md:p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006634] text-black placeholder:text-xs md:placeholder:text-sm"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#006634] text-white py-2 md:py-6 rounded-lg hover:bg-[#005528] transition-colors uppercase font-semibold mt-6 md:mt-10"
                >
                  {loading ? "Registering..." : "REGISTER"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}