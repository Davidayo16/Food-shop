"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  businessName: string;
  businessAddress: string;
  rating: number;
  reviews: number;
  revenue?: number; 
}

export function TopVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("https://app.quickfoodshop.co.uk/v1/dashboard/active-vendors");
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }
        const json = await response.json();
        console.log("Fetched Vendors:", json);

       
        let vendorsArray: Vendor[] = [];
        if (Array.isArray(json)) {
          vendorsArray = json.map((vendor: any) => ({
            ...vendor,
            id: vendor._id, // Use _id from API as our id
          }));
        } else if (json.data && Array.isArray(json.data)) {
          vendorsArray = json.data.map((vendor: any) => ({
            ...vendor,
            id: vendor._id,
          }));
        } else {
          throw new Error("Invalid data format");
        }

        // Sort vendors by highest revenue (using 0 as a fallback) then by reviews.
        const sortedVendors = vendorsArray.sort((a, b) => {
          const revenueA = a.revenue ?? 0;
          const revenueB = b.revenue ?? 0;
          if (revenueB !== revenueA) {
            return revenueB - revenueA;
          }
          return b.reviews - a.reviews;
        });
        setVendors(sortedVendors);
      } catch (error: any) {
        console.error("Error fetching vendors:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // Calculate total revenue with fallback values.
  const totalRevenue = vendors.reduce((sum, vendor) => sum + (vendor.revenue ?? 0), 0);

  if (loading) return <p className="text-gray-500 text-center">Loading vendors...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (vendors.length === 0) return <p className="text-gray-500 text-center">No vendors available.</p>;

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-900">Top Performing Vendors</h2>
      <div className="space-y-4">
        {vendors.map((vendor) => {
          const revenue = vendor.revenue ?? 0; // Default revenue to 0 if undefined
          const revenuePercentage =
            totalRevenue > 0 ? ((revenue / totalRevenue) * 100).toFixed(2) : "0";

          return (
            <div key={vendor.id} className="flex items-center justify-between p-4 border-b last:border-none">
              {/* Vendor Details */}
              <div className="flex flex-col">
                <h3 className="font-medium text-gray-900">{vendor.businessName}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  {/* <Star size={14} className="text-yellow-400" /> */}
                  {vendor.businessAddress}
                </p>
              </div>
              {/* Revenue */}
              <span className="text-green-500 text-lg font-medium">
                + ${revenue.toLocaleString()} (+ {revenuePercentage}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
