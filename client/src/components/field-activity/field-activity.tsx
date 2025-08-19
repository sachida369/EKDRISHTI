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
import { MapPin, Plus, Calendar, User, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { type FieldActivity } from "@shared/schema";

export default function FieldActivity() {
  const { data: activities, isLoading } = useQuery<FieldActivity[]>({
    queryKey: ["/api/field-activities"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rdso-saffron"></div>
      </div>
    );
  }

  const scheduledActivities = activities?.filter(a => a.status === "Scheduled").length || 0;
  const inProgressActivities = activities?.filter(a => a.status === "In Progress").length || 0;
  const completedActivities = activities?.filter(a => a.status === "Completed").length || 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-500 text-white";
      case "In Progress":
        return "bg-rdso-saffron text-white";
      case "Completed":
        return "bg-rdso-green text-white";
      case "Cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-rdso-green" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-rdso-saffron" />;
      case "Scheduled":
        return <Calendar className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const todaysActivities = activities?.filter(activity => {
    const today = new Date();
    const activityDate = new Date(activity.scheduledDate);
    return activityDate.toDateString() === today.toDateString();
  }) || [];

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
                Field Activity
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track field inspections, site visits, and on-ground activities.
              </p>
            </div>
            <Button className="bg-rdso-saffron text-white hover:bg-rdso-saffron-light" data-testid="add-activity-btn">
              <Plus className="w-4 h-4 mr-2" />
              New Activity
            </Button>
          </div>
        </div>

        {/* Activity Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="total-activities-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="total-activities-count">
                {activities?.length || 0}
              </h3>
              <p className="text-blue-500 font-medium">Total Activities</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="scheduled-activities-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-rdso-saffron rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="scheduled-activities-count">
                {scheduledActivities}
              </h3>
              <p className="text-rdso-saffron font-medium">Scheduled</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="in-progress-activities-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="in-progress-activities-count">
                {inProgressActivities}
              </h3>
              <p className="text-yellow-500 font-medium">In Progress</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="completed-activities-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-rdso-green rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="completed-activities-count">
                {completedActivities}
              </h3>
              <p className="text-rdso-green font-medium">Completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Map Placeholder */}
          <Card className="lg:col-span-2 glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="field-activity-map">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Activity Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gray-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-rdso-saffron mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Field activity locations with real-time tracking
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Activities */}
          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="todays-activities-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Today's Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysActivities.length > 0 ? (
                  todaysActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 dark:border-slate-700 rounded-lg p-3"
                      data-testid={`todays-activity-${index}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm" data-testid={`activity-title-${index}`}>
                          {activity.title}
                        </h4>
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span data-testid={`activity-officer-${index}`}>{activity.assignedOfficer}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span data-testid={`activity-location-${index}`}>{activity.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span data-testid={`activity-time-${index}`}>{formatTime(activity.scheduledDate)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8" data-testid="no-activities-today">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      No activities scheduled for today
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activities Table */}
        <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="activities-table-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                All Field Activities
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" data-testid="filter-activities-btn">
                  Filter
                </Button>
                <Button variant="outline" size="sm" data-testid="export-activities-btn">
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
                    <TableHead>Activity</TableHead>
                    <TableHead>Officer</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities?.map((activity, index) => (
                    <TableRow key={activity.id} data-testid={`activity-table-row-${index}`}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white" data-testid={`activity-table-title-${index}`}>
                            {activity.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300" data-testid={`activity-table-description-${index}`}>
                            {activity.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300" data-testid={`activity-table-officer-${index}`}>
                        {activity.assignedOfficer}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300" data-testid={`activity-table-location-${index}`}>
                        {activity.location}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300" data-testid={`activity-table-date-${index}`}>
                        {formatDate(activity.scheduledDate)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" data-testid={`activity-table-type-${index}`}>
                          {activity.activityType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(activity.priority)} data-testid={`activity-table-priority-${index}`}>
                          {activity.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(activity.status)}
                          <Badge className={getStatusColor(activity.status)} data-testid={`activity-table-status-${index}`}>
                            {activity.status}
                          </Badge>
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
