"use client"

import { LogOut, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-end px-4 shadow-sm">
      {/* RIGHT: Profile + Logout */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="hover:bg-slate-200 dark:hover:bg-slate-700">
          <UserCircle className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="hover:bg-slate-200 dark:hover:bg-slate-700">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
