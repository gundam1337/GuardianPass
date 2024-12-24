"use client";

import { UserButton } from "@clerk/nextjs";
import {
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/molecules/shadcn/sidebar";
import { useUser } from "@clerk/clerk-react";

export function NavUser() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
      >
        <div className="hidden">
          <UserButton />
        </div>
        <UserButton />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user.fullName}</span>
          <span className="truncate text-xs">
            {user.primaryEmailAddress?.emailAddress}
          </span>
        </div>
      </SidebarMenuButton>
    </SidebarMenu>
  );
}
