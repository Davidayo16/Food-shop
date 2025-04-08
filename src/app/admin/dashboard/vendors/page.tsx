"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

interface Vendor {
  _id: string;
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  block: boolean;
}

export default function VendorTable() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [pendingVendors, setPendingVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [pendingLoading, setPendingLoading] = useState(false);

  useEffect(() => {
    fetchVendors();
    fetchPendingVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/dashboard/active-vendors");
      const data = await response.json();
      if (data.success) {
        setVendors(data.data);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingVendors = async () => {
    setPendingLoading(true);
    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/dashboard/pending-vendors");
      const data = await response.json();
      if (data.success) {
        setPendingVendors(data.data);
      }
    } catch (error) {
      console.error("Error fetching pending vendors:", error);
    } finally {
      setPendingLoading(false);
    }
  };

  const handleApproveVendor = async (vendorId: string) => {
    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/dashboard/approve-reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorId, status: "APPROVED" }),
      });
      const result = await response.json();
      if (result.status) {
        fetchVendors();
        fetchPendingVendors();
      }
    } catch (error) {
      console.error("Error approving vendor:", error);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">Active Vendors</h2>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor ID</TableHead>
              <TableHead>Store Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Reg Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor._id}>
                <TableCell>{vendor._id}</TableCell>
                <TableCell>{vendor.businessName}</TableCell>
                <TableCell>{vendor.firstName} {vendor.lastName}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{new Date(vendor.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="md:hidden space-y-3">
        {vendors.map((vendor) => (
          <div key={vendor._id} className="flex items-center justify-between p-3 border rounded-lg shadow">
            <div>
              <p className="font-semibold">{vendor.businessName}</p>
              <p className="text-sm text-gray-500">{new Date(vendor.createdAt).toLocaleDateString()}</p>
            </div>
            <p className="text-green-600 font-medium">Active</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg md:text-xl font-semibold my-6 text-center">Pending Vendors</h2>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor ID</TableHead>
              <TableHead>Store Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Reg Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingVendors.map((vendor) => (
              <TableRow key={vendor._id}>
                <TableCell>{vendor._id}</TableCell>
                <TableCell>{vendor.businessName}</TableCell>
                <TableCell>{vendor.firstName} {vendor.lastName}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{new Date(vendor.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button onClick={() => handleApproveVendor(vendor._id)} className="bg-green-500 text-white hover:bg-green-600">Approve</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="md:hidden space-y-3">
        {pendingVendors.map((vendor) => (
          <div key={vendor._id} className="flex items-center justify-between p-3 border rounded-lg shadow">
            <div>
              <p className="font-semibold">{vendor.businessName}</p>
              <p className="text-sm text-gray-500">{new Date(vendor.createdAt).toLocaleDateString()}</p>
            </div>
            <Button onClick={() => handleApproveVendor(vendor._id)} className="bg-green-500 text-white hover:bg-green-600 text-sm">Approve</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
