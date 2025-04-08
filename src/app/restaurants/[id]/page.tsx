"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Main from "@/components/Page Components/Main";
import {
  Checkout,
  Summary,
  Delivery,
  Payment,
  Success,
} from "@/components/Page Components/Restaurant Page Components";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

export default function RestaurantPage() {
  const searchParams = useSearchParams();
  const sceneFromUrl = searchParams.get("scene") || "main";
  
  const [currentScene, setCurrentScene] = useState(sceneFromUrl);

  // Update the state if the URL changes
  useEffect(() => {
    setCurrentScene(sceneFromUrl);
  }, [sceneFromUrl]);

  console.log("Current Scene:", currentScene);

  const renderScene = (setCurrentScene: (scene: string) => void) => {
    switch (currentScene) {
      case "main":
        return <Main setCurrentScene={setCurrentScene} />;
      case "checkout":
        return <Checkout setCurrentScene={setCurrentScene} />;
      case "summary":
        return <Summary setCurrentScene={setCurrentScene} />;
      case "delivery":
        return <Delivery setCurrentScene={setCurrentScene} />;
      case "payment":
        return <Payment setCurrentScene={setCurrentScene} />;
      case "success":
        return <Success />;
      default:
        return <Main setCurrentScene={setCurrentScene} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <SiteHeader />
      <main className="container w-full mx-auto py-12">
        <div className="flex items-center justify-center w-full gap-4 mb-4">
          <Button onClick={() => setCurrentScene("main")}>Main</Button>
          <Button onClick={() => setCurrentScene("summary")}>Summary</Button>
          <Button onClick={() => setCurrentScene("checkout")}>Checkout</Button>
          <Button onClick={() => setCurrentScene("delivery")}>Delivery</Button>
          <Button onClick={() => setCurrentScene("payment")}>Payment</Button>
          <Button onClick={() => setCurrentScene("success")}>Success</Button>
        </div>
        {renderScene(setCurrentScene)}
      </main>
    </div>
  );
}
