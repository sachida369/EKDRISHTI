import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Calendar, User, Target } from "lucide-react";
import { type Project } from "@shared/schema";

export default function ProjectManagement() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rdso-saffron"></div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-rdso-green text-white";
      case "In Progress":
        return "bg-rdso-saffron text-white";
      case "Delayed":
        return "bg-red-500 text-white";
      case "Completed":
        return "bg-blue-500 text-white";
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
      case "Completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Project Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track project progress, trials, and deliverables across all directorates.
              </p>
            </div>
            <Button className="bg-rdso-saffron text-white hover:bg-rdso-saffron-light" data-testid="add-project-btn">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              data-testid={`project-card-${index}`}
            >
              <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-testid={`project-name-${index}`}>
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2" data-testid={`project-description-${index}`}>
                        {project.description}
                      </p>
                    </div>
                    <Badge className={getStatusColor(project.status)} data-testid={`project-status-${index}`}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white" data-testid={`project-progress-${index}`}>
                        {project.progress}%
                      </span>
                    </div>
                    <Progress value={project.progress} className="w-full h-2" data-testid={`project-progress-bar-${index}`} />
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <User className="w-4 h-4 mr-1" />
                        <span>Project Lead:</span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white" data-testid={`project-lead-${index}`}>
                        {project.lead}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Start Date:</span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white" data-testid={`project-start-date-${index}`}>
                        {formatDate(project.startDate)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Target className="w-4 h-4 mr-1" />
                        <span>Target Date:</span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white" data-testid={`project-target-date-${index}`}>
                        {formatDate(project.targetDate)}
                      </span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-rdso-saffron text-white hover:bg-rdso-saffron-light"
                    data-testid={`view-project-details-${index}`}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
