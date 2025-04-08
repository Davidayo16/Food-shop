import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import PendingVerificationAlert from "@/components/PendingVerificationAlert";

export default function PendingVerification() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
        <div className="flex justify-center mb-4">
          <Image src="/pending.png" alt="Verification Icon" width={50} height={50} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Pending Verification</h2>
        <p className="text-gray-600 mt-2 text-sm">
          Your account is awaiting verification. You will be notified about your status soon.
        </p>
        <Button
          className="mt-6 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
          onClick={() => router.push("/")}
        >
          BACK TO HOME
        </Button>
      </div>
    </div>
  );
}
