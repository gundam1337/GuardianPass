"use client";
//to add : make the sidebar catgories clickable and have some clikable items appear
import * as React from "react";
import {
  Globe,
  CreditCard,
  UserSquare,
  FileText,
  AtSign,
  Mail,
  Wifi,
  Landmark,
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
} from "lucide-react";

import { Lock, Wand2, BarChart2 } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/molecules/shadcn/sidebar";
import { useDashboard } from "@/contexts/DashboardContext"; // Add this import

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  Categories: [
    {
      title: "Web Logins",
      id: "WebLogins",
      icon: Globe,
    },
    {
      title: "Credit Cards",
      id: "CreditCards",
      icon: CreditCard,
    },
    {
      title: "Identity Documents",
      id: "Identity Documents",
      icon: UserSquare,
    },
    {
      title: "Notes",
      id: "Notes",
      icon: FileText,
    },
    {
      title: "Social Media Accounts",
      id: "SocialMediaAccounts",
      icon: AtSign,
    },
    {
      title: "Email Accounts",
      id: "EmailAccounts",
      icon: Mail,
    },
    {
      title: "Wifi Passwords",
      id: "WifiPasswords",
      icon: Wifi,
    },
    {
      title: "Bank Accounts",
      id: "BankAccounts",
      icon: Landmark,
    },
  ],
  PasswordMenu: [
    {
      title: "Passwords",
      id: "passwords",
      icon: Lock,
    },
    {
      title: "Password Generator",
      id: "passwordGenerator",
      icon: Wand2,
    },
    {
      title: "Password Analyzer",
      id: "passwordAnalyzer",
      icon: BarChart2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setActiveContent, activeContent } = useDashboard();

  const handleMenuClick = (id: string) => {
    // console.log("AppSidebar - Clicked section:", id);
    // console.log("AppSidebar - Previous activeContent:", activeContent);
    setActiveContent(id);
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* team switcher */}
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain
          items={data.PasswordMenu}
          title="Passwords"
          onItemClick={handleMenuClick}
          activeItem={activeContent}
        />
        <NavMain
          items={data.Categories}
          title="Categories"
          onItemClick={handleMenuClick}
          activeItem={activeContent}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
