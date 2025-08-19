import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { UserPlus, Download, CheckCircle, XCircle, MapPin } from "lucide-react";
import { type Employee } from "@shared/schema";

export default function EmployeeManagement() {
  const { data: employees, isLoading } = useQuery<Employee[]>({
    queryKey: ["/api/employees"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rdso-saffron"></div>
      </div>
    );
  }

  const presentEmployees = employees?.filter(emp => emp.status === "Present").length || 0;
  const absentEmployees = employees?.filter(emp => emp.status === "Absent").length || 0;
  const fieldDutyEmployees = employees?.filter(emp => emp.status === "Field Duty").length || 0;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present":
        return <CheckCircle className="w-4 h-4 text-rdso-green" />;
      case "Absent":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "Field Duty":
        return <MapPin className="w-4 h-4 text-rdso-saffron" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-rdso-green text-white";
      case "Absent":
        return "bg-red-500 text-white";
      case "Field Duty":
        return "bg-rdso-saffron text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
            Employee Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor staff attendance, field duties, and roster management.
          </p>
        </div>

        {/* Employee Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="present-employees-card">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-rdso-green rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="present-count">
                {presentEmployees}
              </h3>
              <p className="text-rdso-green font-medium">Present Today</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="absent-employees-card">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="absent-count">
                {absentEmployees}
              </h3>
              <p className="text-red-500 font-medium">Absent Today</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="field-duty-employees-card">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-rdso-saffron rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="field-duty-count">
                {fieldDutyEmployees}
              </h3>
              <p className="text-rdso-saffron font-medium">Field Duty</p>
            </CardContent>
          </Card>
        </div>

        {/* Employee Table */}
        <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="employee-table-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Employee Roster
              </CardTitle>
              <div className="flex space-x-3">
                <Button className="bg-rdso-saffron text-white hover:bg-rdso-saffron-light" data-testid="add-employee-btn">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Employee
                </Button>
                <Button variant="outline" data-testid="export-employees-btn">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Department</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees?.slice(0, 10).map((employee, index) => (
                    <TableRow key={employee.id} data-testid={`employee-row-${index}`}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-rdso-blue text-white">
                              {getInitials(employee.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white" data-testid={`employee-name-${index}`}>
                              {employee.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {employee.employeeId}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300" data-testid={`employee-role-${index}`}>
                        {employee.designation}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300" data-testid={`employee-shift-${index}`}>
                        {employee.shift}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(employee.status)}
                          <Badge className={getStatusColor(employee.status)} data-testid={`employee-status-${index}`}>
                            {employee.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300" data-testid={`employee-location-${index}`}>
                        {employee.location || "-"}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300" data-testid={`employee-department-${index}`}>
                        {employee.department}
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
