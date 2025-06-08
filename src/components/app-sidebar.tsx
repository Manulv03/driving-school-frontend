"use client"

import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { useAuth } from "@/context/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { navigation } from "@/config/navigation"
import type { Role } from "@/types/auth/auth-types"

const mockSchool = {
  name: "Driving School",
  logo: GalleryVerticalEnd,
  plan: "Enterprise",
}

const guestUser = {
  id: "guest",
  name: "Invitado",
  userName: "Invitado",
  email: "guest@example.com",
  role: "alumno" as Role,
  avatar: undefined,
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  // Get navigation items based on user role
  const role = user?.role || guestUser.role
  const navItems = navigation[role] || []

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={[mockSchool]} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user || guestUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
