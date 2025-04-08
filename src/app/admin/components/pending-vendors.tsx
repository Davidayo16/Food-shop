"use client"; // Enable client-side interactivity

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Vendor {
  _id: string;
  name: string;
  businessName?: string;
  rating: number;
  reviews: number;
  revenue: number;
  status: "pending" | "approved";
}

export function PendingVendors() {
  const [vendorsList, setVendorsList] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending vendors
  const fetchPendingVendors = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://app.quickfoodshop.co.uk/v1/dashboard/pending-vendors"
      );
      const data = await response.json();

      if (response.ok) {
        const cleanedData = data.data.map(({ deviceToken, deviceType, deviceName, ...rest }) => rest);
        setVendorsList(cleanedData);
      } else {
        console.error("Failed to fetch vendors:", data.message);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingVendors();
  }, []);

  // Approve Vendor
  const handleApprove = async (vendorId: string) => {
    try {
      const response = await fetch(
        "https://app.quickfoodshop.co.uk/v1/dashboard/approve-reject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vendorId, action: "approve" }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data); // Log full response

      if (!response.ok) {
        throw new Error(data.message || "Failed to approve vendor");
      }

      if (data.success) {
        console.log("Vendor Approved:", data);

        alert("Vendor approved successfully!");

        // 🔥 Remove the vendor from the pending list
        setVendorsList((prev) => prev.filter((vendor) => vendor._id !== vendorId));
      } else {
        throw new Error(data.message || "Approval failed");
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert(`Something went wrong: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="space-y-4 bg-white w-full p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-900">Pending Vendors</h2>
      <div className="space-y-4">
        {vendorsList.length === 0 ? (
          <p className="text-center text-gray-500">No pending vendors found.</p>
        ) : (
          vendorsList.map((vendor) => (
            <div key={vendor._id} className="flex items-center justify-between gap-4 p-4 border-b last:border-none">
              <div className="flex items-center gap-4">
                <h3 className="font-medium text-gray-900">
                  {vendor.businessName || vendor.name}
                </h3>
              </div>

              {/* Status Badge */}
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                Pending
              </span>

              {/* Approve Button */}
              <Button
                onClick={() => handleApprove(vendor._id)}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Approve
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
