import SearchPassword from "@/components/search-password";
import PasswordDialog from "@/components/PasswordDialog";
import { DataTable } from "@/components/PassDataTable";

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

type PasswordEntry = {
  id: string;
  website: string;
  username: string;
  lastUpdated: string;
};

const passwordColumns: ColumnDef<PasswordEntry>[] = [
  {
    accessorKey: "website",
    header: "Website/App",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("website")}</div>
    ),
  },
  {
    accessorKey: "username",
    header: "Username/Email",
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
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
            <DropdownMenuSeparator />
            <EditEntryAction />
            <DropdownMenuItem>Delete Entry</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

//example of fake data
const passwordData: PasswordEntry[] = [
  {
    id: "m5gr84i9",
    website: "netflix.com",
    username: "ken99@yahoo.com",
    lastUpdated: "2024-03-15",
  },
  // ... other entries
];

export function PasswordsContent() {
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
