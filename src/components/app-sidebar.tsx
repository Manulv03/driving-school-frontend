"use client";

import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { useAuth } from "@/context/auth-context";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { navigation } from "@/config/navigation";
import type { Role } from "@/types/auth/auth-types";

const mockSchool = {
  name: "Driving School",
  logo: GalleryVerticalEnd,
  plan: "Enterprise",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={[mockSchool]} />
        </SidebarHeader>
        <SidebarContent>
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="text-sm text-gray-500">Cargando...</div>
            </div>
          </div>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
  }

  // Get navigation items based on user role
  const navItems = navigation[user?.role || "alumno"] || [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={[mockSchool]} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={
            user || {
              id: "guest",
              name: "Invitado",
              userName: "Invitado",
              email: "guest@example.com",
              role: "alumno" as Role,
              avatar: undefined,
            }
          }
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
