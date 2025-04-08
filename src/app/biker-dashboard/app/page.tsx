"use client"

import { useState, useEffect } from "react"
import { ArrowRight, DollarSign, ShoppingBag, Truck, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useDashboardStore } from "@/lib/data-service"

export default function Dashboard() {
  const { income, orders, deliveryRequests, activeDeliveries, recentReviews } = useDashboardStore()
  const [showNotification, setShowNotification] = useState(false)
  const { toast } = useToast()

  // Simulate notification
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowNotification(true)
      toast({
        title: "New Delivery Alert!",
        description: "You have a delivery request",
      })
    }, 3000)

    return () => clearTimeout(timeout)
  }, [toast])

  return (
    <div className="flex flex-col min-h-screen">
      <Header username="John" />

      {showNotification && (
        <div className="relative">
          <div className="absolute right-4 top-4 z-50 bg-white border rounded-lg p-4 shadow-lg w-80">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-md">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-green-600 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-xs">QFS</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">New Delivery Alert!</h4>
                <p className="text-sm text-gray-600">You have a delivery request</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-500">Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">${(income / 1000).toFixed(1)}K</p>
                  <p className="text-green-600 text-sm">+30% This month</p>
                </div>
                <div className="bg-green-100 p-2 rounded-md">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <svg viewBox="0 0 100 20" className="w-full">
                  <path d="M0,10 Q25,5 50,10 T100,10" fill="none" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-500">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{orders}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-md">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" className="text-green-600 p-0 h-auto">
                  See more <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-500">Delivery Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{deliveryRequests}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-md">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" className="text-green-600 p-0 h-auto">
                  See more <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Active Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-medium">
                    <div className="col-span-1"></div>
                    <div className="col-span-4">Order description</div>
                    <div className="col-span-4">Date</div>
                    <div className="col-span-3">Order Status</div>
                  </div>

                  {activeDeliveries.map((delivery, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-4 flex items-center gap-2">
                        <div className="bg-green-50 p-1 rounded-md">
                          <div className="relative w-6 h-6">
                            <div className="absolute inset-0 bg-green-600 rounded-md flex items-center justify-center">
                              <span className="text-white font-bold text-xs">QFS</span>
                            </div>
                          </div>
                        </div>
                        <span className="font-medium">
                          {delivery.id} {delivery.pending && "(Pending)"}
                        </span>
                      </div>
                      <div className="col-span-4 text-gray-600">{delivery.date}</div>
                      <div className="col-span-3">
                        {delivery.status === "In Transit" ? (
                          <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100">{delivery.status}</Badge>
                        ) : delivery.status === "Pickup" ? (
                          <Button className="bg-orange-400 hover:bg-orange-500">{delivery.status}</Button>
                        ) : (
                          <Button className="bg-green-600 hover:bg-green-700">{delivery.status}</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReviews.map((review, index) => (
                  <div key={index} className="border-b pb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-green-50 p-1 rounded-md">
                        <div className="relative w-6 h-6">
                          <div className="absolute inset-0 bg-green-600 rounded-md flex items-center justify-center">
                            <span className="text-white font-bold text-xs">QFS</span>
                          </div>
                        </div>
                      </div>
                      <span className="font-medium">Order {review.id}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{review.text}</p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm ml-1">
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
  )
}

