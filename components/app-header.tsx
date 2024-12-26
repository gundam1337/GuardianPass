import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/molecules/shadcn/breadcrumb";
  import { Separator } from "@/components/molecules/shadcn/separator";
  import { SidebarTrigger } from "@/components/molecules/shadcn/sidebar";
  import { ThemeSwitcher } from "@/components/theme-switcher";
  import { useDashboard} from "@/contexts/DashboardContext";
  
  export const AppHeader = () => {
    const {activeContent } = useDashboard();
    // console.log("AppHeader - activeContent:", activeContent);

    return (
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex flex-1 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink>Acme Inc</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{activeContent}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ThemeSwitcher className="hidden md:flex" />
        </div>
      </header>
    );
  };