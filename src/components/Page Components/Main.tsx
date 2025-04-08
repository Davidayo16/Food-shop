"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/Page Components/Restaurant Page Components/cartContext"; // Ensure correct import

export default function FoodOrderCard() {
  const { addToCart } = useCart(); // Get addToCart function from context

  const [quantities, setQuantities] = useState({
    beef: 1,
    fish: 0,
    water: 1,
    cola: 0,
  });

  const prices = {
    beef: 100,
    fish: 120,
    water: 50,
    cola: 80,
  };

  const handleQuantityChange = (item, change) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(0, prev[item] + change);
      return { ...prev, [item]: newQuantity };
    });
  };

  const totalPrice = Object.keys(quantities).reduce(
    (total, item) => total + quantities[item] * prices[item],
    0
  );

  const handleAddToCart = () => {
    const selectedExtras = Object.keys(quantities).filter(
      (item) => quantities[item] > 0
    );

    if (selectedExtras.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    const cartItem = {
      id: Math.random(), // Generate a unique ID
      name: "Fried Rice & Chicken",
      restaurant: "Open Sea Restaurant",
      price: 150,
      quantity: 1,
      extras: selectedExtras,
      extrasPrice: selectedExtras.reduce(
        (sum, item) => sum + quantities[item] * prices[item],
        0
      ),
      image: "/Frame 818.png",
    };

    addToCart(cartItem); // Add item to cart
    alert("Item added to cart!"); // Notify the user
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#FCFCFC] text-[#4E5458] rounded-2xl flex flex-col md:flex-row gap-6">
      <div className="flex flex-col md:w-1/2">
        <Image
          src="/Frame 818.png"
          alt="Fried Rice & Chicken"
          width={400}
          height={300}
          className="rounded-lg"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Fried Rice & Chicken</h2>
          <p className="text-gray-600 text-sm mb-4">
            A plate of Jollof Rice with Assorted Meat and Fish, prepared with
            unique Nigerian spices and seasoning.
          </p>
          <p className="text-green-700 font-medium">Open Sea Restaurant</p>
        </div>
      </div>
      <div className="md:w-1/2 p-4 bg-white rounded-xl">
        <h3 className="text-lg font-bold">Add Extras</h3>
        <div className="mt-4 space-y-4">
          {Object.keys(quantities).map((item) => (
            <div
              key={item}
              className="flex items-center justify-between bg-[#ffffff] border-gray-400 w-auto h-auto p-3 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Image src="/Frame 512.png" alt={item} width={20} height={20} />
                <span className="capitalize text-[#4E5458]">{item}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  className="bg-green-600 text-white px-2 rounded"
                  onClick={() => handleQuantityChange(item, -1)}
                >
                  -
                </Button>
                <span className="text-[#4E5458]">{quantities[item]}</span>
                <Button
                  className="bg-green-600 text-white px-2 rounded"
                  onClick={() => handleQuantityChange(item, 1)}
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center text-lg font-bold">
          <span>Total:</span>
          <span className="text-green-700">${totalPrice.toFixed(2)}</span>
        </div>
        <Button
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </Button>
      </div>
    </div>
  );
}
