import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, XCircle, User, Calendar } from "lucide-react";
import { type Alert } from "@shared/schema";

export default function AlertManagement() {
  const { data: alerts, isLoading } = useQuery<Alert[]>({
    queryKey: ["/api/alerts"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rdso-saffron"></div>
      </div>
    );
  }

  const activeAlerts = alerts?.filter(alert => alert.status === "Active") || [];
  const criticalAlerts = activeAlerts.filter(alert => alert.type === "Critical");
  const warningAlerts = activeAlerts.filter(alert => alert.type === "Warning");
  const infoAlerts = activeAlerts.filter(alert => alert.type === "Info");

  const getAlertColor = (type: string) => {
    switch (type) {
      case "Critical":
        return "bg-red-50 dark:bg-red-900/20 border-l-red-500";
      case "Warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-l-yellow-500";
      case "Info":
        return "bg-blue-50 dark:bg-blue-900/20 border-l-blue-500";
      default:
        return "bg-gray-50 dark:bg-gray-900/20 border-l-gray-500";
    }
  };

  const getAlertTextColor = (type: string) => {
    switch (type) {
      case "Critical":
        return "text-red-800 dark:text-red-200";
      case "Warning":
        return "text-yellow-800 dark:text-yellow-200";
      case "Info":
        return "text-blue-800 dark:text-blue-200";
      default:
        return "text-gray-800 dark:text-gray-200";
    }
  };

  const getDotColor = (type: string) => {
    switch (type) {
      case "Critical":
        return "bg-red-500";
      case "Warning":
        return "bg-yellow-500";
      case "Info":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Critical":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "Warning":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "Info":
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
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

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Alerts & Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage system alerts, pending tasks, and important notifications.
          </p>
        </div>

        {/* Alert Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="total-alerts-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="total-alerts-count">
                {activeAlerts.length}
              </h3>
              <p className="text-blue-500 font-medium">Total Active</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="critical-alerts-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="critical-alerts-count">
                {criticalAlerts.length}
              </h3>
              <p className="text-red-500 font-medium">Critical</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="warning-alerts-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="warning-alerts-count">
                {warningAlerts.length}
              </h3>
              <p className="text-yellow-500 font-medium">Warning</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="info-alerts-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-rdso-green rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="info-alerts-count">
                {infoAlerts.length}
              </h3>
              <p className="text-rdso-green font-medium">Info</p>
            </CardContent>
          </Card>
        </div>

        {/* Alert Feed */}
        <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="alert-feed-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Alert Feed
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" data-testid="mark-all-read-btn">
                  Mark All Read
                </Button>
                <Button variant="outline" size="sm" data-testid="filter-alerts-btn">
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start space-x-4 p-4 rounded-xl border-l-4 ${getAlertColor(alert.type)}`}
                  data-testid={`alert-item-${index}`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-semibold ${getAlertTextColor(alert.type)}`} data-testid={`alert-title-${index}`}>
                          {alert.title}
                        </h4>
                        <p className={`text-sm mt-1 ${getAlertTextColor(alert.type)} opacity-80`} data-testid={`alert-description-${index}`}>
                          {alert.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 mt-3 text-xs">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span data-testid={`alert-date-${index}`}>{formatDate(alert.createdAt!)}</span>
                          </div>
                          
                          {alert.assignedTo && (
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span data-testid={`alert-assigned-${index}`}>{alert.assignedTo}</span>
                            </div>
                          )}
                          
                          <Badge variant="outline" data-testid={`alert-category-${index}`}>
                            {alert.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Badge className={`${alert.type === "Critical" ? "bg-red-500" : alert.type === "Warning" ? "bg-yellow-500" : "bg-blue-500"} text-white`} data-testid={`alert-type-${index}`}>
                          {alert.type}
                        </Badge>
                        <Button variant="ghost" size="sm" data-testid={`resolve-alert-${index}`}>
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {activeAlerts.length === 0 && (
                <div className="text-center py-8" data-testid="no-alerts">
                  <CheckCircle className="w-16 h-16 text-rdso-green mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No Active Alerts
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    All alerts have been resolved. Great job!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
