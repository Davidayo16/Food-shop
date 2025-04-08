import Image from "next/image"
import { Star } from "lucide-react"

interface PurchasedItem {
  id: string
  name: string
  restaurant: string
  rating: number
  reviews: number
  image: string
}

const items: PurchasedItem[] = [
  {
    id: "1",
    name: "Rice and Jollof Sallad",
    restaurant: "Open Sea Restaurant",
    rating: 4.5,
    reviews: 28,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Rice and Jollof Sallad",
    restaurant: "Open Sea Restaurant",
    rating: 4.5,
    reviews: 28,
    image: "/placeholder.svg",
  },
]

export function MostPurchased() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Most Purchased Items</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-lg border p-4">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-lg"
            />
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.restaurant}</p>
              <div className="mt-1 flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">
                  {item.rating} ({item.reviews})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

