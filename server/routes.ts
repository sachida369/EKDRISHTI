import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Employee routes
  app.get("/api/employees", async (req, res) => {
    try {
      const employees = await storage.getAllEmployees();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch employees" });
    }
  });

  app.get("/api/employees/:id", async (req, res) => {
    try {
      const employee = await storage.getEmployee(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch employee" });
    }
  });

  // Project routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // File routes
  app.get("/api/files", async (req, res) => {
    try {
      const files = await storage.getAllFiles();
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch files" });
    }
  });

  app.get("/api/files/:id", async (req, res) => {
    try {
      const file = await storage.getFile(req.params.id);
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      res.json(file);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch file" });
    }
  });

  // Vendor routes
  app.get("/api/vendors", async (req, res) => {
    try {
      const vendors = await storage.getAllVendors();
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendors" });
    }
  });

  app.get("/api/vendors/:id", async (req, res) => {
    try {
      const vendor = await storage.getVendor(req.params.id);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendor" });
    }
  });

  // Alert routes
  app.get("/api/alerts", async (req, res) => {
    try {
      const alerts = await storage.getAllAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  // Training program routes
  app.get("/api/training-programs", async (req, res) => {
    try {
      const programs = await storage.getAllTrainingPrograms();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch training programs" });
    }
  });

  // Field activity routes
  app.get("/api/field-activities", async (req, res) => {
    try {
      const activities = await storage.getAllFieldActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch field activities" });
    }
  });

  // Dashboard stats route
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const employees = await storage.getAllEmployees();
      const projects = await storage.getAllProjects();
      const files = await storage.getAllFiles();
      const vendors = await storage.getAllVendors();
      const alerts = await storage.getAllAlerts();

      const stats = {
        employees: {
          total: employees.length,
          present: employees.filter(e => e.status === "Present").length,
          absent: employees.filter(e => e.status === "Absent").length,
          field: employees.filter(e => e.status === "Field Duty").length,
        },
        projects: {
          total: projects.length,
          onTrack: projects.filter(p => p.status === "On Track").length,
          delayed: projects.filter(p => p.status === "Delayed").length,
          inProgress: projects.filter(p => p.status === "In Progress").length,
        },
        files: {
          total: files.length,
          pending: files.filter(f => f.status === "Pending").length,
          approved: files.filter(f => f.status === "Approved").length,
          overdue: files.filter(f => f.pendingDays > 7).length,
        },
        vendors: {
          total: vendors.length,
          approved: vendors.filter(v => v.status === "Approved").length,
          rejected: vendors.filter(v => v.status === "Rejected").length,
          pending: vendors.filter(v => v.status === "Pending").length,
        },
        alerts: {
          total: alerts.length,
          critical: alerts.filter(a => a.type === "Critical" && a.status === "Active").length,
          warning: alerts.filter(a => a.type === "Warning" && a.status === "Active").length,
        }
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
