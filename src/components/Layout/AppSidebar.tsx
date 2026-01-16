"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { LayoutDashboard, Users, Settings, Shield, LogOut } from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", tooltip: "Go to Dashboard" },
  { icon: Users, label: "Employees", tooltip: "Manage Employees" },
  { icon: Settings, label: "Settings", tooltip: "App Settings" },
  { icon: Shield, label: "Super Admin View", tooltip: "Super Admin Controls" },
]

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="top-14 !h-[calc(100svh-3.5rem)] border-r bg-slate-50 dark:bg-slate-900">
      {/* HEADER WITH TOGGLE ICON */}
      <SidebarHeader className="px-2 py-2">
        <SidebarTrigger className="h-5 w-5" />
      </SidebarHeader>

      {/* SEPARATOR */}
      <SidebarSeparator className="m-0" />

      {/* MENU ITEMS */}
      <SidebarContent>
        <SidebarGroup className="py-4">
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    tooltip={item.tooltip}
                    className="transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER WITH LOGOUT */}
      <SidebarFooter className="py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className="transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
