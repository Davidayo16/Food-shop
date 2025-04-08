import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

const transactions = [
  {
    id: "#334903",
    image: "/placeholder.svg",
    description: "Rice and Jollof Salad",
    customer: "customer@gmail.com",
    date: "Oct 11, 2024",
    status: "Successful",
    price: "$302",
  },
  {
    id: "#PD123d",
    image: "/placeholder.svg",
    description: "Rice and Jollof Salad",
    customer: "customer@gmail.com",
    date: "Oct 14, 2024",
    status: "Pending",
    price: "$302",
  },
];

export default function TransactionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <button className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium shadow-sm">
          Export
        </button>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Item Description</TableHead>
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
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      transaction.status === "Successful"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
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
      
      {/* Mobile Card View */}
      <div className="md:hidden space-y-2">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-4 bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <Image
                src={transaction.image || "/placeholder.svg"}
                alt={transaction.description}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h3 className="text-sm font-medium">{transaction.description}</h3>
                <p className="text-xs text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{transaction.price}</p>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  transaction.status === "Successful"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {transaction.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
