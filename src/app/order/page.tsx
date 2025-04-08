"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

// Wrapper component with Suspense
const FoodOrderUI = () => {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading meal options...</div>}>
      <FoodOrderContent />
    </Suspense>
  );
};

// Main component with all your existing logic
const FoodOrderContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const basePrice = parseFloat(searchParams.get("price") || "0");

  const [extras, setExtras] = useState([
    { name: "Beef", quantity: 1, price: 50, category: "protein", image: "/beef.png" },
    { name: "Fish", quantity: 0, price: 70, category: "protein", image: "/beef.png" },
    { name: "Water", quantity: 1, price: 10, category: "drink", image: "/beef.png" },
    { name: "Cola", quantity: 0, price: 20, category: "drink", image: "/beef.png" },
  ]);

  const handleIncrement = (name) => {
    setExtras((prevExtras) =>
      prevExtras.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (name) => {
    setExtras((prevExtras) =>
      prevExtras.map((item) =>
        item.name === name && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    const extrasTotal = extras.reduce((sum, item) => sum + item.quantity * item.price, 0);
    return basePrice + extrasTotal;
  };

  const handleAddToCart = () => {
    const selectedItems = extras.filter((item) => item.quantity > 0);
    const cartItem = {
      baseItem: "Fried Rice & Chicken",
      basePrice,
      extras: selectedItems,
      total: calculateTotal(),
    };
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = Array.isArray(existingCart) ? [...existingCart] : [];
    updatedCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    router.push("/cart");
  };

  const proteins = extras.filter((item) => item.category === "protein");
  const drinks = extras.filter((item) => item.category === "drink");

  const renderExtras = (title, items) =>
    items.length > 0 && (
      <>
        <h4 className="mt-4 font-semibold">{title}</h4>
        <div className="mt-2 space-y-2">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center bg-transparent p-4 border border-[#C6E3E5] rounded-[20px]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-8 h-8 rounded-lg object-cover p-1"
              />
              <span className="flex w-2/3 gap-2">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-600">x {item.quantity}</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrement(item.name)}
                  className="p-1 border rounded hover:bg-gray-100 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <button
                  onClick={() => handleIncrement(item.name)}
                  className="p-1 border rounded hover:bg-gray-100 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );

  return (
    <div>
      <SiteHeader />
      <div className="bg-white w-[95%] md:w-[80%] h-auto mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row border border-[#C6E3E5] gap-6 mt-6 bg-transparent p-4 md:p-6 rounded-lg shadow-md">
          <div className="w-full md:w-1/2">
            <img src="/food.png" alt="Fried Rice & Chicken" className="w-full rounded-lg object-cover" />
            <div className="mt-4 text-center md:text-left">
              <h2 className="text-lg md:text-2xl font-bold">Fried Rice & Chicken</h2>
              <p className="text-gray-600 text-sm my-2">A plate of Jollof Rice with Assorted Meat and Fish.</p>
              <div className="grid grid-cols-3 md:flex items-center justify-center gap-4 md:gap-6 mt-4">
                <div className="text-center">
                  <img src="/clock.png" alt="Clock" className="w-6 h-6 mx-auto" />
                  <span className="text-green-600 text-sm block">25 min</span>
                </div>
                <div className="text-center">
                  <img src="/location.png" alt="Location" className="w-6 h-6 mx-auto" />
                  <span className="text-green-600 text-sm block">Birmingham</span>
                </div>
                <div className="text-center">
                  <img src="/ratings.png" alt="Rating" className="w-6 h-6 mx-auto" />
                  <span className="text-green-600 text-sm block">4.5</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[40%] mt-4 md:mt-0 p-4 border rounded-lg">
            <h3 className="text-lg font-bold">Add Extras</h3>
            {renderExtras("Proteins", proteins)}
            {renderExtras("Drinks", drinks)}
            <div className="mt-6">
              <p className="text-lg font-semibold">Total: ₦{calculateTotal().toFixed(2)}</p>
              <button className="w-full bg-[#006634] text-white py-2 rounded-md mt-2 hover:bg-[#005529] transition-colors" onClick={handleAddToCart}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodOrderUI;
