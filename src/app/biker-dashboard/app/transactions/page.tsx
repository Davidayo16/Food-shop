"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

// Simulated data
const initialTransactions = [
  { id: "QF3384", date: "14th Mar, 2024 - 12:03PM", amount: 7, status: "Successful" },
  { id: "QF3384", date: "14th Mar, 2024 - 12:03PM", amount: 7, status: "Pending" },
  { id: "QF3384", date: "14th Mar, 2024 - 12:03PM", amount: 7, status: "Successful" },
]

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(initialTransactions)

  return (
    <div className="flex flex-col min-h-screen">
      <Header username="Tobi" />

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">All Orders</h2>

        <Card>
          <CardContent className="p-0">
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-medium">
                <div className="col-span-1"></div>
                <div className="col-span-3">Order description</div>
                <div className="col-span-3">Date</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-3">Payment Status</div>
              </div>

              {transactions.map((transaction, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                  <div className="col-span-1">
                    <Checkbox />
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="bg-green-50 p-1 rounded-md">
                      <div className="relative w-6 h-6">
                        <div className="absolute inset-0 bg-green-600 rounded-md flex items-center justify-center">
                          <span className="text-white font-bold text-xs">QFS</span>
                        </div>
                      </div>
                    </div>
                    <span className="font-medium">{transaction.id}</span>
                  </div>
                  <div className="col-span-3 text-gray-600">{transaction.date}</div>
                  <div className="col-span-2 font-medium">${transaction.amount}</div>
                  <div className="col-span-3">
                    {transaction.status === "Successful" ? (
                      <Badge className="bg-green-100 text-green-600 hover:bg-green-100">{transaction.status}</Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-100">{transaction.status}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

