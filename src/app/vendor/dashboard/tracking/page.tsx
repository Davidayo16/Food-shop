"use client"
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin } from "lucide-react";

interface TrackingItem {
  id: string;
  date: string;
  status: string;
}

export default function TrackingPage() {
  const [trackingItems, setTrackingItems] = useState<TrackingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await fetch(
          "https://app.quickfoodshop.co.uk/v1/vendor-dashboard/track-order/quickfoods-7462692",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual token
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch tracking data");

        const data = await response.json();
        if (data.success) {
          setTrackingItems(data.data); // Ensure API response matches expected structure
        } else {
          throw new Error(data.message || "Unknown error");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, []);

  if (loading) return <p>Loading tracking data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8 pt-6">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Tracking</h2>
        <div className="space-y-2">
          {trackingItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg border bg-white p-4">
              <div className="flex items-center gap-4">
                <Checkbox />
                <div>
                  <p className="font-medium">{item.id}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  item.status === "Delivered" ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border bg-white p-4">
        <h3 className="font-semibold">Order Tracking</h3>
        <div className="aspect-video w-full rounded-lg bg-gray-100">
          {/* Map placeholder */}
          <div className="h-full w-full rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
