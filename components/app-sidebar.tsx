"use client";

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
  MoreHorizontal,
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
} from "lucide-react";

import { Lock, Wand2, BarChart2 } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/molecules/shadcn/sidebar";

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
      url: "#",
      icon: Globe,
    },
    {
      title: "Credit Cards",
      url: "#",
      icon: CreditCard,
    },
    {
      title: "Identity Documents",
      url: "#",
      icon: UserSquare,
    },
    {
      title: "Notes",
      url: "#",
      icon: FileText,
    },
    {
      title: "Social Media Accounts",
      url: "#",
      icon: AtSign,
    },
    {
      title: "Email Accounts",
      url: "#",
      icon: Mail,
    },
    {
      title: "Wifi Passwords",
      url: "#",
      icon: Wifi,
    },
    {
      title: "Bank Accounts",
      url: "#",
      icon: Landmark,
    },
  ],
  PasswordMenu: [
    {
      title: "Passwords",
      url: "#",
      icon: Lock,
    },
    {
      title: "Password Generator",
      url: "#",
      icon: Wand2,
    },
    {
      title: "Password Analyzer",
      url: "#",
      icon: BarChart2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.PasswordMenu}
          title="Passwords" // Add your custom title here
        />
        <NavMain
          items={data.Categories}
          title="Categories" // Add your custom title here
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
