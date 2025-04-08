import { Home, Users } from "lucide-react";
import { StatCard } from "@/components/stat-card";
// import { RecentOrders } from "@/components/recent-orders";
import PerformanceChart from "@/app/admin/components/performanceChart";
import { TopVendors } from "@/app/admin/components/top-vendors";
import { MostPurchased } from "@/components/most-purchased";
import { RecentOrders } from "@/components/recent-orders";

const dashboardStats = {
  success: true,
  message: "Fetched successfully",
  data: {
    customers: 11,
    vendors: 1,
    totalIncome: 30100.32,
  },
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen p-4 gap-4">
      <main className="flex-1 space-y-6">
        {/* Stats Section */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <StatCard
            title="Total Income"
            value={`$${dashboardStats.data.totalIncome.toLocaleString()}`}
            description="+30% This month"
            icon={Home}
            className="bg-blue-50"
          />
          <StatCard
            title="Total Orders"
            value="615"
            icon={Home}
            className="bg-green-50"
            seeMore
          />
          <StatCard
            title="Customers"
            value={dashboardStats.data.customers.toString()}
            icon={Users}
            className="bg-blue-50"
            seeMore
          />
        </div>
        
        {/* Performance Chart */}
        <RecentOrders/>
      </main>
      
      {/* Sidebar Section */}
      <aside className="w-full lg:w-[300px] space-y-6 mt-6 lg:mt-0">
        <TopVendors />
      </aside>
    </div>
  );
}
