import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, Phone, Twitter } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Support</h2>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
            <p className="text-gray-500 mb-6">You can reach us via any of our platforms for help and further enquiry</p>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Chat with us on social media!</h4>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Call us!</h4>
                <div className="flex items-center gap-2 rounded-lg border p-4">
                  <Phone className="h-4 w-4" />
                  <div>
                    <p className="font-medium">+234 903 3484 3947</p>
                    <p className="text-sm text-gray-500">Customer Care Line</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

