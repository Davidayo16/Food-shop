"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Check } from "lucide-react"

interface DeliverySuccessModalProps {
  open: boolean
  onClose: () => void
  orderId: string
}

export function DeliverySuccessModal({ open, onClose, orderId }: DeliverySuccessModalProps) {
  const router = useRouter()

  const handleBackToDashboard = () => {
    onClose()
    router.push("/")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Delivery Successful !</h2>
          <p className="text-gray-600 mb-6">
            Order #{orderId} has been
            <br />
            successfully delivered
          </p>

          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleBackToDashboard}>
            Back to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

