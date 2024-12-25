"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/molecules/shadcn/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/molecules/shadcn/sidebar";
import { useDashboard } from '@/contexts/DashboardContext';  

export function NavMain({
    items,
    title,
    onItemClick,
    activeItem
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

  // Add click handler
  const handleItemClick = (id: string) => {
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
                  className={activeContent === item.id ? 'active' : ''} 
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton 
                        onClick={() => handleItemClick(subItem.id)}  
                        className={activeContent === subItem.id ? 'active' : ''} 
                      >
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}