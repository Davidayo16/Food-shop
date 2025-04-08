"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";

export default function SuccessfulVerification() {
  const router = useRouter();

  return (
    <div>
      <SiteHeader />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
          <div className="flex justify-center mb-4">
            <Image src="/Approved.png" alt="Verification Icon" width={50} height={50} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Verification Successful!</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Congratulations, your account has been verified successfully!
          </p>
          <Button
            className="mt-6 w-full bg-[#006634] text-white py-4 rounded-lg hover:bg-green-800"
            onClick={() => router.push("/vendor/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
