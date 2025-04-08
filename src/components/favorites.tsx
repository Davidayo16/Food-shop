import Image from "next/image"
import { Trash2 } from "lucide-react"

interface FavoriteItem {
  id: string
  name: string
  restaurant: string
  price: number
  image: string
}

const favorites: FavoriteItem[] = [
  {
    id: "1",
    name: "Rice and Jollof Sallad",
    restaurant: "Open Sea Restaurant",
    price: 150.0,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Rice and Jollof Sallad",
    restaurant: "Open Sea Restaurant",
    price: 150.0,
    image: "/placeholder.svg",
  },
]

export function Favorites() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Favourites</h2>
      <div className="space-y-4">
        {favorites.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 rounded-lg border p-4">
            <div className="flex items-center gap-4">
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
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500">${item.price}</span>
              <button className="text-red-500">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

