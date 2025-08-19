import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { useRole } from "@/contexts/role-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Bell,
  Menu,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { type RoleType } from "@shared/schema";

interface TopbarProps {
  onSidebarToggle: () => void;
}

export function Topbar({ onSidebarToggle }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const { currentRole, setCurrentRole, availableRoles } = useRole();
  const [notificationCount] = useState(5);

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 h-16 flex items-center justify-between px-6">
      {/* Left side - Search */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          className="lg:hidden"
          data-testid="mobile-sidebar-toggle"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 dark:bg-slate-700 border-0 rounded-xl pl-10 w-80 focus:ring-2 focus:ring-rdso-saffron"
            data-testid="search-input"
          />
        </div>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center space-x-4">
        {/* Dark/Light Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="hover:bg-gray-100 dark:hover:bg-slate-700"
          data-testid="theme-toggle"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        {/* Role Switcher */}
        <Select value={currentRole} onValueChange={(value: RoleType) => setCurrentRole(value)}>
          <SelectTrigger className="bg-rdso-saffron text-white border-0 rounded-xl font-medium min-w-[200px]" data-testid="role-selector">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(availableRoles).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-gray-100 dark:hover:bg-slate-700"
          data-testid="notifications-button"
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              data-testid="notification-count"
            >
              {notificationCount}
            </motion.span>
          )}
        </Button>

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-slate-700"
              data-testid="profile-menu"
            >
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Rajesh Kumar
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Executive Director
                </div>
              </div>
              <div className="w-8 h-8 bg-rdso-blue rounded-full flex items-center justify-center text-white font-medium">
                RK
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem data-testid="profile-menu-profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem data-testid="profile-menu-settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="profile-menu-logout">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
