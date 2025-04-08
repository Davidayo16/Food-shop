"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import heroImage from "../../public/Hero.png";
import appMockup from "../../public/app-mockup.png";
import fresh from "../../public/fresh-foods.png";
import one from "../../public/pic1.png";
import two from "../../public/pic2.png";
import three from "../../public/pic3.png";
import qr from "../../public/qr.png";
import android from "../../public/image 65.png";
import ios from "../../public/image 66.png";
import vendor from "../../public/vendor.png";
import dispatch from "../../public/dispatch.png";
// import bg from "../../public/bg.png";
// import { Nav } from "@/Global/Nav";
// import { Nav } from "@/Global/Navbar";
import { SiteHeader } from "@/components/site-header";


export default function LandingPage() {
  return (
    <div className="bg-white font-inter">
     <SiteHeader/>
     <section
  className="relative w-[100%] h-screen flex items-center justify-center text-white text-center p-8  mx-auto"
  style={{ backgroundImage: `url('/bg.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
>
        {/* Left Side: Image */}
      <div className="w-1/2 h-full hidden lg:flex  items-cover justify-center">
        <Image
          src={heroImage}
          alt="Fresh Food"
          className="object-cover w-1/2 h-auto rounded-lg top-2"
        />
      </div>

     {/* Right Side: Text */}
<div className="relative w-full object-contain lg:w-1/2 text-center lg:text-left max-w-3xl">
  {/* Text Section */}
  <h1 className="text-5xl font-bold leading-tight relative z-10">
    Raw & Fresh Food  <br />
    <span className="text-[#FFC859] font-inter font-medium text-[40px] leading-[49px]">
      Delivered to You
    </span> 
  </h1>

  <p className="font-inter text-[16px] mt-2 relative z-10">
    Get fresh and organic food delivered straight to your doorstep.
  </p>

  {/* Input Field - Kept its Position but Layered Over Image */}
  <div className="relative flex items-center w-full max-w-lg bg-white border border-gray-200 rounded-full shadow-sm z-20">
    {/* Search Icon */}
    <span className="absolute left-4 text-gray-400">
      <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.69314 2.76953C8.442 2.76964 7.20902 3.06894 6.09707 3.64248C4.98513 4.21601 4.02646 5.04715 3.30105 6.06653C2.57565 7.08592 2.10454 8.26401 1.92703 9.50249C1.74952 10.741 1.87076 12.004 2.28063 13.1861C2.6905 14.3682 3.37712 15.4351 4.28321 16.2979C5.18929 17.1607 6.28856 17.7942 7.48931 18.1458C8.69006 18.4973 9.95746 18.5566 11.1858 18.3187C12.4141 18.0808 13.5677 17.5526 14.5504 16.7781L17.9214 20.1492C18.0955 20.3174 18.3287 20.4104 18.5707 20.4083C18.8128 20.4062 19.0443 20.3091 19.2154 20.138C19.3866 19.9668 19.4837 19.7353 19.4858 19.4933C19.4879 19.2513 19.3948 19.0181 19.2267 18.844L15.8556 15.4729C16.7676 14.3159 17.3354 12.9256 17.4942 11.461C17.6529 9.99635 17.396 8.51663 16.753 7.19116C16.1101 5.86569 15.1069 4.74801 13.8583 3.96605C12.6098 3.18409 11.1663 2.76943 9.69314 2.76953ZM3.69314 10.6157C3.69314 9.02439 4.32528 7.49826 5.4505 6.37304C6.57572 5.24783 8.10184 4.61569 9.69314 4.61569C11.2844 4.61569 12.8106 5.24783 13.9358 6.37304C15.061 7.49826 15.6931 9.02439 15.6931 10.6157C15.6931 12.207 15.061 13.7331 13.9358 14.8583C12.8106 15.9835 11.2844 16.6157 9.69314 16.6157C8.10184 16.6157 6.57572 15.9835 5.4505 14.8583C4.32528 13.7331 3.69314 12.207 3.69314 10.6157Z" fill="#C4C4C4"/>
      </svg>
    </span>

    {/* Input Field */}
    <input
      type="text"
      placeholder="What’s your address"
      className="w-full py-3 pl-12 pr-36 text-gray-600 placeholder-gray-400 bg-transparent outline-none"
    />

    {/* Location Button */}
    <button className="absolute right-2 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200">
      <span className="text-green-500">
        <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.262 20.134C7.262 20.134 0 14.018 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 14.018 8.738 20.134 8.738 20.134C8.334 20.506 7.669 20.502 7.262 20.134ZM8 11.5C8.45963 11.5 8.91475 11.4095 9.33939 11.2336C9.76403 11.0577 10.1499 10.7999 10.4749 10.4749C10.7999 10.1499 11.0577 9.76403 11.2336 9.33939C11.4095 8.91475 11.5 8.45963 11.5 8C11.5 7.54037 11.4095 7.08525 11.2336 6.66061C11.0577 6.23597 10.7999 5.85013 10.4749 5.52513C10.1499 5.20012 9.76403 4.94231 9.33939 4.76642C8.91475 4.59053 8.45963 4.5 8 4.5C7.07174 4.5 6.1815 4.86875 5.52513 5.52513C4.86875 6.1815 4.5 7.07174 4.5 8C4.5 8.92826 4.86875 9.8185 5.52513 10.4749C6.1815 11.1313 7.07174 11.5 8 11.5Z" fill="#23C55E"/>
        </svg>
      </span>
      <span className="text-sm font-medium">Use current location</span>
    </button>
  </div>

  {/* Right-Aligned Image (More Out of Frame) */}
  <div className="absolute inset-0 w-full h-full flex justify-end items-center -right-64 z-0">
    <Image
      src={fresh}
      alt="Fresh Food"
      className="w-[400px] h-auto object-contain rounded-xl opacity-90"
    />
  </div>
</div>



  </section>


      {/* Features Section */}
      <section className="py-16 px-8 text-center">
  <h2 className="text-4xl font-bold text-green-900">Why Choose Us?</h2>
  <div className="flex flex-wrap justify-center items-center gap-12 mt-8">
    {/* Feature 1 */}
    <div className="max-w-xs flex flex-col items-center text-center">
      <Image 
        className="object-contain" 
        src={one} 
        alt="Healthy Food" 
        width={120} 
        height={120} 
      />
      <h3 className="text-2xl text-[#FF6600] font-semibold mt-4">Delicious Food</h3>
      <p className="text-[#1A1A1A]">Enjoy delicious food from a variety of restaurants near you!</p>
    </div>

    {/* Feature 2 */}
    <div className="max-w-xs flex flex-col items-center text-center">
      <Image 
        className="object-contain" 
        src={two} 
        alt="Best Chefs" 
        width={120} 
        height={120} 
      />
      <h3 className="text-2xl text-[#FF6600]  font-semibold mt-4">Top Restaurant Near You</h3>
      <p className="text-[#1A1A1A]">Order from a variety of top restaurants in your city.</p>
    </div>

    {/* Feature 3 */}
    <div className="max-w-xs flex flex-col items-center text-center">
      <Image 
        className="object-contain" 
        src={three} 
        alt="Fast Delivery" 
        width={120} 
        height={120} 
      />
      <h3 className="text-2xl text-[#FF6600]  font-semibold mt-4">Groceries</h3>
      <p className="text-[#1A1A1A]">Find fresh groceries from stores near you, delivered to you!</p>
    </div>
  </div>
</section>



<section className="bg-[#F0FFF0] py-[100px] px-8 flex flex-col lg:flex-row items-center justify-center text-center lg:text-left">
  {/* Text Section */}
  <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:pl-28">
    <h2 className="text-4xl font-bold text-[#1A1A1A]">Download our App</h2>
    <p className="text-[#1A1A1A] text-sm leading-relaxed">
      Download our online app today and start placing your <br /> orders now!
    </p>

    {/* Download Buttons & QR Code Container */}
    <div className="flex flex-col lg:flex-col items-center lg:items-start mt-6 gap-5">
      {/* Download Buttons */}
      <div className="flex flex-col lg:flex-row justify-center lg:justify-start gap-5">
        <Image src={android} alt="android" className="w-[150px] h-auto" />
        <Image src={ios} alt="ios" className="w-[150px] h-auto" />
      </div>

      {/* QR Code (Below Download Buttons on Large Screens) */}
      <Image 
        className="object-contain mt-4" 
        src={qr} 
        alt="qr code" 
        width={120} 
        height={120} 
      />
    </div>
  </div>

  {/* Image Section */}
  <div className="w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0">
    <Image 
      src={appMockup} 
      alt="App Mockup" 
      className="w-[80%] max-w-[600px] h-auto object-contain"
    />
  </div>
</section>


  {/* Mission Section */}
  <section className="py-16 px-8 text-center">
  <h2 className="text-4xl font-bold text-[#1A1A1A]">Join our mission!</h2>
  <div className="flex flex-wrap justify-center items-center gap-12 mt-8">
    {/* Feature 1 */}
    <div className="max-w-xs flex flex-col items-center text-center">
      <Image 
        className="object-contain" 
        src={vendor} 
        alt="vendor" 
        width={170} 
        height={170} 
      />
      <h3 className="text-2xl text-[#FF6600] font-semibold mt-4">Register as Vendor</h3>
      <p className="text-[#1A1A1A]">Enjoy delicious food from a variety of restaurants near you!</p>
    </div>

    {/* Feature 2 */}
    <div className="max-w-xs flex flex-col items-center text-center">
      <Image 
        className="object-contain" 
        src={dispatch} 
        alt="dispatch" 
        width={170} 
        height={170} 
      />
      <h3 className="text-2xl text-[#FF6600]  font-semibold mt-4">Register as Dispatch</h3>
      <p className="text-[#1A1A1A]">Coming Soon!Coming Soon!Coming Soon!</p>
    </div>
  </div>
</section>


    </div>
  );
}
