"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessfulSignup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
          <svg width="143" height="142" viewBox="0 0 143 142" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_12419)">
<rect x="30.5" y="20" width="82" height="82" rx="41" fill="#006634"/>
</g>
<path d="M58.9727 61.569L67.7041 70.1107L85.1671 53.0273" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
<defs>
<filter id="filter0_d_1_12419" x="0.5" y="0" width="142" height="142" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="10"/>
<feGaussianBlur stdDeviation="15"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.25098 0 0 0 0 0.74902 0 0 0 0 1 0 0 0 0.24 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_12419"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_12419" result="shape"/>
</filter>
</defs>
</svg>

          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-4">Account Created</h2>
        <p className="text-gray-600 mt-2">Your account has been created successfully.</p>
        <Link href="/login">
          <button className="mt-4 w-3/4 bg-[#006634] text-white py-2 rounded-lg text-lg font-semibold hover:bg-[#004d26]">
            GO TO LOGIN
          </button>
        </Link>
      </div>
    </div>
  );
}
