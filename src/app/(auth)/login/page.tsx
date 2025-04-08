"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import login from "../../../../public/login.png";
import Google from "../../../../public/ic_google.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please check your credentials.");
      }

      // Store token and redirect
      localStorage.setItem("token", data.token);
      router.push("/restaurants"); // Ensure the correct route is used
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100%] w-[90%] md:w-[80%] flex items-center max-w-screen-2xl mx-auto justify-center font-inter px-4 sm:px-6 lg:px-8 rounded-[30px]"
    style={{ backgroundImage: `url('/bg.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex flex-col lg:flex-row w-full gap-8 md:gap-16 justify-center h-full items-center pr-0 md:pr-8">
        <div className="hidden lg:block lg:w-1/2 relative h-[90%] rounded-lg overflow-hidden">
          <Image src={login} alt="Login" fill objectFit="contain" className="rounded-lg h-auto w-full" />
        </div>
        <div className="w-full sm:w-3/4 md:w-1/2 max-w-[480px] space-y-6 bg-opacity-90 p-4 md:p-6 lg:p-0">
          <div className="space-y-8 text-white">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Login</h1>
            <p className="text-zinc-100">
              Don&apos;t have an account? {" "}
              <Link href="/signup" className="text-[#FFA84A] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
          <div className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="space-y-2">
              <label className="text-sm text-white">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-white pl-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white">Password</label>
              <Input
                type="password"
                placeholder="********"
                className="h-12 bg-white pl-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-right">
              <Link href="/forgotPassword" className="text-sm text-zinc-100 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button
              className="h-12 w-full bg-[#006634] text-base font-semibold hover:bg-[#006634]/90"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </Button>
            <Button variant="outline" className="h-12 w-full bg-white text-base font-semibold flex items-center justify-center gap-2">
              <Image src={Google} alt="Google" width={20} height={20} />
              Login with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
