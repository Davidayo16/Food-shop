"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload } from "lucide-react"

// Simulated data
const initialRequests = [
  {
    id: "QF23258",
    recipient: "Jonathan Brim",
    distance: "12km",
    time: "12min",
    status: "Assigned",
    pickup: "Gillian Store, South London",
    dropoff: "465 Peckam, UK",
  },
  {
    id: "QF23258",
    recipient: "Jonathan Brim",
    distance: "12km",
    time: "12min",
    status: "Assigned",
    pickup: "Gillian Store, South London",
    dropoff: "465 Peckam, UK",
  },
  {
    id: "QF1258",
    recipient: "Jonathan Brim",
    distance: "12km",
    time: "12min",
    status: "In Transit",
    pickup: "Gillian Store, South London",
    dropoff: "465 Peckam, UK",
    inTransitMessage: "Package is on its way",
  },
]

export default function RequestsPage() {
  const [requests, setRequests] = useState(initialRequests)

  return (
    <div className="flex flex-col min-h-screen">
      <Header username="Tobi" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">All Requests</h2>
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Export
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requests.map((request, index) => (
            <div key={index} className="border rounded-lg overflow-hidden bg-white shadow-sm">
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Order #{request.id}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-gray-600 text-sm">Recipient:</span>
                        <span className="text-green-600 text-sm">{request.recipient}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-600">Distance</span>
                        <span>{request.distance}</span>
                        <span className="inline-flex w-2 h-2 bg-green-400 rounded-full"></span>
                        <span>{request.time}</span>
                      </div>
                    </div>
                    <Badge
                      className={
                        request.status === "Assigned"
                          ? "bg-orange-100 text-orange-500 hover:bg-orange-100 border-orange-200 font-normal"
                          : "bg-purple-100 text-purple-500 hover:bg-purple-100 border-purple-200 font-normal"
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-6 mb-4">
                  {request.status === "In Transit" ? (
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <TruckIcon className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="w-[2px] h-16 bg-green-200 my-1 dashed-line"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">In Transit</h4>
                        <p className="text-gray-500 text-sm">{request.inTransitMessage}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <StoreIcon className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="w-[2px] h-16 bg-green-200 my-1 dashed-line"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{request.pickup}</h4>
                        <p className="text-gray-500 text-sm">Pick Up</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <LocationIcon className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">{request.dropoff}</h4>
                      <p className="text-gray-500 text-sm">Drop Off</p>
                    </div>
                  </div>
                </div>
              </div>

              {request.status === "In Transit" ? (
                <Button className="w-full rounded-none h-12 bg-green-600 hover:bg-green-700 font-medium">
                  Track Order
                </Button>
              ) : (
                <Button className="w-full rounded-none h-12 bg-orange-400 hover:bg-orange-500 font-medium">
                  Pickup
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .dashed-line {
          background-image: linear-gradient(to bottom, #e5e7eb 50%, transparent 50%);
          background-size: 1px 8px;
          background-repeat: repeat-y;
        }
      `}</style>
    </div>
  )
}

function StoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
      <path d="M18 12V7" />
      <path d="M14 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
      <path d="M10 12V7" />
      <path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
      <path d="M2 12V7" />
    </svg>
  )
}

function LocationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 17h4V5H2v12h3" />
      <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
      <path d="M14 17h1" />
      <circle cx="7.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  )
}

