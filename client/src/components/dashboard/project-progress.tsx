import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import { type Project } from "@shared/schema";

interface ProjectProgressProps {
  projects: Project[];
}

export function ProjectProgress({ projects }: ProjectProgressProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-rdso-green text-white";
      case "In Progress":
        return "bg-rdso-saffron text-white";
      case "Delayed":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-rdso-green";
      case "In Progress":
        return "bg-rdso-saffron";
      case "Delayed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="lg:col-span-2 glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="project-progress-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Project Progress
          </CardTitle>
          <Button variant="ghost" size="icon" className="text-rdso-saffron hover:text-rdso-saffron-light" data-testid="export-projects">
            <Upload className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
              data-testid={`project-item-${index}`}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white" data-testid={`project-name-${index}`}>
                    {project.name}
                  </h4>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300" data-testid={`project-progress-${index}`}>
                    {project.progress}%
                  </span>
                </div>
                <Progress 
                  value={project.progress} 
                  className="w-full h-2" 
                  data-testid={`project-progress-bar-${index}`}
                />
              </div>
              <Badge className={`ml-4 ${getStatusColor(project.status)}`} data-testid={`project-status-${index}`}>
                {project.status}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
