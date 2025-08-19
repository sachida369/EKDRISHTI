import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FolderOpen, FileText, ShoppingBag } from "lucide-react";

interface KPIData {
  employees: {
    total: number;
    present: number;
    absent: number;
    field: number;
  };
  projects: {
    total: number;
    onTrack: number;
    delayed: number;
    inProgress: number;
  };
  files: {
    total: number;
    pending: number;
    approved: number;
    overdue: number;
  };
  vendors: {
    total: number;
    approved: number;
    rejected: number;
    pending: number;
  };
}

interface KPICardsProps {
  data: KPIData;
}

export function KPICards({ data }: KPICardsProps) {
  const kpiItems = [
    {
      title: "Employees",
      total: data.employees.total,
      icon: Users,
      bgColor: "bg-rdso-blue",
      stats: [
        { label: "Present", value: data.employees.present, color: "text-rdso-green" },
        { label: "Absent", value: data.employees.absent, color: "text-red-500" },
        { label: "Field", value: data.employees.field, color: "text-rdso-saffron" },
      ],
    },
    {
      title: "Projects",
      total: data.projects.total,
      icon: FolderOpen,
      bgColor: "bg-rdso-saffron",
      stats: [
        { label: "On Track", value: data.projects.onTrack, color: "text-rdso-green" },
        { label: "Delayed", value: data.projects.delayed, color: "text-red-500" },
      ],
    },
    {
      title: "Files",
      total: data.files.total,
      icon: FileText,
      bgColor: "bg-rdso-green",
      stats: [
        { label: "Approved", value: data.files.approved, color: "text-rdso-green" },
        { label: "Pending", value: data.files.pending, color: "text-red-500" },
      ],
    },
    {
      title: "Vendors",
      total: data.vendors.total,
      icon: ShoppingBag,
      bgColor: "bg-purple-500",
      stats: [
        { label: "Approved", value: data.vendors.approved, color: "text-rdso-green" },
        { label: "Rejected", value: data.vendors.rejected, color: "text-red-500" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl hover:shadow-lg transition-all duration-300" data-testid={`kpi-card-${item.title.toLowerCase()}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                      {item.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2" data-testid={`kpi-total-${item.title.toLowerCase()}`}>
                      {item.total}
                    </p>
                    <div className="flex space-x-4 mt-3 text-sm">
                      {item.stats.map((stat) => (
                        <span key={stat.label} className={stat.color}>
                          {stat.label}: <strong data-testid={`kpi-${item.title.toLowerCase()}-${stat.label.toLowerCase()}`}>{stat.value}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={`${item.bgColor} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
