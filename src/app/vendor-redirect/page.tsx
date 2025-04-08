"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function VendorRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vendorId = searchParams.get("vendorId");
  const isApproved = searchParams.get("isApproved") === "true";

  useEffect(() => {
    if (!vendorId) {
      router.replace("/vendor/login");
      return;
    }

    const isFirstTimeLogin = localStorage.getItem(`firstTimeLogin_${vendorId}`);

    if (isApproved) {
      if (!isFirstTimeLogin) {
        localStorage.setItem(`firstTimeLogin_${vendorId}`, "true");
        router.replace("/vendor/successful-verification");
      } else {
        router.replace("/vendor/dashboard");
      }
    } else {
      router.replace("/vendor/pending-verification");
    }
  }, [isApproved, vendorId, router]);

  return null;
}

export default function VendorRedirect() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VendorRedirectContent />
    </Suspense>
  );
}
