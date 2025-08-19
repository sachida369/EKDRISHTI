import { 
  type User, 
  type InsertUser, 
  type Employee, 
  type InsertEmployee,
  type Project, 
  type InsertProject,
  type File, 
  type InsertFile,
  type Vendor, 
  type InsertVendor,
  type Alert, 
  type InsertAlert,
  type TrainingProgram, 
  type InsertTrainingProgram,
  type FieldActivity, 
  type InsertFieldActivity
} from "@shared/schema";
import { randomUUID } from "crypto";
import { 
  allEmployees, 
  allProjects, 
  allFiles, 
  allVendors, 
  dummyAlerts, 
  dummyTrainingPrograms, 
  dummyFieldActivities 
} from "../client/src/lib/dummy-data";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Employees
  getAllEmployees(): Promise<Employee[]>;
  getEmployee(id: string): Promise<Employee | undefined>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee | undefined>;
  deleteEmployee(id: string): Promise<boolean>;

  // Projects
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<Project>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Files
  getAllFiles(): Promise<File[]>;
  getFile(id: string): Promise<File | undefined>;
  createFile(file: InsertFile): Promise<File>;
  updateFile(id: string, file: Partial<File>): Promise<File | undefined>;
  deleteFile(id: string): Promise<boolean>;

  // Vendors
  getAllVendors(): Promise<Vendor[]>;
  getVendor(id: string): Promise<Vendor | undefined>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  updateVendor(id: string, vendor: Partial<Vendor>): Promise<Vendor | undefined>;
  deleteVendor(id: string): Promise<boolean>;

  // Alerts
  getAllAlerts(): Promise<Alert[]>;
  getAlert(id: string): Promise<Alert | undefined>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: string, alert: Partial<Alert>): Promise<Alert | undefined>;
  deleteAlert(id: string): Promise<boolean>;

  // Training Programs
  getAllTrainingPrograms(): Promise<TrainingProgram[]>;
  getTrainingProgram(id: string): Promise<TrainingProgram | undefined>;
  createTrainingProgram(program: InsertTrainingProgram): Promise<TrainingProgram>;
  updateTrainingProgram(id: string, program: Partial<TrainingProgram>): Promise<TrainingProgram | undefined>;
  deleteTrainingProgram(id: string): Promise<boolean>;

  // Field Activities
  getAllFieldActivities(): Promise<FieldActivity[]>;
  getFieldActivity(id: string): Promise<FieldActivity | undefined>;
  createFieldActivity(activity: InsertFieldActivity): Promise<FieldActivity>;
  updateFieldActivity(id: string, activity: Partial<FieldActivity>): Promise<FieldActivity | undefined>;
  deleteFieldActivity(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private employees: Map<string, Employee>;
  private projects: Map<string, Project>;
  private files: Map<string, File>;
  private vendors: Map<string, Vendor>;
  private alerts: Map<string, Alert>;
  private trainingPrograms: Map<string, TrainingProgram>;
  private fieldActivities: Map<string, FieldActivity>;

  constructor() {
    this.users = new Map();
    this.employees = new Map();
    this.projects = new Map();
    this.files = new Map();
    this.vendors = new Map();
    this.alerts = new Map();
    this.trainingPrograms = new Map();
    this.fieldActivities = new Map();
    
    // Initialize with dummy data
    this.initializeDummyData();
  }

  private initializeDummyData() {
    // Populate employees
    allEmployees.forEach(employee => {
      this.employees.set(employee.id, employee);
    });

    // Populate projects
    allProjects.forEach(project => {
      this.projects.set(project.id, project);
    });

    // Populate files
    allFiles.forEach(file => {
      this.files.set(file.id, file);
    });

    // Populate vendors
    allVendors.forEach(vendor => {
      this.vendors.set(vendor.id, vendor);
    });

    // Populate alerts
    dummyAlerts.forEach(alert => {
      this.alerts.set(alert.id, alert);
    });

    // Populate training programs
    dummyTrainingPrograms.forEach(program => {
      this.trainingPrograms.set(program.id, program);
    });

    // Populate field activities
    dummyFieldActivities.forEach(activity => {
      this.fieldActivities.set(activity.id, activity);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Employee methods
  async getAllEmployees(): Promise<Employee[]> {
    return Array.from(this.employees.values());
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    return this.employees.get(id);
  }

  async createEmployee(insertEmployee: InsertEmployee): Promise<Employee> {
    const id = randomUUID();
    const employee: Employee = { 
      ...insertEmployee, 
      id,
      location: insertEmployee.location || null,
      contact: insertEmployee.contact || null,
      email: insertEmployee.email || null,
      skills: insertEmployee.skills || null,
      createdAt: new Date()
    };
    this.employees.set(id, employee);
    return employee;
  }

  async updateEmployee(id: string, updateData: Partial<Employee>): Promise<Employee | undefined> {
    const employee = this.employees.get(id);
    if (!employee) return undefined;
    
    const updatedEmployee = { ...employee, ...updateData };
    this.employees.set(id, updatedEmployee);
    return updatedEmployee;
  }

  async deleteEmployee(id: string): Promise<boolean> {
    return this.employees.delete(id);
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject, 
      id,
      description: insertProject.description || null,
      actualEndDate: insertProject.actualEndDate || null,
      budget: insertProject.budget || null,
      resources: insertProject.resources || null,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updateData: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...updateData };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // File methods
  async getAllFiles(): Promise<File[]> {
    return Array.from(this.files.values());
  }

  async getFile(id: string): Promise<File | undefined> {
    return this.files.get(id);
  }

  async createFile(insertFile: InsertFile): Promise<File> {
    const id = randomUUID();
    const file: File = { 
      ...insertFile, 
      id,
      description: insertFile.description || null,
      createdAt: new Date()
    };
    this.files.set(id, file);
    return file;
  }

  async updateFile(id: string, updateData: Partial<File>): Promise<File | undefined> {
    const file = this.files.get(id);
    if (!file) return undefined;
    
    const updatedFile = { ...file, ...updateData };
    this.files.set(id, updatedFile);
    return updatedFile;
  }

  async deleteFile(id: string): Promise<boolean> {
    return this.files.delete(id);
  }

  // Vendor methods
  async getAllVendors(): Promise<Vendor[]> {
    return Array.from(this.vendors.values());
  }

  async getVendor(id: string): Promise<Vendor | undefined> {
    return this.vendors.get(id);
  }

  async createVendor(insertVendor: InsertVendor): Promise<Vendor> {
    const id = randomUUID();
    const vendor: Vendor = { 
      ...insertVendor, 
      id,
      email: insertVendor.email || null,
      contactPerson: insertVendor.contactPerson || null,
      phone: insertVendor.phone || null,
      expiryDate: insertVendor.expiryDate || null,
      performanceRating: insertVendor.performanceRating || null,
      createdAt: new Date()
    };
    this.vendors.set(id, vendor);
    return vendor;
  }

  async updateVendor(id: string, updateData: Partial<Vendor>): Promise<Vendor | undefined> {
    const vendor = this.vendors.get(id);
    if (!vendor) return undefined;
    
    const updatedVendor = { ...vendor, ...updateData };
    this.vendors.set(id, updatedVendor);
    return updatedVendor;
  }

  async deleteVendor(id: string): Promise<boolean> {
    return this.vendors.delete(id);
  }

  // Alert methods
  async getAllAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values());
  }

  async getAlert(id: string): Promise<Alert | undefined> {
    return this.alerts.get(id);
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = randomUUID();
    const alert: Alert = { 
      ...insertAlert, 
      id,
      status: insertAlert.status || 'Active',
      priority: insertAlert.priority || 'Medium',
      relatedId: insertAlert.relatedId || null,
      assignedTo: insertAlert.assignedTo || null,
      resolvedAt: insertAlert.resolvedAt || null,
      createdAt: new Date()
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async updateAlert(id: string, updateData: Partial<Alert>): Promise<Alert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;
    
    const updatedAlert = { ...alert, ...updateData };
    this.alerts.set(id, updatedAlert);
    return updatedAlert;
  }

  async deleteAlert(id: string): Promise<boolean> {
    return this.alerts.delete(id);
  }

  // Training Program methods
  async getAllTrainingPrograms(): Promise<TrainingProgram[]> {
    return Array.from(this.trainingPrograms.values());
  }

  async getTrainingProgram(id: string): Promise<TrainingProgram | undefined> {
    return this.trainingPrograms.get(id);
  }

  async createTrainingProgram(insertProgram: InsertTrainingProgram): Promise<TrainingProgram> {
    const id = randomUUID();
    const program: TrainingProgram = { 
      ...insertProgram, 
      id,
      status: insertProgram.status || 'Upcoming',
      location: insertProgram.location || null,
      description: insertProgram.description || null,
      skills: insertProgram.skills || null,
      currentParticipants: insertProgram.currentParticipants || null,
      createdAt: new Date()
    };
    this.trainingPrograms.set(id, program);
    return program;
  }

  async updateTrainingProgram(id: string, updateData: Partial<TrainingProgram>): Promise<TrainingProgram | undefined> {
    const program = this.trainingPrograms.get(id);
    if (!program) return undefined;
    
    const updatedProgram = { ...program, ...updateData };
    this.trainingPrograms.set(id, updatedProgram);
    return updatedProgram;
  }

  async deleteTrainingProgram(id: string): Promise<boolean> {
    return this.trainingPrograms.delete(id);
  }

  // Field Activity methods
  async getAllFieldActivities(): Promise<FieldActivity[]> {
    return Array.from(this.fieldActivities.values());
  }

  async getFieldActivity(id: string): Promise<FieldActivity | undefined> {
    return this.fieldActivities.get(id);
  }

  async createFieldActivity(insertActivity: InsertFieldActivity): Promise<FieldActivity> {
    const id = randomUUID();
    const activity: FieldActivity = { 
      ...insertActivity, 
      id,
      status: insertActivity.status || 'Scheduled',
      description: insertActivity.description || null,
      priority: insertActivity.priority || 'Medium',
      coordinates: insertActivity.coordinates || null,
      completedDate: insertActivity.completedDate || null,
      notes: insertActivity.notes || null,
      createdAt: new Date()
    };
    this.fieldActivities.set(id, activity);
    return activity;
  }

  async updateFieldActivity(id: string, updateData: Partial<FieldActivity>): Promise<FieldActivity | undefined> {
    const activity = this.fieldActivities.get(id);
    if (!activity) return undefined;
    
    const updatedActivity = { ...activity, ...updateData };
    this.fieldActivities.set(id, updatedActivity);
    return updatedActivity;
  }

  async deleteFieldActivity(id: string): Promise<boolean> {
    return this.fieldActivities.delete(id);
  }
}

export const storage = new MemStorage();
