import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download } from "lucide-react"
import Image from "next/image"

const invoices = [
  {
    id: "#334903",
    image: "/placeholder.svg",
    description: "Rice and Jollof Sallad",
    customer: "customer@gmail.com",
    date: "Oct 11, 2024",
    status: "Paid",
    price: "$302",
  },
  {
    id: "#PD123d",
    image: "/placeholder.svg",
    description: "Rice and Jollof Sallad",
    customer: "customer@gmail.com",
    date: "Oct 14, 2024",
    status: "Paid",
    price: "$302",
  },
  // Add more invoices as needed
]

export default function InvoicePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Invoice</h2>
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
              <TableHead>Invoice ID</TableHead>
              <TableHead>Item description</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={invoice.image || "/placeholder.svg"}
                      alt={invoice.description}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                    />
                    {invoice.description}
                  </div>
                </TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      invoice.status === "Paid" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell>{invoice.price}</TableCell>
                <TableCell>
                  <button className="rounded-lg p-2 hover:bg-gray-100">
                    <Download className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

