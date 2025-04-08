"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { CheckCircle, MapPin } from "lucide-react";

// Custom marker icon (Leaflet default icon fix)
const customIcon = L.icon({
  iconUrl: "/marker-icon.png", // Replace with your own marker icon if needed
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function DeliveryPage() {
  const router = useRouter();
  const [location, setLocation] = useState<[number, number] | null>([
    51.505, -0.09,
  ]); // Default London
  const [address, setAddress] = useState("");

  // Function to use current geolocation
  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Failed to fetch location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Component to handle map clicks
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setLocation([e.latlng.lat, e.latlng.lng]);
      },
    });

    return location ? <Marker position={location} icon={customIcon} /> : null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Indicator */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-black">
          <CheckCircle className="text-black" />
          <span className="font-bold">Delivery</span>
        </div>
        <div className="w-16 h-1 bg-gray-300"></div>
        <div className="flex items-center gap-2 text-gray-400">
          <CheckCircle className="text-gray-400" />
          <span>Summary</span>
        </div>
        <div className="w-16 h-1 bg-gray-300"></div>
        <div className="flex items-center gap-2 text-gray-400">
          <CheckCircle className="text-gray-400" />
          <span>Payment</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative flex items-center mb-4">
        <input
          type="text"
          placeholder="Search for delivery address"
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-4 rounded-md"
          onClick={useCurrentLocation}
        >
          Use current location
        </Button>
      </div>

      {/* Map */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-semibold text-lg mb-2">Delivery Location</h3>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="text-green-600" />
          <span>
            {address || "49 Woodhall Hills Golf Club, LONDON"} {/* Default Address */}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>⏳ 25 min</span>
        </div>

        <div className="mt-3 rounded-lg overflow-hidden border">
          <MapContainer
            center={location || [51.505, -0.09]}
            zoom={13}
            style={{ height: "300px", width: "100%", borderRadius: "10px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>

      {/* Continue Button */}
      <Button
        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg text-lg"
        onClick={() => router.push("/restaurants/1?scene=summary")}

      >
        CONTINUE
      </Button>
    </div>
  );
}
