import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { KPICards } from "@/components/dashboard/kpi-cards";
import { ProjectProgress } from "@/components/dashboard/project-progress";
import { QuickAlerts } from "@/components/dashboard/quick-alerts";
import { Charts } from "@/components/dashboard/charts";
import { useRole } from "@/contexts/role-context";
import { type Project, type Alert, type Vendor, type File } from "@shared/schema";

export default function Dashboard() {
  const { currentRole } = useRole();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["/api/projects"],
  });

  const { data: alerts, isLoading: alertsLoading } = useQuery({
    queryKey: ["/api/alerts"],
  });

  const { data: vendors, isLoading: vendorsLoading } = useQuery({
    queryKey: ["/api/vendors"],
  });

  const { data: files, isLoading: filesLoading } = useQuery({
    queryKey: ["/api/files"],
  });

  if (statsLoading || projectsLoading || alertsLoading || vendorsLoading || filesLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rdso-saffron"></div>
      </div>
    );
  }

  // Prepare chart data
  const vendorStatusData = [
    { name: "Approved", value: stats?.vendors?.approved || 0, color: "#138808" },
    { name: "Pending", value: stats?.vendors?.pending || 0, color: "#FF9933" },
    { name: "Rejected", value: stats?.vendors?.rejected || 0, color: "#EF4444" },
    { name: "Under Review", value: (vendors?.filter((v: any) => v.status === "Under Review").length) || 0, color: "#8B5CF6" },
  ];

  const fileDelaysData = [
    { name: "0-3 Days", value: files?.filter((f: any) => f.pendingDays <= 3).length || 0 },
    { name: "4-7 Days", value: files?.filter((f: any) => f.pendingDays > 3 && f.pendingDays <= 7).length || 0 },
    { name: "8-15 Days", value: files?.filter((f: any) => f.pendingDays > 7 && f.pendingDays <= 15).length || 0 },
    { name: ">15 Days", value: files?.filter((f: any) => f.pendingDays > 15).length || 0 },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back, <span className="font-medium">Rajesh Kumar</span>. Here's what's happening at RDSO today.
            <span className="ml-2 text-sm bg-rdso-saffron text-white px-2 py-1 rounded-full">
              {currentRole}
            </span>
          </p>
        </div>

        {/* KPI Cards */}
        {stats && <KPICards data={stats} />}

        {/* Charts and Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {projects && <ProjectProgress projects={projects} />}
          {alerts && <QuickAlerts alerts={alerts} />}
        </div>

        {/* Additional Dashboard Widgets */}
        <Charts vendorData={vendorStatusData} fileDelaysData={fileDelaysData} />
      </motion.div>
    </main>
  );
}
