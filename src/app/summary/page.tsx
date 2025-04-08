"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Auth from "@/lib/API/Auth";

type Order = {
  _id: string;
  userId: string;
  vendorId: string;
  orderStatus: string;
  orderId: string;
  totalAmount: number;
  deliveryAddress: string;
  estimatedDeliveryTime: string;
  paymentStatus: string;
};

const SummaryPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(Auth.getToken());
      setCustomerId(Auth.getCustomerId());
    }
  }, []);

  useEffect(() => {
    if (!customerId || !token) {
      console.warn("User not authenticated! Redirecting to login...");
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://app.quickfoodshop.co.uk/v1/orders/customers/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response:", errorData);

          if (response.status === 401) {
            Auth.logout();
            router.push("/login");
            return;
          }

          if (response.status === 404) {
            setOrders([]);
            return;
          }

          throw new Error(errorData?.message || `Error ${response.status}`);
        }

        const data = await response.json();
        setOrders(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (token && customerId) {
      fetchOrders();
    }
  }, [customerId, token, router]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Order Summary</h1>
      {orders.length === 0 ? (
        <p>No orders found for this account.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <strong>Order ID:</strong> {order.orderId} <br />
              <strong>Status:</strong> {order.orderStatus} <br />
              <strong>Amount:</strong> ${order.totalAmount.toFixed(2)} <br />
              <strong>Payment:</strong> {order.paymentStatus} <br />
              <strong>Delivery:</strong> {order.deliveryAddress} ({order.estimatedDeliveryTime}) <br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SummaryPage;
