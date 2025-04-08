"use client"

import { useState } from "react"
import { Header } from "../../components/header";
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DollarSign, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function WithdrawalPage() {
  const [totalIncome, setTotalIncome] = useState(398.0)
  const [accountName, setAccountName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [amount, setAmount] = useState("")
  const { toast } = useToast()

  const handleWithdraw = () => {
    if (!accountName || !accountNumber || !amount) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      })
      return
    }

    const withdrawAmount = Number.parseFloat(amount)
    if (isNaN(withdrawAmount) || withdrawAmount <= 0 || withdrawAmount > totalIncome) {
      toast({
        title: "Error",
        description: "Invalid amount",
        variant: "destructive",
      })
      return
    }

    // Simulate withdrawal
    setTotalIncome((prev) => prev - withdrawAmount)
    setAccountName("")
    setAccountNumber("")
    setAmount("")

    toast({
      title: "Success",
      description: `$${withdrawAmount.toFixed(2)} has been sent to your account`,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header username="Tobi" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Withdrawal</h2>
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Export
          </Button>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Total Income</p>
                  <p className="text-2xl font-bold">$ {totalIncome.toFixed(2)}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-md">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Enter Receiving Bank</h3>
                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      placeholder="Account Name"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 0 0-16 0" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <Input
                      placeholder="Account Number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 0 0-16 0" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Amount to Withdraw</h3>
                <Input placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 mt-4" onClick={handleWithdraw}>
                SEND
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

