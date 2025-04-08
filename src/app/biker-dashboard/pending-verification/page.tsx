"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";

export default function PendingVerification() {
  const router = useRouter();

  return (
    <div>
      <SiteHeader />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
          <div className="flex justify-center mb-4">
            <Image src="/pending.png" alt="Verification Icon" width={50} height={50} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Verification Pending</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Your account is under review. We will notify you once it's approved.
          </p>
          <Button
            className="mt-6 w-full bg-gray-500 text-white py-4 rounded-lg"
            onClick={() => router.push("/biker-dashboard/login")}
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
}
