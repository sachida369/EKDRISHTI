import { createContext, useContext, useState, type ReactNode } from "react";
import { ROLES, type RoleType } from "@shared/schema";

interface RoleContextType {
  currentRole: RoleType;
  setCurrentRole: (role: RoleType) => void;
  availableRoles: typeof ROLES;
  hasPermission: (requiredRole: RoleType) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const roleHierarchy: RoleType[] = ["DG", "ADG", "PED", "ED", "Director", "JD", "ADE", "SSE", "JE"];

export function RoleProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<RoleType>("ED");

  const hasPermission = (requiredRole: RoleType): boolean => {
    const currentIndex = roleHierarchy.indexOf(currentRole);
    const requiredIndex = roleHierarchy.indexOf(requiredRole);
    return currentIndex <= requiredIndex;
  };

  return (
    <RoleContext.Provider value={{
      currentRole,
      setCurrentRole,
      availableRoles: ROLES,
      hasPermission
    }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
