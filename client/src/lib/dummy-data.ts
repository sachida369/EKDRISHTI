import { 
  type Employee, 
  type Project, 
  type File, 
  type Vendor, 
  type Alert, 
  type TrainingProgram, 
  type FieldActivity 
} from "@shared/schema";

export const dummyEmployees: Employee[] = [
  {
    id: "emp-1",
    name: "Rajesh Kumar",
    employeeId: "RDSO001",
    role: "ED",
    designation: "Executive Director",
    shift: "General (9-17)",
    status: "Present",
    location: "HQ Office",
    department: "Signal & Telecom",
    contact: "+91-9876543210",
    email: "rajesh.kumar@rdso.indianrailways.gov.in",
    joinDate: new Date("2015-03-15"),
    skills: ["Signal Systems", "Project Management", "Railways Operations"],
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "emp-2",
    name: "Amit Kumar",
    employeeId: "RDSO002",
    role: "SSE",
    designation: "Senior Section Engineer",
    shift: "Morning (6-14)",
    status: "Present",
    location: "HQ Office",
    department: "Signal & Telecom",
    contact: "+91-9876543211",
    email: "amit.kumar@rdso.indianrailways.gov.in",
    joinDate: new Date("2018-07-20"),
    skills: ["Signal Testing", "Circuit Analysis", "Field Operations"],
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "emp-3",
    name: "Priya Gupta",
    employeeId: "RDSO003",
    role: "ADE",
    designation: "Additional Director Electrical",
    shift: "General (9-17)",
    status: "Absent",
    location: "",
    department: "Electrical",
    contact: "+91-9876543212",
    email: "priya.gupta@rdso.indianrailways.gov.in",
    joinDate: new Date("2012-11-10"),
    skills: ["Electrical Systems", "Power Management", "Team Leadership"],
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "emp-4",
    name: "Rajesh Sharma",
    employeeId: "RDSO004",
    role: "JE",
    designation: "Junior Engineer",
    shift: "Evening (14-22)",
    status: "Field Duty",
    location: "Lucknow Division",
    department: "Rolling Stock",
    contact: "+91-9876543213",
    email: "rajesh.sharma@rdso.indianrailways.gov.in",
    joinDate: new Date("2020-02-05"),
    skills: ["Rolling Stock Testing", "Maintenance", "Field Inspection"],
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "emp-5",
    name: "Dr. S.K. Singh",
    employeeId: "RDSO005",
    role: "Director",
    designation: "Director",
    shift: "General (9-17)",
    status: "Present",
    location: "HQ Office",
    department: "Signal & Telecom",
    contact: "+91-9876543214",
    email: "sk.singh@rdso.indianrailways.gov.in",
    joinDate: new Date("2010-05-12"),
    skills: ["Research & Development", "Signal Modernization", "Technical Standards"],
    createdAt: new Date("2024-01-01"),
  },
];

export const dummyProjects: Project[] = [
  {
    id: "proj-1",
    name: "Signal Modernization Phase-II",
    description: "Upgrading signalling systems across NCR division with modern electronic interlocking.",
    status: "On Track",
    progress: 78,
    lead: "Dr. S.K. Singh",
    department: "Signal & Telecom",
    startDate: new Date("2024-01-15"),
    targetDate: new Date("2024-12-31"),
    actualEndDate: null,
    priority: "High",
    budget: 5000000,
    resources: ["Signal Engineers", "Electronic Equipment", "Testing Tools"],
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "proj-2",
    name: "Track Circuit Testing",
    description: "Comprehensive testing of track circuits for enhanced safety protocols.",
    status: "In Progress",
    progress: 45,
    lead: "A.K. Verma",
    department: "Signal & Telecom",
    startDate: new Date("2024-03-01"),
    targetDate: new Date("2024-08-30"),
    actualEndDate: null,
    priority: "Medium",
    budget: 2500000,
    resources: ["Testing Equipment", "Field Engineers", "Safety Protocols"],
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "proj-3",
    name: "Oscillation Trial Analysis",
    description: "Analysis of rolling stock oscillation patterns for improved ride quality.",
    status: "Delayed",
    progress: 23,
    lead: "M.R. Joshi",
    department: "Rolling Stock",
    startDate: new Date("2024-02-15"),
    targetDate: new Date("2024-06-15"),
    actualEndDate: null,
    priority: "High",
    budget: 3000000,
    resources: ["Testing Coaches", "Measurement Equipment", "Analysis Software"],
    createdAt: new Date("2024-01-01"),
  },
];

export const dummyFiles: File[] = [
  {
    id: "file-1",
    fileId: "F-2024-001",
    subject: "Signal Upgrade Approval",
    description: "Technical approval for signal modernization in Delhi division",
    currentOfficer: "J.K. Sharma (ADE)",
    status: "Pending",
    priority: "High",
    submissionDate: new Date("2024-01-10"),
    lastMovedDate: new Date("2024-01-18"),
    pendingDays: 8,
    department: "Signal & Telecom",
    fileType: "Technical Approval",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "file-2",
    fileId: "F-2024-002",
    subject: "Vendor Empanelment",
    description: "New vendor application for electronic components",
    currentOfficer: "R.P. Gupta (Director)",
    status: "Under Review",
    priority: "Medium",
    submissionDate: new Date("2024-01-20"),
    lastMovedDate: new Date("2024-01-21"),
    pendingDays: 5,
    department: "Purchase",
    fileType: "Vendor Registration",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "file-3",
    fileId: "F-2024-003",
    subject: "Training Budget Approval",
    description: "Budget allocation for Q2 training programs",
    currentOfficer: "S.M. Patel (ADG)",
    status: "Approved",
    priority: "Low",
    submissionDate: new Date("2024-01-22"),
    lastMovedDate: new Date("2024-01-24"),
    pendingDays: 2,
    department: "Administration",
    fileType: "Budget Approval",
    createdAt: new Date("2024-01-01"),
  },
];

export const dummyVendors: Vendor[] = [
  {
    id: "vendor-1",
    name: "M/s ABC Electronics Ltd.",
    vendorId: "VEN001",
    product: "Electronic Interlocking Systems",
    status: "Approved",
    stage: "Active Contract",
    contactPerson: "Mr. Anil Sharma",
    email: "anil@abcelectronics.com",
    phone: "+91-9876543215",
    address: "123 Electronics Park, Gurgaon",
    registrationDate: new Date("2023-06-15"),
    expiryDate: new Date("2025-06-14"),
    performanceRating: 4,
    category: "Signal Equipment",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "vendor-2",
    name: "M/s Railway Safety Systems",
    vendorId: "VEN002",
    product: "Track Circuit Equipment",
    status: "Under Review",
    stage: "Technical Evaluation",
    contactPerson: "Mrs. Sunita Mehta",
    email: "sunita@railwaysafety.com",
    phone: "+91-9876543216",
    address: "456 Safety Complex, Mumbai",
    registrationDate: new Date("2024-01-05"),
    expiryDate: null,
    performanceRating: 0,
    category: "Safety Equipment",
    createdAt: new Date("2024-01-01"),
  },
];

export const dummyAlerts: Alert[] = [
  {
    id: "alert-1",
    title: "Critical File Delay",
    description: "File F-2024-001 has been pending with J.K. Sharma (ADE) for 8 days. Immediate attention required.",
    type: "Critical",
    category: "File",
    priority: "High",
    status: "Active",
    relatedId: "file-1",
    assignedTo: "J.K. Sharma",
    createdAt: new Date("2024-01-26"),
    resolvedAt: null,
  },
  {
    id: "alert-2",
    title: "Vendor Contract Expiry",
    description: "M/s ABC Electronics Ltd. contract expires in 5 days. Renewal process should be initiated.",
    type: "Warning",
    category: "Vendor",
    priority: "Medium",
    status: "Active",
    relatedId: "vendor-1",
    assignedTo: "R.P. Gupta",
    createdAt: new Date("2024-01-25"),
    resolvedAt: null,
  },
  {
    id: "alert-3",
    title: "High Staff Absence",
    description: "15 staff members absent today including 3 from critical sections.",
    type: "Warning",
    category: "Employee",
    priority: "Medium",
    status: "Active",
    relatedId: null,
    assignedTo: "HR Department",
    createdAt: new Date("2024-01-26"),
    resolvedAt: null,
  },
];

export const dummyTrainingPrograms: TrainingProgram[] = [
  {
    id: "training-1",
    title: "Advanced Signal Systems",
    description: "Comprehensive training on modern signalling technologies",
    instructor: "Dr. S.K. Singh",
    department: "Signal & Telecom",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-05"),
    maxParticipants: 25,
    currentParticipants: 18,
    skills: ["Electronic Interlocking", "Signal Testing", "Safety Protocols"],
    location: "RDSO Training Center",
    status: "Upcoming",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "training-2",
    title: "Railway Safety Management",
    description: "Safety protocols and risk management in railway operations",
    instructor: "A.K. Verma",
    department: "Safety",
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-02-18"),
    maxParticipants: 30,
    currentParticipants: 30,
    skills: ["Risk Assessment", "Safety Standards", "Emergency Response"],
    location: "RDSO Conference Hall",
    status: "Ongoing",
    createdAt: new Date("2024-01-01"),
  },
];

export const dummyFieldActivities: FieldActivity[] = [
  {
    id: "activity-1",
    title: "Signal Installation Inspection",
    description: "Inspection of newly installed signals at Ghaziabad Junction",
    assignedOfficer: "Rajesh Sharma",
    location: "Ghaziabad Junction",
    coordinates: { lat: 28.6692, lng: 77.4538 },
    scheduledDate: new Date("2024-01-26"),
    completedDate: null,
    status: "Scheduled",
    activityType: "Inspection",
    priority: "High",
    notes: "Focus on electronic interlocking system integration",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "activity-2",
    title: "Track Circuit Testing",
    description: "Performance testing of track circuits on Delhi-Mumbai route",
    assignedOfficer: "Amit Kumar",
    location: "Mathura Junction",
    coordinates: { lat: 27.4924, lng: 77.6737 },
    scheduledDate: new Date("2024-01-25"),
    completedDate: new Date("2024-01-25"),
    status: "Completed",
    activityType: "Trial",
    priority: "Medium",
    notes: "All circuits tested successfully, minor adjustments made",
    createdAt: new Date("2024-01-01"),
  },
];

// Generate additional dummy data to meet the requirements
export function generateAdditionalEmployees(): Employee[] {
  const additionalEmployees: Employee[] = [];
  const departments = ["Signal & Telecom", "Electrical", "Rolling Stock", "Civil", "Mechanical", "Safety"];
  const roles = ["JE", "SSE", "ADE", "Director", "JD"];
  const statuses = ["Present", "Absent", "Field Duty"];
  const shifts = ["Morning (6-14)", "Evening (14-22)", "Night (22-6)", "General (9-17)"];
  
  for (let i = 6; i <= 50; i++) {
    additionalEmployees.push({
      id: `emp-${i}`,
      name: `Employee ${i}`,
      employeeId: `RDSO${String(i).padStart(3, '0')}`,
      role: roles[Math.floor(Math.random() * roles.length)],
      designation: roles[Math.floor(Math.random() * roles.length)],
      shift: shifts[Math.floor(Math.random() * shifts.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      location: Math.random() > 0.3 ? "HQ Office" : `Division ${Math.floor(Math.random() * 5) + 1}`,
      department: departments[Math.floor(Math.random() * departments.length)],
      contact: `+91-98765432${String(i).padStart(2, '0')}`,
      email: `employee${i}@rdso.indianrailways.gov.in`,
      joinDate: new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      skills: ["Technical Skills", "Field Operations", "Documentation"],
      createdAt: new Date("2024-01-01"),
    });
  }
  
  return additionalEmployees;
}

export function generateAdditionalProjects(): Project[] {
  const additionalProjects: Project[] = [];
  const departments = ["Signal & Telecom", "Electrical", "Rolling Stock", "Civil", "Mechanical"];
  const statuses = ["On Track", "Delayed", "In Progress", "Completed"];
  const priorities = ["High", "Medium", "Low"];
  
  for (let i = 4; i <= 10; i++) {
    additionalProjects.push({
      id: `proj-${i}`,
      name: `Project ${i}`,
      description: `Description for project ${i}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      progress: Math.floor(Math.random() * 100),
      lead: `Project Lead ${i}`,
      department: departments[Math.floor(Math.random() * departments.length)],
      startDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      targetDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      actualEndDate: null,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      budget: 1000000 + Math.floor(Math.random() * 5000000),
      resources: [`Resource ${i}A`, `Resource ${i}B`],
      createdAt: new Date("2024-01-01"),
    });
  }
  
  return additionalProjects;
}

export function generateAdditionalVendors(): Vendor[] {
  const additionalVendors: Vendor[] = [];
  const statuses = ["Approved", "Rejected", "Under Review", "Pending"];
  const categories = ["Signal Equipment", "Electrical Systems", "Rolling Stock", "Safety Equipment"];
  
  for (let i = 3; i <= 20; i++) {
    additionalVendors.push({
      id: `vendor-${i}`,
      name: `M/s Vendor ${i} Ltd.`,
      vendorId: `VEN${String(i).padStart(3, '0')}`,
      product: `Product ${i}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      stage: "Evaluation Stage",
      contactPerson: `Contact Person ${i}`,
      email: `contact${i}@vendor${i}.com`,
      phone: `+91-98765432${String(i).padStart(2, '0')}`,
      address: `Address ${i}`,
      registrationDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      expiryDate: Math.random() > 0.5 ? new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1) : null,
      performanceRating: Math.floor(Math.random() * 5),
      category: categories[Math.floor(Math.random() * categories.length)],
      createdAt: new Date("2024-01-01"),
    });
  }
  
  return additionalVendors;
}

export function generateAdditionalFiles(): File[] {
  const additionalFiles: File[] = [];
  const statuses = ["Pending", "Under Review", "Approved", "Rejected"];
  const departments = ["Signal & Telecom", "Electrical", "Rolling Stock", "Civil", "Administration"];
  const fileTypes = ["Technical Approval", "Budget Approval", "Vendor Registration", "Safety Clearance"];
  
  for (let i = 4; i <= 30; i++) {
    const pendingDays = Math.floor(Math.random() * 15);
    additionalFiles.push({
      id: `file-${i}`,
      fileId: `F-2024-${String(i).padStart(3, '0')}`,
      subject: `File Subject ${i}`,
      description: `Description for file ${i}`,
      currentOfficer: `Officer ${i}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
      submissionDate: new Date(2024, 0, Math.floor(Math.random() * 26) + 1),
      lastMovedDate: new Date(2024, 0, Math.floor(Math.random() * 26) + 1),
      pendingDays: pendingDays,
      department: departments[Math.floor(Math.random() * departments.length)],
      fileType: fileTypes[Math.floor(Math.random() * fileTypes.length)],
      createdAt: new Date("2024-01-01"),
    });
  }
  
  return additionalFiles;
}

export const allEmployees = [...dummyEmployees, ...generateAdditionalEmployees()];
export const allProjects = [...dummyProjects, ...generateAdditionalProjects()];
export const allVendors = [...dummyVendors, ...generateAdditionalVendors()];
export const allFiles = [...dummyFiles, ...generateAdditionalFiles()];
