export const pipelineStages = [
  "Business Development",
  "Quotation",
  "Project Kickoff",
  "Submission",
  "Post-Submission",
  "Completed"
];

export const mockClients = [
  {
    id: "CL-DYS-01",
    name: "Dyson Singapore",
    location: "St James Power Station",
    stage: "Submission",
    submissionType: "SFA Submission",
    status: "active",
    pm: "Shafika",
    sales: "Jasper",
    admin: "Wendy",
    lastUpdated: "2026-04-23T14:30:00",
    requiredDocs: [
      "Letter of Authorisation",
      "Tenancy Agreement",
      "Floorplan (DWG)"
    ],
    nextAction: "Submit application on GoBusiness SG",
    activityTimeline: [
      { date: "2026-04-22 14:00", text: "Draft quotation prepared in Xero", actor: "Wendy" },
      { date: "2026-04-23 09:30", text: "Quotation approved by MD", actor: "Jasper" },
      { date: "2026-04-23 15:00", text: "Layout plan reviewed for SFA requirements", actor: "Shafika" }
    ]
  },
  {
    id: "CL-ACM-02",
    name: "Acme Corp",
    location: "Suntec City Tower 2",
    stage: "Quotation",
    submissionType: "URA Submission",
    status: "active",
    pm: "Shafika",
    sales: "Jasper",
    admin: "Wendy",
    lastUpdated: "2026-04-22T09:15:00",
    requiredDocs: [
      "Company ACRA"
    ],
    nextAction: "Send quotation to Managing Director for approval",
    activityTimeline: [
      { date: "2026-04-20 10:00", text: "Initial lead inquiry received", actor: "Jasper" },
      { date: "2026-04-21 11:30", text: "Site survey completed", actor: "Shafika" }
    ]
  },
  {
    id: "CL-GLO-03",
    name: "Global Logistics Ltd",
    location: "Changi Business Park",
    stage: "Post-Submission",
    submissionType: "SCDF Clearance",
    status: "active",
    pm: "Shafika",
    sales: "Jasper",
    admin: "Wendy",
    lastUpdated: "2026-04-20T11:45:00",
    requiredDocs: [
      "Endorsed SCDF Plans",
      "Fire Safety Certificate"
    ],
    nextAction: "Follow up on client payment",
    activityTimeline: [
      { date: "2026-04-15 09:00", text: "SCDF clearance submitted", actor: "Wendy" },
      { date: "2026-04-18 14:20", text: "SCDF conditional approval received", actor: "Shafika" }
    ]
  }
];

export const mockTasks = [
  {
    id: "TSK-001",
    clientId: "CL-DYS-01",
    clientName: "Dyson Singapore",
    title: "Submit application on GoBusiness SG",
    assignee: "Wendy",
    role: "Admin",
    dueDate: "2026-04-25",
    status: "pending",
    priority: "high",
    aiGenerated: true,
    sopStep: "Stage 3.1: Submit SFA Application",
    triggerReason: "Layout plan review completed by PM. All documents ready for SFA."
  },
  {
    id: "TSK-002",
    clientId: "CL-ACM-02",
    clientName: "Acme Corp",
    title: "Prepare draft quotation in Xero",
    assignee: "Wendy",
    role: "Admin",
    dueDate: "2026-04-24",
    status: "pending",
    priority: "medium",
    aiGenerated: true,
    sopStep: "Stage 1.2: Quotation Preparation",
    triggerReason: "Site survey finalized and scope of works confirmed."
  },
  {
    id: "TSK-003",
    clientId: "CL-DYS-01",
    clientName: "Dyson Singapore",
    title: "Request required client documents",
    assignee: "Jasper",
    role: "Sales Executive",
    dueDate: "2026-04-24",
    status: "completed",
    priority: "low",
    aiGenerated: true,
    sopStep: "Stage 2.1: Project Kickoff",
    triggerReason: "Quotation signed by client. Documents needed to begin."
  },
  {
    id: "TSK-004",
    clientId: "CL-GLO-03",
    clientName: "Global Logistics Ltd",
    title: "Follow up on client payment",
    assignee: "Jasper",
    role: "Sales Executive",
    dueDate: "2026-04-26",
    status: "pending",
    priority: "high",
    aiGenerated: true,
    sopStep: "Stage 4.0: Post-Submission",
    triggerReason: "SCDF conditional approval received 5 days ago."
  },
  {
    id: "TSK-005",
    clientId: "CL-ACM-02",
    clientName: "Acme Corp",
    title: "Send quotation to Managing Director for approval",
    assignee: "Wendy",
    role: "Admin",
    dueDate: "2026-04-24",
    status: "pending",
    priority: "medium",
    aiGenerated: false,
    sopStep: "Stage 1.2: Quotation Approval",
    triggerReason: "Draft quotation created in Xero."
  }
];

export const mockMetrics = {
  totalClients: 3,
  activeProjects: 3,
  pendingTasks: 4,
  aiAllocatedTasks: 4
};
