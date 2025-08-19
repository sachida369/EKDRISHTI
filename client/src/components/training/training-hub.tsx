import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, BookOpen, Plus, Clock, MapPin, User } from "lucide-react";
import { type TrainingProgram } from "@shared/schema";

export default function TrainingHub() {
  const { data: programs, isLoading } = useQuery<TrainingProgram[]>({
    queryKey: ["/api/training-programs"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rdso-saffron"></div>
      </div>
    );
  }

  const upcomingPrograms = programs?.filter(p => p.status === "Upcoming").length || 0;
  const ongoingPrograms = programs?.filter(p => p.status === "Ongoing").length || 0;
  const completedPrograms = programs?.filter(p => p.status === "Completed").length || 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-500 text-white";
      case "Ongoing":
        return "bg-rdso-saffron text-white";
      case "Completed":
        return "bg-rdso-green text-white";
      case "Cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateRange = (start: Date, end: Date) => {
    const startStr = formatDate(start);
    const endStr = formatDate(end);
    return `${startStr} - ${endStr}`;
  };

  const getProgressPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  // Mock skill tags for demonstration
  const skillTags = [
    "Signal Systems", "Electronic Interlocking", "Safety Protocols", "Project Management",
    "AI & Machine Learning", "Data Analysis", "Railway Operations", "Maintenance",
    "Quality Control", "Risk Assessment", "Communication Skills", "Leadership"
  ];

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
                Training Hub
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage training schedules, skill development, and staff certifications.
              </p>
            </div>
            <Button className="bg-rdso-saffron text-white hover:bg-rdso-saffron-light" data-testid="add-training-btn">
              <Plus className="w-4 h-4 mr-2" />
              New Training
            </Button>
          </div>
        </div>

        {/* Training Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="total-programs-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="total-programs-count">
                {programs?.length || 0}
              </h3>
              <p className="text-blue-500 font-medium">Total Programs</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="upcoming-programs-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-rdso-saffron rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="upcoming-programs-count">
                {upcomingPrograms}
              </h3>
              <p className="text-rdso-saffron font-medium">Upcoming</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="ongoing-programs-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-rdso-green rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="ongoing-programs-count">
                {ongoingPrograms}
              </h3>
              <p className="text-rdso-green font-medium">Ongoing</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl text-center" data-testid="completed-programs-card">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="completed-programs-count">
                {completedPrograms}
              </h3>
              <p className="text-gray-500 font-medium">Completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Training Programs */}
          <div className="lg:col-span-2">
            <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="training-programs-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Training Programs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programs?.map((program, index) => (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 dark:border-slate-700 rounded-xl p-4 hover:shadow-md transition-shadow"
                      data-testid={`training-program-${index}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1" data-testid={`program-title-${index}`}>
                            {program.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2" data-testid={`program-description-${index}`}>
                            {program.description}
                          </p>
                        </div>
                        <Badge className={getStatusColor(program.status)} data-testid={`program-status-${index}`}>
                          {program.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">Instructor:</span>
                          <span className="font-medium text-gray-900 dark:text-white" data-testid={`program-instructor-${index}`}>
                            {program.instructor}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                          <span className="font-medium text-gray-900 dark:text-white" data-testid={`program-duration-${index}`}>
                            {formatDateRange(program.startDate, program.endDate)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">Participants:</span>
                          <span className="font-medium text-gray-900 dark:text-white" data-testid={`program-participants-${index}`}>
                            {program.currentParticipants}/{program.maxParticipants}
                          </span>
                          <div className="ml-2 bg-gray-200 dark:bg-slate-700 rounded-full h-2 w-16">
                            <div 
                              className="bg-rdso-saffron h-2 rounded-full" 
                              style={{ width: `${getProgressPercentage(program.currentParticipants || 0, program.maxParticipants)}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">Location:</span>
                          <span className="font-medium text-gray-900 dark:text-white" data-testid={`program-location-${index}`}>
                            {program.location}
                          </span>
                        </div>
                      </div>

                      {program.skills && program.skills.length > 0 && (
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1">
                            {program.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs" data-testid={`program-skill-${index}-${skillIndex}`}>
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" variant="outline" data-testid={`view-program-${index}`}>
                          View Details
                        </Button>
                        {program.status === "Upcoming" && (
                          <Button size="sm" className="bg-rdso-saffron text-white hover:bg-rdso-saffron-light" data-testid={`enroll-program-${index}`}>
                            Enroll
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skill Tags & Calendar */}
          <div className="space-y-6">
            {/* Staff Skills */}
            <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="staff-skills-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Staff Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillTags.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="hover:bg-rdso-saffron hover:text-white cursor-pointer transition-colors"
                      data-testid={`skill-tag-${index}`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training Calendar Widget */}
            <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="training-calendar-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Training Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="w-16 h-16 text-rdso-saffron mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Calendar Widget
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Interactive calendar for training sessions and scheduling.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Suggestion Box */}
            <Card className="glassmorphism bg-white dark:bg-slate-800 rounded-2xl" data-testid="suggestion-box-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Suggestion Box
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <textarea 
                    className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white resize-none"
                    rows={3}
                    placeholder="Share your training suggestions..."
                    data-testid="suggestion-textarea"
                  />
                  <Button className="w-full bg-rdso-saffron text-white hover:bg-rdso-saffron-light" data-testid="submit-suggestion-btn">
                    Submit Suggestion
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
