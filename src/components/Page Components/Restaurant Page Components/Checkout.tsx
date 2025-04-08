import { CheckoutProgress } from "@/components/checkout-progress";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";

interface CheckoutPageProps {
  setCurrentScene: (scene: string) => void; // Define the type for setCurrentScene
}

export default function CheckoutPage({ setCurrentScene }: CheckoutPageProps) {
  return (
    <div className="min-h-screen max-w-screen-sm mx-auto  bg-gray-50">
      <main className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-2xl font-bold">Checkout</h1>
          <div className="mb-12">
            <CheckoutProgress currentStep="delivery" />
          </div>
          <div className="space-y-8">
            <div className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">Delivery Address</h2>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <MapPin className="h-5 w-5 text-green-600" />
                <div>
                  <p>49 Woodhall Hills Golf Club, LONDON</p>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>25 min</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Onion</span>
                  <span>$150.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Garlic</span>
                  <span>$150.00</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>$350.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Est Tax</span>
                    <span>$2.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>$12.22</span>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={() => setCurrentScene("summary")}>
              Go to Summary
            </Button>
            <Button onClick={() => setCurrentScene("delivery")}>
              Go to Delivery
            </Button>
            <Button className="w-full bg-[#FF4500] hover:bg-[#FF4500]/90">
              CONTINUE
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
