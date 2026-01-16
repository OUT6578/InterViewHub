"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import SiteHeader from "./SiteHeader"
import AppSidebar from "./AppSidebar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen>
      {/* FIXED HEADER */}
      <SiteHeader />

      {/* BODY (Below Header) */}
      <div className="flex w-full pt-14 min-h-[calc(100vh-3.5rem)]">
        {/* SIDEBAR */}
        <AppSidebar />

        {/* MAIN CONTENT */}
        <SidebarInset className="flex-1 flex flex-col w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative">
          {/* FIXED APP NAME BAR */}
          <div className="fixed top-14 left-0 right-0 z-40 h-12 border-b bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
            <span className="font-bold text-sm bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Event Management System
            </span>
          </div>

          <main className="flex-1 mt-12 p-6 md:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
