import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

const transactions = [
  {
    id: "#334903",
    image: "/placeholder.svg",
    description: "Rice and Jollof Sallad",
    customer: "customer@gmail.com",
    date: "Oct 11, 2024",
    status: "Successful",
    price: "$302",
  },
  {
    id: "#PD123d",
    image: "/placeholder.svg",
    description: "Rice and Jollof Sallad",
    customer: "customer@gmail.com",
    date: "Oct 14, 2024",
    status: "Successful",
    price: "$302",
  },
  // Add more transactions as needed
]

export default function TransactionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <button className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium shadow-sm">
          Export
        </button>
      </div>
      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Item description</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={transaction.image || "/placeholder.svg"}
                      alt={transaction.description}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                    />
                    {transaction.description}
                  </div>
                </TableCell>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      transaction.status === "Successful"
                        ? "bg-green-100 text-green-600"
                        : transaction.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell>{transaction.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

