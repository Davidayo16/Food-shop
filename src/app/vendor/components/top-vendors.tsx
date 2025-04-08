import Image from "next/image";
import { Star } from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  revenue: number;
  image: string;
}

const vendors: Vendor[] = [
  {
    id: "1",
    name: "Open Sea Restaurant",
    location: "Budillion Avenue",
    rating: 4.5,
    reviews: 32,
    revenue: 33000,
    image: "/vendor-image-1.png", // Update with correct image
  },
  {
    id: "2",
    name: "Gillian Store",
    location: "Open Sea Restaurant",
    rating: 4.5,
    reviews: 32,
    revenue: 28000,
    image: "/vendor-image-2.png", // Update with correct image
  },
];

export function TopVendors() {
  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-900">Top Performing Vendor</h2>
      <div className="space-y-4">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="flex items-center justify-between p-4 border-b last:border-none"
          >
            {/* Vendor Image */}
            <div className="flex items-center gap-4">
              <Image
                src={vendor.image}
                alt={vendor.name}
                width={20}
                height={20}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900">{vendor.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  {vendor.location}
                  <Star size={14} className="text-yellow-400" />
                  {vendor.rating} ({vendor.reviews})
                </p>
              </div>
            </div>

            {/* Revenue */}
            <span className="text-green-500 text-lg font-medium">
              ${vendor.revenue / 1000}k +
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
