import { ChevronDown, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png"

export function Nav() {
  return (
    <div className="w-full">
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
