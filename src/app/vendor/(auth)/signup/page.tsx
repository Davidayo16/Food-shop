"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

export default function VendorSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    businessName: "",
    businessDescription: "",
    businessAddress: "",
    businessEmail: "",
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
    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/vendor/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log("Signup Response:", result); // Debugging
  
      if (response.ok && result.data) {
        // Vendor is successfully registered (even if pending)
        router.push("/vendor/pending-verification");
      } else {
        alert("Signup failed: " + result.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div>
      <SiteHeader/>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-semibold text-center mb-6">Create Vendor Account</h2>
      <p className="text-center text-gray-600 mb-4">
        Already have an account? <a href="/vendor/login" className="text-orange-500">Login</a>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-[#1A1A1A]">Contact Person</h3>
        <div className="flex gap-4">
          <input name="firstName" placeholder="First Name" onChange={handleChange} className="w-1/2 p-3 border rounded" />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} className="w-1/2 p-3 border rounded" />
        </div>
        <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="email" name="email" placeholder="Email address" onChange={handleChange} className="w-full p-3 border rounded" />
        <h3 className="text-[#1A1A1A]">Business Information</h3>
        <input name="businessName" placeholder="Business Name" onChange={handleChange} className="w-full p-3 border rounded" />
        <textarea name="businessDescription" placeholder="Business Description" onChange={handleChange} className="w-full p-3 border rounded"></textarea>
        <input name="businessAddress" placeholder="Business Address" onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="businessEmail" placeholder="Business Email" onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="password" name="password" placeholder="Create Password" onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full p-3 border rounded" />
        <Button type="submit" disabled={loading} className="w-full bg-[#006634] text-white py-3 rounded-lg">
          {loading ? "Creating Account..." : "CREATE ACCOUNT"}
        </Button>
      </form>
    </div>
    </div>  );
}
