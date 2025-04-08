"use client";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import FoodItemCard from "@/components/FoodItemCard";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

const foodItems = [
  { id: "1", name: "Fried Rice & Chicken", image: "/basket1.png", price: 2500, delieveryTime: 45, outOfStock: false },
  { id: "2", name: "Fried Rice & Chicken", image: "/basket1.png", price: 2500, delieveryTime: 27, outOfStock: true },
  { id: "3", name: "Fried Rice & Chicken", image: "/basket1.png", price: 2500, delieveryTime: 9, outOfStock: false },
  { id: "4", name: "Fried Rice & Chicken", image: "/basket1.png", price: 2500, delieveryTime: 24, outOfStock: false },
];

export default function RestaurantPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Restaurants");
  const [priceFilter, setPriceFilter] = useState("");

  return (
    <div>
      <SiteHeader />

      {/* Banner Section */}
      <div className="bg-[#F0FFF0] w-[90%] mx-auto mt-10 p-6 rounded-lg text-center flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-bold text-[#006634]">Grab Up to 50% off on orders for fresh food items</h2>
          <Button className="mt-2 bg-[#006634] text-white">BUY NOW</Button>
        </div>
        <img src="/chef.png" alt="Chef" className="h-24 w-auto " />
      </div>

      <main className="mx-auto mt-6 max-w-screen-xl px-4">
        <div className="border-b border-gray-300 pb-2">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex space-x-6 overflow-x-auto">
              {["Food", "Fresh Items", "Restaurants"].map((tab) => (
                <span
                  key={tab}
                  className={`cursor-pointer pb-2 whitespace-nowrap ${activeTab === tab ? "border-b-2 border-green-500 font-medium" : "text-gray-500"}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center space-x-4 gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search food item"
                  className="pl-9 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <span>Price</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setPriceFilter("Low to High")}>Low to High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceFilter("High to Low")}>High to Low</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
        </div>

        <section className="py-8">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {foodItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
              <FoodItemCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
