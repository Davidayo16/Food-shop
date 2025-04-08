import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  className?: string
  seeMore?: boolean
  onSeeMore?: () => void
}

export function StatCard({ title, value, description, icon: Icon, className, seeMore, onSeeMore }: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-semibold">{value}</h3>
            {description && <p className="mt-1 text-sm text-green-500">{description}</p>}
          </div>
          <Icon className="h-6 w-6 text-gray-400" />
        </div>
        {seeMore && (
          <button onClick={onSeeMore} className="mt-4 text-sm text-green-500 hover:underline">
            See more →
          </button>
        )}
      </CardContent>
    </Card>
  )
}

