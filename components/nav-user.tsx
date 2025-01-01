"use client";

import { UserButton } from "@clerk/nextjs";
import {
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/molecules/shadcn/sidebar";
import { OrganizationProfile, useOrganization } from '@clerk/nextjs'
import { useOrganizationList } from '@clerk/clerk-react'



import { useUser } from "@clerk/clerk-react";

export function NavUser() {
  const { user } = useUser();
  const { organization } = useOrganization();
  console.log("organization", organization);
  console.log("user", user);

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })
  console.log("userMemberships", userMemberships);
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
        {/* {organization && <OrganizationProfile />} */}
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
