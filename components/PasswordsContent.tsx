"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import SearchPassword from "@/components/search-password";
import PasswordDialog from "@/components/PasswordDialog";
import { DataTable } from "@/components/PassDataTable";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/molecules/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/molecules/shadcn/dropdown-menu";
import { EditEntryAction } from "./EditPassModal";
import { Id } from "../convex/_generated/dataModel";

// UI-side type
interface PasswordEntry {
  id: string;
  website: string;
  username: string;
  lastUpdated: string;
  owner: string;
  password: string;
}

// API response type

// Transform function using the correct types

const passwordColumns: ColumnDef<PasswordEntry>[] = [
  {
    accessorKey: "website",
    header: "Website/App",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("website")}</div>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => <div>{row.getValue("owner")}</div>,
  },
  {
    accessorKey: "username",
    header: "Username/Email",
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => {
      const [showPassword, setShowPassword] = useState(false);

      return (
        <div className="flex items-center gap-2">
          <div className="font-mono">
            {showPassword ? row.getValue("password") : "•".repeat(8)}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            className="h-8 w-8 p-0"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "lastUpdated",
    header: () => <div className="text-right">Last Updated</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastUpdated"));
      const formatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const entry = row.original;
      const [showPassword, setShowPassword] = useState(false);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(entry.username)}
            >
              Copy username
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(entry.password)}
            >
              Copy password
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"} password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditEntryAction />
            <DropdownMenuItem>Delete Entry</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Loading skeleton component

// Exact type from the API (matching the hover type)
interface PasswordVaultPersonal {
  password: string;
  _id: Id<"passwordVaultPersonal">;
  _creationTime: number;
  url?: string;
  email?: string;
  category?: string;
  username?: string;
  websiteName: string;
  userId: string;
  createdAt: number;
}

function transformPasswordData(
  rawData: PasswordVaultPersonal[]
): PasswordEntry[] {
  return rawData.map((entry) => ({
    id: entry._id,
    website: entry.websiteName,
    username: entry.username || "",
    lastUpdated: new Date(entry._creationTime).toISOString().split("T")[0], // Using _creationTime instead of createdAt
    password: entry.password,
    owner: entry.email ? entry.email.split("@")[0] : entry.username || "",
  }));
}

export function PasswordsContent() {
  const data = useQuery(api.password.getAllPasswords);

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  const passwordData = transformPasswordData(data);

  return (
    <>
      <div className="mt-6 mb-6 flex items-center space-x-3 px-4">
        <SearchPassword />
        <PasswordDialog />
      </div>
      <div className="mt-4 space-x-3 px-4">
        <DataTable
          data={passwordData}
          columns={passwordColumns}
          dateFilterField="lastUpdated"
        />
      </div>
    </>
  );
}

// function PasswordsSkeleton() {
//   return (
//     <div className="w-full space-y-4 p-4">
//       <div className="flex items-center space-x-3">
//         <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />
//         <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
//       </div>
//       <div className="space-y-2">
//         {Array.from({ length: 5 }).map((_, index) => (
//           <div
//             key={index}
//             className="h-16 w-full animate-pulse rounded bg-gray-200"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
