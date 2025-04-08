// app/driver/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

export default function DriverSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    vehicleType: "", // Added for drivers (e.g., bike, car)
    licenseNumber: "", // Driver-specific field
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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
    <div>
      <SiteHeader />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Create Driver Account</h2>
        <p className="text-center text-gray-600 mb-4">
          Already have an account? <a href="/driver/login" className="text-orange-500">Login</a>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-[#1A1A1A]">Personal Information</h3>
          <div className="flex gap-4">
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              className="w-1/2 p-3 border rounded"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              className="w-1/2 p-3 border rounded"
            />
          </div>
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <h3 className="text-[#1A1A1A]">Driver Information</h3>
          <select
            name="vehicleType"
            onChange={handleChange}
            className="w-full p-3 border rounded"
            defaultValue=""
          >
            <option value="" disabled>
              Select Vehicle Type
            </option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
            <option value="scooter">Scooter</option>
          </select>
          <input
            name="licenseNumber"
            placeholder="Driver License Number"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#006634] text-white py-3 rounded-lg"
          >
            {loading ? "Creating Account..." : "CREATE ACCOUNT"}
          </Button>
        </form>
      </div>
    </div>
  );
}