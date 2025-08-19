import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer 
} from "recharts";
import { 
  FileText, 
  Users, 
  ShoppingBag, 
  Download, 
  TrendingUp, 
  Calendar,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react";

export default function ReportsAnalytics() {
  const { data: stats, isLoading: statsLoading } = useQuery<any>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: employees, isLoading: employeesLoading } = useQuery({
    queryKey: ["/api/employees"],
  });

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["/api/projects"],
  });

  const { data: vendors, isLoading: vendorsLoading } = useQuery({
    queryKey: ["/api/vendors"],
  });

  const { data: files, isLoading: filesLoading } = useQuery({
    queryKey: ["/api/files"],
  });

  if (statsLoading || employeesLoading || projectsLoading || vendorsLoading || filesLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rdso-saffron"></div>
      </div>
    );
  }

  // Prepare chart data
  const departmentPerformanceData = [
    { name: "Signal & Telecom", projects: 5, completed: 3, efficiency: 85 },
    { name: "Electrical", projects: 3, completed: 2, efficiency: 78 },
    { name: "Rolling Stock", projects: 2, completed: 1, efficiency: 65 },
    { name: "Civil", projects: 4, completed: 4, efficiency: 92 },
    { name: "Mechanical", projects: 3, completed: 2, efficiency: 70 },
  ];

  const staffAvailabilityTrendData = [
    { month: "Jan", present: 85, absent: 10, field: 5 },
    { month: "Feb", present: 88, absent: 8, field: 4 },
    { month: "Mar", present: 82, absent: 12, field: 6 },
    { month: "Apr", present: 90, absent: 6, field: 4 },
    { month: "May", present: 87, absent: 9, field: 4 },
    { month: "Jun", present: 89, absent: 7, field: 4 },
  ];

  const vendorApprovalTimelineData = [
    { stage: "Application", days: 3 },
    { stage: "Technical Review", days: 7 },
    { stage: "Financial Verification", days: 5 },
    { stage: "Site Inspection", days: 4 },
    { stage: "Final Approval", days: 2 },
  ];

  const projectStatusDistribution = [
    { name: "On Track", value: stats?.projects?.onTrack || 0, color: "#138808" },
    { name: "In Progress", value: stats?.projects?.inProgress || 0, color: "#FF9933" },
    { name: "Delayed", value: stats?.projects?.delayed || 0, color: "#EF4444" },
  ];

  const COLORS = ['#138808', '#FF9933', '#EF4444', '#8B5CF6'];

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Generate detailed reports and analytics for organizational insights.
          </p>
        </div>

        {/* Report Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center hover:shadow-lg transition-shadow" data-testid="performance-reports-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-rdso-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Reports</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Directorate and individual performance analytics
              </p>
              <Button className="w-full bg-rdso-blue text-white hover:bg-rdso-blue-light" data-testid="generate-performance-report">
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center hover:shadow-lg transition-shadow" data-testid="staff-reports-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-rdso-saffron rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Staff Reports</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Attendance, training, and availability trends
              </p>
              <Button className="w-full bg-rdso-saffron text-white hover:bg-rdso-saffron-light" data-testid="generate-staff-report">
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center hover:shadow-lg transition-shadow" data-testid="vendor-reports-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-rdso-green rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Vendor Reports</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Vendor performance and approval timelines
              </p>
              <Button className="w-full bg-rdso-green text-white hover:bg-rdso-green-light" data-testid="generate-vendor-report">
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Directorate Performance */}
          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="department-performance-chart">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Directorate Performance Comparison
                </CardTitle>
                <Button variant="ghost" size="icon" data-testid="export-department-chart">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="projects" fill="#FF9933" name="Total Projects" />
                    <Bar dataKey="completed" fill="#138808" name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Staff Availability Trends */}
          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="staff-availability-chart">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Staff Availability Trends
                </CardTitle>
                <Button variant="ghost" size="icon" data-testid="export-availability-chart">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={staffAvailabilityTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="present" stroke="#138808" strokeWidth={3} name="Present %" />
                    <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={3} name="Absent %" />
                    <Line type="monotone" dataKey="field" stroke="#FF9933" strokeWidth={3} name="Field Duty %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vendor Approval Timeline */}
          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="vendor-approval-chart">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Vendor Approval Timelines
                </CardTitle>
                <Button variant="ghost" size="icon" data-testid="export-vendor-timeline-chart">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vendorApprovalTimelineData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="stage" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="days" fill="#FF9933" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Project Status Distribution */}
          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="project-status-chart">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Project Status Distribution
                </CardTitle>
                <Button variant="ghost" size="icon" data-testid="export-project-status-chart">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectStatusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {projectStatusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Summary */}
        <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl mt-8" data-testid="quick-stats-summary">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Quick Statistics Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-rdso-blue mb-1" data-testid="total-employees-stat">
                  {stats?.employees?.total || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Employees</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-rdso-saffron mb-1" data-testid="active-projects-stat">
                  {stats?.projects?.total || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Active Projects</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-rdso-green mb-1" data-testid="approved-vendors-stat">
                  {stats?.vendors?.approved || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Approved Vendors</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500 mb-1" data-testid="pending-files-stat">
                  {stats?.files?.pending || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Pending Files</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
