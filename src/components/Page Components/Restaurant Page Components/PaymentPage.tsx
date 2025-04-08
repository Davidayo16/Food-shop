import { CheckoutProgress } from "@/components/checkout-progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface PaymentPageProps {
  setCurrentScene: (scene: string) => void; // Define the type for setCurrentScene
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PaymentPage({ setCurrentScene }: PaymentPageProps) {
  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="mb-12">
        <CheckoutProgress currentStep="payment" />
      </div>
      <div className="space-y-8">
        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Payment Details</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name on Card</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
          </div>
        </div>
        <Link href="/checkout/success">
          <Button className="w-full bg-[#FF4500] hover:bg-[#FF4500]/90">
            PAY NOW
          </Button>
        </Link>
      </div>
    </div>
  );
}
