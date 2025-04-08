"use client"

import { useState, useEffect } from "react"
import { Header } from "../../components/header";
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Store } from "lucide-react"
import { DeliverySuccessModal } from "../../components/delivery-success-modal"
import Image from "next/image"
import Map from "@/components/map"
import { useRouter } from "next/navigation"; // Change this impor

// Simulated data
const initialTrackings = [
  { id: "TNQF3324", date: "Oct 4, 2024", status: "Assigned" },
  { id: "TNQF3324", date: "Oct 4, 2024", status: "In Transit" },
  { id: "TNQF3324", date: "Oct 4, 2024", status: "Delivered" },
  { id: "TNQF3324", date: "Oct 4, 2024", status: "Delivered" },
  { id: "TNQF3324", date: "Oct 4, 2024", status: "Delivered" },
  { id: "TNQF3324", date: "Oct 4, 2024", status: "Delivered" },
  { id: "TNQF3324", date: "Oct 4, 2024", status: "Delivered" },
  { id: "TNQF3324", date: "Oct 4, 2024", status: "Delivered" },
]

export default function TrackingPage() {
  const [trackings, setTrackings] = useState(initialTrackings)
  const [selectedTracking, setSelectedTracking] = useState<string | null>(null)
  const [statusUpdate, setStatusUpdate] = useState("Pickup")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
    const router = useRouter();
  const { role } = router.query;

  // Simulate selecting the first tracking by default
  useEffect(() => {
    setSelectedTracking(trackings[0].id)
  }, [trackings])

  const handleUpdateStatus = () => {
    if (statusUpdate.toLowerCase() === "delivered") {
      setShowSuccessModal(true)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header username="John" />

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Tracking</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6">
            <Card>
              <CardContent className="p-0">
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-medium">
                    <div className="col-span-1"></div>
                    <div className="col-span-5">Tracking ID</div>
                    <div className="col-span-6">Status</div>
                  </div>

                  {trackings.map((tracking, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-4 p-4 border-b items-center cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedTracking(tracking.id)}
                    >
                      <div className="col-span-1">
                        <Checkbox checked={selectedTracking === tracking.id} />
                      </div>
                      <div className="col-span-5">
                        <div className="font-medium">{tracking.id}</div>
                        <div className="text-sm text-gray-500">{tracking.date}</div>
                      </div>
                      <div className="col-span-6">
                        {tracking.status === "Assigned" ? (
                          <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100">{tracking.status}</Badge>
                        ) : tracking.status === "In Transit" ? (
                          <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100">{tracking.status}</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-600 hover:bg-green-100">{tracking.status}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Status Update and Order Details */}
              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Status Update</h3>
                  <Input value={statusUpdate} onChange={(e) => setStatusUpdate(e.target.value)} className="mb-4" />
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleUpdateStatus}>
                    Update
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium">Order #QF23258</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-600">Recipient:</span>
                        <span className="text-green-600">Jonathan Brim</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-600">Distance</span>
                        <span>12km</span>
                        <span className="inline-flex w-2 h-2 bg-green-400 rounded-full"></span>
                        <span>12min</span>
                      </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100">Assigned</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Store className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="w-0.5 h-10 bg-gray-200 my-1"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Gillian Store, South London</h4>
                        <p className="text-gray-500">Pick Up</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">465 Peckam, UK</h4>
                        <p className="text-gray-500">Drop Off</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

            {/* Map */}
              <div className="h-full">
                <Card className="p-0 h-full overflow-hidden">
                  <div className="relative w-full h-full min-h-[400px]">
                   <p>Role: {role || 'Not set'}</p>
                  <Map role={role}/>
                    <div className="absolute top-2 left-2 bg-white p-2 rounded-md shadow-md">
                      <h3 className="text-sm font-medium">Live Tracking</h3>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeliverySuccessModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} orderId="QF3348" />
    </div>
  )
}

