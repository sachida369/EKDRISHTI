import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Alert } from "@shared/schema";

interface QuickAlertsProps {
  alerts: Alert[];
}

export function QuickAlerts({ alerts }: QuickAlertsProps) {
  const activeAlerts = alerts.filter(alert => alert.status === "Active");
  const criticalAlerts = activeAlerts.filter(alert => alert.type === "Critical");

  const getAlertColor = (type: string) => {
    switch (type) {
      case "Critical":
        return "bg-red-50 dark:bg-red-900/20 border-l-red-500 text-red-800 dark:text-red-200";
      case "Warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-l-yellow-500 text-yellow-800 dark:text-yellow-200";
      default:
        return "bg-blue-50 dark:bg-blue-900/20 border-l-blue-500 text-blue-800 dark:text-blue-200";
    }
  };

  const getDotColor = (type: string) => {
    switch (type) {
      case "Critical":
        return "bg-red-500";
      case "Warning":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="quick-alerts-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Quick Alerts
          </CardTitle>
          <Badge variant="destructive" data-testid="critical-alerts-count">
            {criticalAlerts.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeAlerts.slice(0, 3).map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start space-x-3 p-3 rounded-xl border-l-4 ${getAlertColor(alert.type)}`}
              data-testid={`alert-item-${index}`}
            >
              <div className={`flex-shrink-0 w-2 h-2 ${getDotColor(alert.type)} rounded-full mt-2`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium" data-testid={`alert-title-${index}`}>
                  {alert.title}
                </p>
                <p className="text-xs mt-1 opacity-80" data-testid={`alert-description-${index}`}>
                  {alert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <Button 
          variant="ghost" 
          className="w-full mt-4 text-rdso-saffron font-medium text-sm hover:text-rdso-saffron-light"
          data-testid="view-all-alerts"
        >
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  );
}
