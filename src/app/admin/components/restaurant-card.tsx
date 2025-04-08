import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RestaurantCardProps {
  id: string
  name: string
  image: string
  location: string
  rating: number
  reviews: number
  deliveryTime: string
  price: string
  isAvailable?: boolean
}

export function RestaurantCard({
  id,
  name,
  image,
  location,
  rating,
  reviews,
  deliveryTime,
  price,
  isAvailable = true,
}: RestaurantCardProps) {
  return (
    <div className="group relative rounded-lg border bg-white p-2">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <div className="absolute right-2 top-2 z-10">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={300}
          height={300}
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 rounded-full bg-white px-2 py-1 text-xs">
          {isAvailable ? (
            <span className="text-green-600">Available</span>
          ) : (
            <span className="text-red-600">Out of stock</span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{location}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">
              {rating} ({reviews})
            </span>
          </div>
          <span className="text-sm text-muted-foreground">{deliveryTime}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-medium">From {price}</span>
          <Link href={`/restaurants/${id}`}>
            <Button size="sm" className="rounded-full bg-green-600">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

