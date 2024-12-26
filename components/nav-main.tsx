"use client";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/molecules/shadcn/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/molecules/shadcn/sidebar";
import { useDashboard } from "@/contexts/DashboardContext";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
  title,
  onItemClick,
  activeItem,
}: {
  items: {
    title: string;
    id: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      id: string;
    }[];
  }[];
  title?: string;
  onItemClick: (id: string) => void;
  activeItem: string;
}) {
  const { setActiveContent, activeContent } = useDashboard();

  const handleItemClick = (id: string) => {
    // console.log('NavMain - Clicked section:', id);
    // console.log('NavMain - Previous activeContent:', activeContent);
    setActiveContent(id);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    "transition-colors duration-200",
                    activeContent === item.id ? 
                    "bg-accent/100 text-accent-foreground hover:bg-accent/100" : 
                    "hover:bg-accent/40"
                  )}
                >
                  {item.icon && <item.icon                   className={cn(
                    activeContent === item.id ? "text-foreground" : "text-muted-foreground"
                  )} />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}