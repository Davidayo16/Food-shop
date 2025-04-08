"use client";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  baseItem: string;
  basePrice: number;
  extras: {
    name: string;
    quantity: number;
    price: number;
    category: string;
    image: string;
  }[];
  total: number;
  quantity: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart) || [];
        const updatedCart = parsedCart.map((item: any, index: number) => ({
          id: index + 1,
          quantity: item.quantity || 1,
          ...item,
        }));
        setCart(updatedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCart([]);
      }
    }
  }, []);

  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1, total: item.total + item.basePrice } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1, total: item.total - item.basePrice }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.total, 0) || 0;

  const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  // 🚀 Function to check item availability before checkout
  const checkItemAvailability = async () => {
    try {
      const res = await fetch("https://app.quickfoodshop.co.uk/v1/items/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ items: cart.map(item => ({ id: item.id, quantity: item.quantity })) }),
      });

      const data = await res.json();
      console.log("🔍 Item Availability Response:", data);

      if (!res.ok) throw new Error(data.message || "Item availability check failed");

      return data.available;
    } catch (error) {
      console.error("⚠️ Error checking item availability:", error);
      return false;
    }
  };

  // 🚀 Function to send cart data to backend
  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to place an order.");
      return router.push("/login");
    }

   
   

    setLoading(true);
    try {
      const formattedCart = cart.map(item => ({
        id: item.id, 
        name: item.baseItem, 
        price: item.basePrice,
        quantity: item.quantity,
        extras: item.extras.map(extra => ({
          name: extra.name,
          quantity: extra.quantity,
          price: extra.price
        }))
      }));

      const orderData = {
        customerId: localStorage.getItem("customerId"),
        items: formattedCart,
        subtotal,
        tax: 200,
        total: subtotal + 200,
      };

      console.log("🚀 Sending order data:", JSON.stringify(orderData, null, 2));

      const res = await fetch("https://app.quickfoodshop.co.uk/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      console.log("🔍 API Response:", data);

      if (!res.ok) throw new Error(data.message || "Failed to place order");

      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      router.push("/delivery");
    } catch (error) {
      console.error("⚠️ Error placing order:", error);
      alert(error instanceof Error ? error.message : "Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SiteHeader />
      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
        <div className="md:w-2/3 bg-white p-4 rounded-lg shadow w-full">
          <h2 className="text-lg font-semibold mb-4">My Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="border-t border-gray-300">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between border-b py-4 gap-2">
                  <img
                    src={item.extras[0]?.image || "/default.png"}
                    alt={item.baseItem}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-lg"
                  />
                  <div className="flex-1 min-w-[120px]">
                    <h3 className="font-medium text-sm md:text-base">{item.baseItem}</h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      Includes: {item.extras.map((extra) => `${extra.name} x${extra.quantity}`).join(", ")}
                    </p>
                  </div>
                  <p className="font-semibold text-green-600 text-sm md:text-base">{formatNaira(item.total)}</p>
                  <div className="flex items-center gap-1 md:gap-2">
                    <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-gray-200 rounded-md">-</button>
                    <span className="font-medium text-sm md:text-base">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 bg-gray-200 rounded-md">+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-600 text-xs md:text-base">
                    🗑
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:w-1/3 bg-white p-4 rounded-lg shadow w-full">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="border-t border-gray-300 py-4">
            {cart.map((item) => (
              <div key={item.id} className="mb-2 text-sm md:text-base">
                <div className="flex justify-between">
                  <p>{item.baseItem}</p>
                  <p className="font-semibold">{formatNaira(item.total)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 pt-4 text-sm md:text-base">
            <div className="flex justify-between text-lg font-bold mt-4">
              <p>Total:</p>
              <p>{formatNaira(subtotal + 200)}</p>
            </div>
            <button 
              className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 font-semibold"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "CONTINUE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
