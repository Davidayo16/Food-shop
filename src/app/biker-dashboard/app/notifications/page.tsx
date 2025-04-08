"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

// Simulated data
const initialNotifications = [
  { id: 1, orderId: "QF3348", type: "New Delivery Request", read: false },
  { id: 2, orderId: "QF11348", type: "New Delivery Request", read: false },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotification = {
          id: Date.now(),
          orderId: `QF${Math.floor(10000 + Math.random() * 90000)}`,
          type: "New Delivery Request",
          read: false,
        }
        setNotifications((prev) => [newNotification, ...prev])
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header username="Tobi" />

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>

        <Card>
          <CardContent className="p-6 space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg flex items-center gap-4 ${
                  notification.read ? "border" : "bg-green-50 border border-green-100"
                }`}
              >
                <div className="bg-green-50 p-2 rounded-md">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-green-600 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold text-xs">QFS</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-medium">{notification.type}</h3>
                  <p className="text-gray-600">You have a delivery request, Order #{notification.orderId}</p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => markAsRead(notification.id)}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

