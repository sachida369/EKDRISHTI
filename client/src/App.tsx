import { Switch, Route } from "wouter";
import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { RoleProvider } from "@/contexts/role-context";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Dashboard from "@/pages/dashboard";
import EmployeeManagement from "@/components/employees/employee-management";
import ProjectManagement from "@/components/projects/project-management";
import FileTracking from "@/components/files/file-tracking";
import VendorManagement from "@/components/vendors/vendor-management";
import FieldActivity from "@/components/field-activity/field-activity";
import AlertManagement from "@/components/alerts/alert-management";
import TrainingHub from "@/components/training/training-hub";
import ReportsAnalytics from "@/components/reports/reports-analytics";
import NotFound from "@/pages/not-found";
import PrototypePopup from "@/components/ui/prototype-popup";

function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-900" data-testid="app-layout">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobile && mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            data-testid="mobile-sidebar-overlay"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${
                mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "relative"
        }`}
      >
        <Sidebar
          isCollapsed={!isMobile && sidebarCollapsed}
          onToggle={handleSidebarToggle}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onSidebarToggle={handleSidebarToggle} />
        
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/employees" component={EmployeeManagement} />
          <Route path="/projects" component={ProjectManagement} />
          <Route path="/files" component={FileTracking} />
          <Route path="/vendors" component={VendorManagement} />
          <Route path="/field-activity" component={FieldActivity} />
          <Route path="/alerts" component={AlertManagement} />
          <Route path="/training" component={TrainingHub} />
          <Route path="/reports" component={ReportsAnalytics} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="rdso-ui-theme">
        <RoleProvider>
          <TooltipProvider>
            <Toaster />
            <AppLayout />
            <PrototypePopup />
          </TooltipProvider>
        </RoleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
