"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Heart, Clock } from "lucide-react";

interface FoodItemProps {
  image: string;
  name: string;
  price: number;
  delieveryTime: number;
  outOfStock: boolean;
}

const FoodItemCard: React.FC<FoodItemProps> = ({ image, name, price, delieveryTime, outOfStock }) => {
  const router = useRouter();

  const handleOrderClick = () => {
    router.push(`/order?price=${price}`);
  };

  return (
    <Card className="relative w-full sm:w-[300px] md:w-[250px] rounded-xl overflow-hidden shadow-md bg-white transition-transform transform hover:scale-105">
      {/* Food Image */}
      <div className="relative w-full h-40 md:h-48">
        <img src={image} alt={name} className="w-full h-full object-cover" />

        {/* Stock Status Badge */}
        <div
          className="absolute top-2 left-2 px-2 py-1 text-xs md:text-sm rounded-full flex items-center gap-1 font-medium shadow-md"
          style={{
            backgroundColor: outOfStock ? "#FF0000" : "#DFF6DD",
            color: outOfStock ? "#FFFFFF" : "#1B5E20",
          }}
        >
          <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${outOfStock ? "bg-white" : "bg-green-600"}`}></span>
          {outOfStock ? "Out of Stock" : "Available"}
        </div>

        {/* Favorite Icon */}
        <button className="absolute top-2 right-2 bg-white p-2 md:p-3 rounded-full shadow-md">
          <Heart className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
        </button>
      </div>

      {/* Details Section */}
      <div className="p-3 md:p-4">
        <h3 className="font-semibold text-sm md:text-base">{name}</h3>
        <p className="text-xs md:text-sm text-gray-500">{name}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-medium text-sm md:text-base">
            From <span className="font-semibold">₦{price}</span>
          </p>
          <div className="flex items-center gap-1 text-green-600 text-sm md:text-base">
            <Clock className="w-4 h-4 md:w-5 md:h-5" /> {delieveryTime} min
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-end mt-3">
          {outOfStock ? (
            <button className="bg-gray-400 text-white p-2 md:p-3 rounded-full shadow-md cursor-not-allowed">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                <line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          ) : (
            <button
              className="bg-green-500 text-white p-2 md:p-3 rounded-full shadow-md"
              onClick={handleOrderClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FoodItemCard;
