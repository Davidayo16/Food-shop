"use client"

import type React from "react"

import { useEffect } from "react"
import { setupRealTimeSimulation } from "@/lib/data-service"

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Setup real-time data simulation
    setupRealTimeSimulation()
  }, [])

  return <>{children}</>
}

