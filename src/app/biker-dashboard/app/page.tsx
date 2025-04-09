// app/biker-dashboard/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, DollarSign, ShoppingBag, Truck, Star } from "lucide-react";
import { Header } from "../components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useDashboardStore } from "../lib/data-service";

export default function Dashboard() {
  const { income, orders, deliveryRequests, activeDeliveries, recentReviews } = useDashboardStore();
  const [showNotification, setShowNotification] = useState(false);
  const { toast } = useToast();

  // Simulate notification
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowNotification(true);
      toast({
        title: "New Delivery Alert!",
        description: "You have a delivery request",
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header username="John" />

      {showNotification && (
        <div className="relative">
          <div className="absolute right-2 top-2 z-50 bg-white border rounded-lg p-2 shadow-lg w-64 sm:w-72 lg:w-80">
            <div className="flex items-center gap-2">
              <div className="bg-green-50 p-1 rounded-md">
                <div className="relative w-5 h-5">
                  <div className="absolute inset-0 bg-green-600 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-xs">QFS</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">New Delivery Alert!</h4>
                <p className="text-xs text-gray-600">You have a delivery request</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full h-6 w-6">
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="p-2 sm:p-3 md:p-4 lg:p-5 space-y-3 sm:space-y-4">
        {/* First Grid: Total Income, Total Orders, Delivery Requests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          <Card className="bg-blue-50">
            <CardHeader className="pb-1 sm:pb-2 p-3 sm:p-4">
              <CardTitle className="text-sm sm:text-base text-gray-500">Total Income</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">${(income / 1000).toFixed(1)}K</p>
                  <p className="text-green-600 text-xs">+30% This month</p>
                </div>
                <div className="bg-green-100 p-1 rounded-md">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 sm:mt-3">
                <svg viewBox="0 0 100 20" className="w-full">
                  <path d="M0,10 Q25,5 50,10 T100,10" fill="none" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50">
            <CardHeader className="pb-1 sm:pb-2 p-3 sm:p-4">
              <CardTitle className="text-sm sm:text-base text-gray-500">Total Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">{orders}</p>
                </div>
                <div className="bg-green-100 p-1 rounded-md">
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 sm:mt-3 flex justify-end">
                <Button variant="ghost" className="text-green-600 p-0 h-auto text-xs">
                  See more <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-1 sm:pb-2 p-3 sm:p-4">
              <CardTitle className="text-sm sm:text-base text-gray-500">Delivery Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">{deliveryRequests}</p>
                </div>
                <div className="bg-green-100 p-1 rounded-md">
                  <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 sm:mt-3 flex justify-end">
                <Button variant="ghost" className="text-green-600 p-0 h-auto text-xs">
                  See more <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Grid: Active Deliveries and Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="text-sm sm:text-base">Active Deliveries</CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-3">
                <div className="border rounded-lg overflow-x-auto">
                  {/* Table Header (hidden on small screens) */}
                  <div className="hidden sm:grid grid-cols-12 gap-2 p-2 border-b bg-gray-50 font-medium text-xs sm:text-sm">
                    <div className="col-span-1"></div>
                    <div className="col-span-5 sm:col-span-4">Order description</div>
                    <div className="col-span-3 sm:col-span-4">Date</div>
                    <div className="col-span-3">Status</div>
                  </div>

                  {/* Table Rows */}
                  {activeDeliveries.map((delivery, index) => (
                    <div
                      key={index}
                      className="sm:grid sm:grid-cols-12 flex flex-col gap-2 p-2 border-b sm:items-center"
                    >
                      <div className="sm:col-span-1 flex sm:block">
                        <Checkbox />
                      </div>
                      <div className="sm:col-span-5 sm:col-span-4 flex items-center gap-2">
                        <div className="bg-green-50 p-1 rounded-md">
                          <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                            <div className="absolute inset-0 bg-green-600 rounded-md flex items-center justify-center">
                              <span className="text-white font-bold text-xs">QFS</span>
                            </div>
                          </div>
                        </div>
                        <span className="font-medium text-xs sm:text-sm">
                          <span className="sm:hidden">Order: </span>
                          {delivery.id} {delivery.pending && "(Pending)"}
                        </span>
                      </div>
                      <div className="sm:col-span-3 sm:col-span-4 text-gray-600 text-xs sm:text-sm">
                        <span className="sm:hidden font-medium">Date: </span>
                        {delivery.date}
                      </div>
                      <div className="sm:col-span-3">
                        <span className="sm:hidden font-medium">Status: </span>
                        {delivery.status === "In Transit" ? (
                          <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100 text-xs">
                            {delivery.status}
                          </Badge>
                        ) : delivery.status === "Pickup" ? (
                          <Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-xs h-7">
                            {delivery.status}
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs h-7">
                            {delivery.status}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="text-sm sm:text-base">Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 p-2 sm:p-3">
                {recentReviews.map((review, index) => (
                  <div key={index} className="border-b pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-green-50 p-1 rounded-md">
                        <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                          <div className="absolute inset-0 bg-green-600 rounded-md flex items-center justify-center">
                            <span className="text-white font-bold text-xs">QFS</span>
                          </div>
                        </div>
                      </div>
                      <span className="font-medium text-xs sm:text-sm">Order {review.id}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{review.text}</p>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs ml-1">
                        {review.rating} ({review.count})
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}