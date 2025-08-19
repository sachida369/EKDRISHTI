import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface ChartsProps {
  vendorData: Array<{ name: string; value: number; color: string }>;
  fileDelaysData: Array<{ name: string; value: number }>;
}

export function Charts({ vendorData, fileDelaysData }: ChartsProps) {
  const COLORS = ['#138808', '#FF9933', '#EF4444', '#8B5CF6'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Vendor Status Chart */}
      <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="vendor-status-chart">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Vendor Status Distribution
            </CardTitle>
            <Button variant="ghost" size="icon" className="text-rdso-saffron hover:text-rdso-saffron-light" data-testid="export-vendor-chart">
              <Upload className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vendorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vendorData.map((entry, index) => (
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

      {/* File Delays Chart */}
      <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="file-delays-chart">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              File Processing Delays
            </CardTitle>
            <Button variant="ghost" size="icon" className="text-rdso-saffron hover:text-rdso-saffron-light" data-testid="export-file-delays-chart">
              <Upload className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fileDelaysData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF9933" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
