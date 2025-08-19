import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Download, ShoppingBag, CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { type Vendor } from "@shared/schema";

export default function VendorManagement() {
  const { data: vendors, isLoading } = useQuery<Vendor[]>({
    queryKey: ["/api/vendors"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rdso-saffron"></div>
      </div>
    );
  }

  const totalVendors = vendors?.length || 0;
  const approvedVendors = vendors?.filter(v => v.status === "Approved").length || 0;
  const pendingVendors = vendors?.filter(v => v.status === "Pending").length || 0;
  const rejectedVendors = vendors?.filter(v => v.status === "Rejected").length || 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-rdso-green text-white";
      case "Pending":
        return "bg-rdso-saffron text-white";
      case "Under Review":
        return "bg-blue-500 text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4 text-rdso-green" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-rdso-saffron" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-blue-500" />;
    }
  };

  const chartData = [
    { name: "Approved", value: approvedVendors, color: "#138808" },
    { name: "Pending", value: pendingVendors, color: "#FF9933" },
    { name: "Rejected", value: rejectedVendors, color: "#EF4444" },
    { name: "Under Review", value: vendors?.filter(v => v.status === "Under Review").length || 0, color: "#8B5CF6" },
  ];

  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpiringSoon = (expiryDate: Date | null) => {
    if (!expiryDate) return false;
    const days = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days <= 30 && days > 0;
  };

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Vendor Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor vendor approvals, contracts, and performance metrics.
              </p>
            </div>
            <Button className="bg-rdso-saffron text-white hover:bg-rdso-saffron-light" data-testid="add-vendor-btn">
              <Plus className="w-4 h-4 mr-2" />
              New Vendor
            </Button>
          </div>
        </div>

        {/* Vendor Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="total-vendors-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="total-vendors-count">
                {totalVendors}
              </h3>
              <p className="text-blue-500 font-medium">Total Vendors</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="approved-vendors-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-rdso-green rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="approved-vendors-count">
                {approvedVendors}
              </h3>
              <p className="text-rdso-green font-medium">Approved</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="pending-vendors-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-rdso-saffron rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="pending-vendors-count">
                {pendingVendors}
              </h3>
              <p className="text-rdso-saffron font-medium">Pending</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="rejected-vendors-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="rejected-vendors-count">
                {rejectedVendors}
              </h3>
              <p className="text-red-500 font-medium">Rejected</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Vendor Status Chart */}
          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="vendor-status-chart">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
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

          {/* Vendor Cards */}
          <div className="lg:col-span-2 space-y-4">
            {vendors?.slice(0, 3).map((vendor, index) => (
              <Card key={vendor.id} className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid={`vendor-card-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusIcon(vendor.status)}
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white" data-testid={`vendor-name-${index}`}>
                          {vendor.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2" data-testid={`vendor-product-${index}`}>
                        {vendor.product}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          Contact: <span className="font-medium" data-testid={`vendor-contact-${index}`}>{vendor.contactPerson}</span>
                        </span>
                        {vendor.expiryDate && (
                          <span className={`font-medium ${isExpiringSoon(vendor.expiryDate) ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                            Expires: {formatDate(vendor.expiryDate)}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge className={getStatusColor(vendor.status)} data-testid={`vendor-status-${index}`}>
                      {vendor.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vendors Table */}
        <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="vendors-table-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                All Vendors
              </CardTitle>
              <Button variant="outline" data-testid="export-vendors-btn">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors?.map((vendor, index) => (
                    <TableRow key={vendor.id} data-testid={`vendor-table-row-${index}`}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white" data-testid={`vendor-table-name-${index}`}>
                            {vendor.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {vendor.vendorId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300" data-testid={`vendor-table-product-${index}`}>
                        {vendor.product}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {vendor.contactPerson}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {vendor.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300">
                        {formatDate(vendor.registrationDate)}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300">
                        {formatDate(vendor.expiryDate)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vendor.status)} data-testid={`vendor-table-status-${index}`}>
                          {vendor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < (vendor.performanceRating || 0) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
