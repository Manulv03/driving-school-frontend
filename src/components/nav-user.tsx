"use client"

import {
  BadgeCheck,
  Bell,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/auth-context"
import type { User } from "@/types/auth/auth-types"
import { SidebarMenuButton, useSidebar } from "./ui/sidebar"
import { cn } from "@/lib/utils"

interface NavUserProps {
  user: User
}

export function NavUser({
  user,
}: NavUserProps) {
  const { logout } = useAuth()
  const { isMobile, state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className={cn(
            "flex items-center gap-2 rounded-lg  px-2 py-1.5 text-left text-sm transition-all hover:bg-accent",
            isCollapsed ? "w-10 justify-center" : "w-full"
          )}
        >
          <Avatar className="h-6 w-6 rounded-md bg-primary/10">
            <AvatarImage src={user.avatar} alt={user.userName} />
            <AvatarFallback className="rounded-md bg-primary/10 text-xs">
              {user.userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="grid flex-1 overflow-hidden">
              <span className="truncate font-medium">{user.userName}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center gap-2 p-2 text-left">
            <Avatar className="h-8 w-8 rounded-md">
              <AvatarImage src={user.avatar} alt={user.userName} />
              <AvatarFallback className="rounded-md bg-primary/10">
                {user.userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 gap-0.5">
              <span className="text-sm font-medium">{user.userName}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck className="mr-2 h-4 w-4" />
            <span>Mi Cuenta</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notificaciones</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
