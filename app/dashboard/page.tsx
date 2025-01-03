"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { Toaster } from "@/components/molecules/shadcn/toaster";
import { Authenticated } from "convex/react";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/molecules/shadcn/sidebar";
import { DashboardContent } from "@/components/dashboard-content";
import { DashboardProvider } from "@/contexts/DashboardContext";

export default function Page() {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <Authenticated>
            <DashboardContent />
          </Authenticated>
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </DashboardProvider>
  );
}
