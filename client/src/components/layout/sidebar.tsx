import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  FolderOpen,
  FileText,
  ShoppingBag,
  MapPin,
  AlertTriangle,
  BookOpen,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navigationItems = [
  { 
    id: "dashboard", 
    label: "Dashboard", 
    icon: Home, 
    href: "/" 
  },
  { 
    id: "employees", 
    label: "Employees", 
    icon: Users, 
    href: "/employees" 
  },
  { 
    id: "projects", 
    label: "Projects", 
    icon: FolderOpen, 
    href: "/projects" 
  },
  { 
    id: "files", 
    label: "Files", 
    icon: FileText, 
    href: "/files" 
  },
  { 
    id: "vendors", 
    label: "Vendors", 
    icon: ShoppingBag, 
    href: "/vendors" 
  },
  { 
    id: "field-activity", 
    label: "Field Activity", 
    icon: MapPin, 
    href: "/field-activity" 
  },
  { 
    id: "alerts", 
    label: "Alerts", 
    icon: AlertTriangle, 
    href: "/alerts" 
  },
  { 
    id: "training", 
    label: "Training", 
    icon: BookOpen, 
    href: "/training" 
  },
  { 
    id: "reports", 
    label: "Reports", 
    icon: BarChart3, 
    href: "/reports" 
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [location] = useLocation();

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-rdso-blue dark:bg-slate-800 text-white flex-shrink-0 overflow-hidden sidebar-gradient"
      data-testid="sidebar"
    >
      <div className="p-6">
        {/* RDSO Logo and Title */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-rdso-saffron rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            IR
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-lg font-bold">RDSO</h1>
              <p className="text-xs opacity-75">Research Design & Standards</p>
            </motion.div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;

            return (
              <Link key={item.id} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-xl transition-colors cursor-pointer",
                    isActive
                      ? "bg-rdso-saffron text-white"
                      : "hover:bg-rdso-blue-light"
                  )}
                  data-testid={`nav-${item.id}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {item.id === "alerts" && !isCollapsed && (
                    <span className="bg-red-500 text-xs px-2 py-1 rounded-full ml-auto">
                      3
                    </span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="mt-8 w-full flex items-center justify-center p-2 rounded-xl hover:bg-rdso-blue-light transition-colors"
          data-testid="sidebar-toggle"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
