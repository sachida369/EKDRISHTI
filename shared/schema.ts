import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  employeeId: text("employee_id").notNull().unique(),
  role: text("role").notNull(),
  designation: text("designation").notNull(),
  shift: text("shift").notNull(),
  status: text("status").notNull(), // Present, Absent, Field Duty
  location: text("location"),
  department: text("department").notNull(),
  contact: text("contact"),
  email: text("email"),
  joinDate: timestamp("join_date").notNull(),
  skills: jsonb("skills").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull(), // On Track, Delayed, In Progress, Completed
  progress: integer("progress").notNull().default(0),
  lead: text("lead").notNull(),
  department: text("department").notNull(),
  startDate: timestamp("start_date").notNull(),
  targetDate: timestamp("target_date").notNull(),
  actualEndDate: timestamp("actual_end_date"),
  priority: text("priority").notNull().default("Medium"), // High, Medium, Low
  budget: integer("budget"),
  resources: jsonb("resources").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const files = pgTable("files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fileId: text("file_id").notNull().unique(),
  subject: text("subject").notNull(),
  description: text("description"),
  currentOfficer: text("current_officer").notNull(),
  status: text("status").notNull(), // Pending, Under Review, Approved, Rejected
  priority: text("priority").notNull().default("Medium"),
  submissionDate: timestamp("submission_date").notNull(),
  lastMovedDate: timestamp("last_moved_date").notNull(),
  pendingDays: integer("pending_days").notNull().default(0),
  department: text("department").notNull(),
  fileType: text("file_type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const vendors = pgTable("vendors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  vendorId: text("vendor_id").notNull().unique(),
  product: text("product").notNull(),
  status: text("status").notNull(), // Approved, Rejected, Under Review, Pending
  stage: text("stage").notNull(),
  contactPerson: text("contact_person"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  registrationDate: timestamp("registration_date").notNull(),
  expiryDate: timestamp("expiry_date"),
  performanceRating: integer("performance_rating").default(0),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // Critical, Warning, Info
  category: text("category").notNull(), // File, Vendor, Employee, Project
  priority: text("priority").notNull().default("Medium"),
  status: text("status").notNull().default("Active"), // Active, Resolved, Dismissed
  relatedId: text("related_id"), // ID of related entity
  assignedTo: text("assigned_to"),
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

export const trainingPrograms = pgTable("training_programs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  instructor: text("instructor").notNull(),
  department: text("department").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  maxParticipants: integer("max_participants").notNull(),
  currentParticipants: integer("current_participants").default(0),
  skills: jsonb("skills").$type<string[]>().default([]),
  location: text("location"),
  status: text("status").notNull().default("Upcoming"), // Upcoming, Ongoing, Completed, Cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

export const fieldActivities = pgTable("field_activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  assignedOfficer: text("assigned_officer").notNull(),
  location: text("location").notNull(),
  coordinates: jsonb("coordinates").$type<{lat: number, lng: number}>(),
  scheduledDate: timestamp("scheduled_date").notNull(),
  completedDate: timestamp("completed_date"),
  status: text("status").notNull().default("Scheduled"), // Scheduled, In Progress, Completed, Cancelled
  activityType: text("activity_type").notNull(), // Inspection, Trial, Maintenance, Survey
  priority: text("priority").notNull().default("Medium"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertFileSchema = createInsertSchema(files).omit({
  id: true,
  createdAt: true,
});

export const insertVendorSchema = createInsertSchema(vendors).omit({
  id: true,
  createdAt: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  createdAt: true,
});

export const insertTrainingProgramSchema = createInsertSchema(trainingPrograms).omit({
  id: true,
  createdAt: true,
});

export const insertFieldActivitySchema = createInsertSchema(fieldActivities).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Employee = typeof employees.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertFile = z.infer<typeof insertFileSchema>;
export type File = typeof files.$inferSelect;

export type InsertVendor = z.infer<typeof insertVendorSchema>;
export type Vendor = typeof vendors.$inferSelect;

export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;

export type InsertTrainingProgram = z.infer<typeof insertTrainingProgramSchema>;
export type TrainingProgram = typeof trainingPrograms.$inferSelect;

export type InsertFieldActivity = z.infer<typeof insertFieldActivitySchema>;
export type FieldActivity = typeof fieldActivities.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Role hierarchy enum
export const ROLES = {
  DG: "DG (Director General)",
  ADG: "ADG (Addl Director General)", 
  PED: "PED (Principal Exec Director)",
  ED: "ED (Executive Director)",
  Director: "Director",
  JD: "JD (Joint Director)",
  ADE: "ADE (Addl Director Electrical)",
  SSE: "SSE (Senior Section Engineer)",
  JE: "JE (Junior Engineer)"
} as const;

export type RoleType = keyof typeof ROLES;
