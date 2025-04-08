"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Clock, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { SiteHeader } from "@/components/site-header";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

export default function DeliveryPage() {
  const router = useRouter();
  const [location, setLocation] = useState("Select a location on the map");
  const [eta, setEta] = useState("Calculating...");
  const [loading, setLoading] = useState(false);
  const [latLng, setLatLng] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });

  // Store cart items (Ensure TypeScript knows the shape)
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([]);

  useEffect(() => {
    // Fetch cart items from localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }

    // Get user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleLocationSelect(position.coords.latitude, position.coords.longitude);
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleLocationSelect = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const address = await reverseGeocode(lat, lng);
      setLocation(address);
      setLatLng({ lat, lng });
      setEta("25 min");
    } catch (error) {
      console.error("Reverse geocoding failed", error);
      setLocation(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
    } finally {
      setLoading(false);
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
    }
  };

  const handleContinue = async () => {
    if (!latLng.lat || !latLng.lng) {
      alert("Please select a delivery location.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderData = {
      items: cartItems.map((item) => ({
        itemId: item.id,
        quantity: item.quantity,
      })),
      deliveryAddress: location,
      latitude: latLng.lat,
      longitude: latLng.lng,
      deliveryInstructions: "Carry am come sharp",
    };

    const token = process.env.NEXT_PUBLIC_API_TOKEN;

    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data?.order) {
        router.push("/summary");
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <div>
      <SiteHeader />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-lg font-semibold mb-4">Checkout</h2>
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center mx-auto space-x-4 border-b pb-4">
            <StepIndicator step={1} label="Delivery" active />
            <StepDivider />
            <StepIndicator step={2} label="Summary" />
            <StepDivider />
            <StepIndicator step={3} label="Payment" />
          </div>
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">Delivery Location</p>
              <p className="text-lg font-medium flex items-center gap-2">
                <MapPin className="text-green-600" /> {location}
              </p>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <Clock size={16} className="mr-1" /> {loading ? "Loading ETA..." : eta}
              </p>
              <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white" onClick={handleContinue}>
                Continue
              </Button>
            </div>
            <div className="w-full md:w-1/2">
              <MapComponent onSelect={handleLocationSelect} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StepIndicator = ({ step, label, active = false }) => (
  <div className={`flex flex-col items-center ${active ? "text-green-600" : "text-gray-400"}`}>
    <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white ${active ? "bg-green-600" : "bg-gray-300"}`}>
      {step}
    </div>
    <span className="text-sm">{label}</span>
  </div>
);

const StepDivider = () => <div className="w-16 h-0.5 bg-gray-300"></div>;
