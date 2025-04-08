import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

interface Order {
  id: string
  image: string
  description: string
  customer: string
  price: number
  date: string
  status: "Successful" | "Pending" | "Failed"
}

const orders: Order[] = [
  {
    id: "1",
    image: "/placeholder.svg",
    description: "Rice and Jollof Sallad",
    customer: "customer@gmail.com",
    price: 302,
    date: "Oct 11, 2024",
    status: "Successful",
  },
  {
    id: "2",
    image: "/placeholder.svg",
    description: "Fried rice an Chicken",
    customer: "customer@gmail.com",
    price: 302,
    date: "Oct 11, 2024",
    status: "Pending",
  },
  {
    id: "3",
    image: "/placeholder.svg",
    description: "Roasted Beef",
    customer: "customer@gmail.com",
    price: 302,
    date: "Oct 11, 2024",
    status: "Failed",
  },
]

export function RecentOrders() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Orders</h2>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Item description</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Order Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={order.image || "/placeholder.svg"}
                      alt={order.description}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                    />
                    {order.description}
                  </div>
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>${order.price}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      order.status === "Successful"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

