import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"

export default function PasswordSettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Change Password</h2>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20764%20(6)-lH8p5YhybxGt7dlia1b81S7bIIvlr0.png"
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full"
              />
              <h3 className="text-xl font-semibold">Tobi Makinde</h3>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Link href="/settings">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button>Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

