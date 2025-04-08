import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-screen-sm text-center">
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>
      <h1 className="mb-2 text-2xl font-bold">Success</h1>
      <p className="mb-8 text-gray-600">Your payment was successful!</p>
      <Link href="/orders">
        <Button className="w-full bg-[#FF4500] hover:bg-[#FF4500]/90">
          Back to Orders
        </Button>
      </Link>
    </div>
  );
}
