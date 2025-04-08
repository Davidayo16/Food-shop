"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";

export default function SummaryPage() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      
      {/* Progress Bar */}
      <div className="flex items-center justify-center gap-8 mb-6">
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle size={18} /> <span className="font-medium">Delivery</span>
        </div>
        <div className="flex items-center gap-2 text-black">
          <CheckCircle size={18} /> <span className="font-medium">Summary</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Circle size={18} /> <span className="font-medium">Payment</span>
        </div>
      </div>
      
      {/* Delivery Address */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-sm font-semibold">Delivery Address</h3>
        <p className="text-gray-600 text-sm">📍 49 Woodhall Hills Golf Club, LONDON</p>
        <p className="text-gray-600 text-sm">⏱️ 25 min</p>
      </div>
      
      {/* Order Summary */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-sm font-semibold">Order Summary</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <div className="flex justify-between">
            <span>Onion</span> <span>$150.00</span>
          </div>
          <div className="flex justify-between">
            <span>Garlic</span> <span>$150.00</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Subtotal:</span> <span>$350.00</span>
          </div>
          <div className="flex justify-between">
            <span>Est Tax:</span> <span>$2.00</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery:</span> <span>Free</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span> <span className="text-green-600">$12.22</span>
          </div>
        </div>
      </div>
      
      {/* Continue Button */}
      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"  onClick={() => router.push("/restaurants/1?scene=payment")}> 
        CONTINUE 
      </Button>
    </div>
  );
}
