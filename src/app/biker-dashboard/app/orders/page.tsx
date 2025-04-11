// e.g., app/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Simulated data
const initialOrders = [
  { id: "QF3384", date: "14th Mar, 2024 - 12:03PM", status: "Delivered" },
  { id: "QF3384", date: "14th Mar, 2024 - 12:03PM", status: "Delivered" },
  { id: "QF3384", date: "14th Mar, 2024 - 12:03PM", status: "Delivered" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newOrder = {
          id: `QF${Math.floor(1000 + Math.random() * 9000)}`,
          date: "14th Mar, 2024 - 12:03PM",
          status: "Delivered",
        };
        setOrders((prev) => [newOrder, ...prev.slice(0, 9)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header username="Tobi" />

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">All Orders</h2>

        <Card>
          <CardContent className="p-0">
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-medium">
                <div className="col-span-1"></div>
                <div className="col-span-4">Order description</div>
                <div className="col-span-4">Date</div>
                <div className="col-span-3">Order Status</div>
              </div>

              {orders.map((order, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                  <div className="col-span-1">
                    <Checkbox />
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <div className="bg-green-50 p-1 rounded-md">
                      <div className="relative w-6 h-6">
                        <Image src="/logo.png" alt="Logo" width={60} height={60} className="absolute inset-0 rounded-md" />
                      </div>
                    </div>
                    <span className="font-medium">{order.id}</span>
                  </div>
                  <div className="col-span-4 text-gray-600">{order.date}</div>
                  <div className="col-span-3">
                    <Badge className="bg-green-100 text-green-600 hover:bg-green-100">{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}