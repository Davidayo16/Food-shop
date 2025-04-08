import { ChevronDown, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png"

export function NavBar() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between bg-[#0B3424] px-4 py-2 text-white">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1">
            Eng
            <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-1">
            Location
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span>Get 20% off selected food items</span>
          <Link href="/shop" className="text-[#FFA500]">
            Shop Now
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1">
            Eng
            <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-1">
            Location
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between border-b px-4 py-3">
        <Link href="/">
          <Image
            src={Logo}
            alt="Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/onboard" className="flex items-center gap-1">
            <User className="h-5 w-5" />
            Account
          </Link>
          <Link href="/cart" className="flex items-center gap-1">
            <ShoppingCart className="h-5 w-5" />
            Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
