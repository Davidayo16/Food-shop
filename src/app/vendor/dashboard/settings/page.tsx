import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <div className="grid gap-4">
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notification</Label>
                  <p className="text-sm text-gray-500">Receive emails about your orders</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notification</Label>
                  <p className="text-sm text-gray-500">Receive text messages about your orders</p>
                </div>
                <Switch id="sms-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notification</Label>
                  <p className="text-sm text-gray-500">Receive push notifications about your orders</p>
                </div>
                <Switch id="push-notifications" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

