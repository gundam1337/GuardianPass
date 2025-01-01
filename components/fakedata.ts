interface MembersProps {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  teamId?: string;
}

interface TeamProps {
  id: string;
  name: string;
  description: string;
  admins: string[]; 
  users: string[]; 
  createdAt: string;
}

export const teams: TeamProps[] = [
  {
    id: "team-1",
    name: "Development Team",
    description: "Main development and engineering team",
    admins: ["admin-1", "admin-2"],
    users: ["user-1", "user-2", "user-3", "user-4"],
    createdAt: "2024-01-15",
  },
  {
    id: "team-2",
    name: "Design Team",
    description: "UI/UX and graphic design team",
    admins: ["admin-2", "admin-3"],
    users: ["user-5", "user-6", "user-7"],
    createdAt: "2024-02-01",
  },
  {
    id: "team-3",
    name: "Marketing Team",
    description: "Marketing and communications team",
    admins: ["admin-1", "admin-3"],
    users: ["user-8", "user-9", "user-10", "user-11", "user-12"],
    createdAt: "2024-02-15",
  },
];

export const members: MembersProps[] = [
  // Admins
  {
    id: "admin-1",
    name: "Aram Martin",
    email: "aram.martin@email.com",
    role: "admin",
    teamId: "team-1",
  },
  {
    id: "admin-2",
    name: "Islam Lee",
    email: "islam.lee@email.com",
    role: "admin",
    teamId: "team-2",
  },
  {
    id: "admin-3",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "admin",
    teamId: "team-3",
  },
  // Users
  {
    id: "user-1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    role: "user",
    teamId: "team-1",
  },
  {
    id: "user-2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    role: "user",
    teamId: "team-1",
  },
  {
    id: "user-3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    role: "user",
    teamId: "team-1",
  },
  {
    id: "user-4",
    name: "William Kim",
    email: "william.kim@email.com",
    role: "user",
    teamId: "team-1",
  },
  {
    id: "user-5",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    role: "user",
    teamId: "team-2",
  },
  {
    id: "user-6",
    name: "Lucas Rodriguez",
    email: "lucas.rodriguez@email.com",
    role: "user",
    teamId: "team-2",
  },
  {
    id: "user-7",
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    role: "user",
    teamId: "team-2",
  },
  {
    id: "user-8",
    name: "Noah Chen",
    email: "noah.chen@email.com",
    role: "user",
    teamId: "team-3",
  },
  {
    id: "user-9",
    name: "Ava Thompson",
    email: "ava.thompson@email.com",
    role: "user",
    teamId: "team-3",
  },
  {
    id: "user-10",
    name: "Liam Garcia",
    email: "liam.garcia@email.com",
    role: "user",
    teamId: "team-3",
  },
  {
    id: "user-11",
    name: "Mia Patel",
    email: "mia.patel@email.com",
    role: "user",
    teamId: "team-3",
  },
  {
    id: "user-12",
    name: "Ethan Brown",
    email: "ethan.brown@email.com",
    role: "user",
    teamId: "team-3",
  },
];
