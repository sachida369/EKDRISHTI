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
import { Upload, Download, Eye, FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { type File } from "@shared/schema";

export default function FileTracking() {
  const { data: files, isLoading } = useQuery<File[]>({
    queryKey: ["/api/files"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rdso-saffron"></div>
      </div>
    );
  }

  const totalFiles = files?.length || 0;
  const approvedFiles = files?.filter(f => f.status === "Approved").length || 0;
  const pendingFiles = files?.filter(f => f.status === "Pending").length || 0;
  const overdueFiles = files?.filter(f => f.pendingDays > 7).length || 0;

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

  const getPendingDaysColor = (days: number) => {
    if (days > 7) return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200";
    if (days > 3) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200";
    return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200";
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            File Tracking
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor file movement, pending approvals, and processing delays.
          </p>
        </div>

        {/* File Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="total-files-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="total-files-count">
                {totalFiles}
              </h3>
              <p className="text-blue-500 font-medium">Total Files</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="approved-files-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-rdso-green rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="approved-files-count">
                {approvedFiles}
              </h3>
              <p className="text-rdso-green font-medium">Approved</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="pending-files-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-rdso-saffron rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="pending-files-count">
                {pendingFiles}
              </h3>
              <p className="text-rdso-saffron font-medium">Pending</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="overdue-files-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="overdue-files-count">
                {overdueFiles}
              </h3>
              <p className="text-red-500 font-medium">Overdue ({'>'} 7 days)</p>
            </CardContent>
          </Card>
        </div>

        {/* Files Table */}
        <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="files-table-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                File Status
              </CardTitle>
              <div className="flex space-x-3">
                <Button className="bg-rdso-saffron text-white hover:bg-rdso-saffron-light" data-testid="upload-file-btn">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
                <Button variant="outline" data-testid="export-files-btn">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Current Officer</TableHead>
                    <TableHead>Pending Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files?.map((file, index) => (
                    <TableRow key={file.id} data-testid={`file-row-${index}`}>
                      <TableCell className="font-medium text-gray-900 dark:text-white" data-testid={`file-id-${index}`}>
                        {file.fileId}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium text-gray-900 dark:text-white" data-testid={`file-subject-${index}`}>
                            {file.subject}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300" data-testid={`file-description-${index}`}>
                            {file.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300" data-testid={`file-officer-${index}`}>
                        {file.currentOfficer}
                      </TableCell>
                      <TableCell>
                        <Badge className={getPendingDaysColor(file.pendingDays)} data-testid={`file-pending-days-${index}`}>
                          {file.pendingDays} days
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(file.status)} data-testid={`file-status-${index}`}>
                          {file.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300" data-testid={`file-department-${index}`}>
                        {file.department}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" data-testid={`view-file-${index}`}>
                          <Eye className="w-4 h-4" />
                        </Button>
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
