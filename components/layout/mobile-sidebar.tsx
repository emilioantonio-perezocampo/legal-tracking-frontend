'use client'

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useUIStore } from "@/stores/ui-store"
import { ContextSidebar } from "./context-sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  MessageSquare, 
  Briefcase, 
  FileText, 
  BookOpen, 
  Users, 
  BarChart, 
  Calendar as CalendarIcon 
} from "lucide-react"

export function MobileSidebar() {
  const { isMobileSidebarOpen, setMobileSidebarOpen } = useUIStore()
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Legal AI', href: '/legal-ai', icon: MessageSquare },
    { name: 'Cases', href: '/expedientes', icon: Briefcase },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Knowledge', href: '/knowledge-base', icon: BookOpen },
    { name: 'Admin', href: '/admin', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: BarChart },
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  ]

  return (
    <Sheet open={isMobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
      <SheetContent side="left" className="p-0 w-[280px]">
        <div className="p-4 border-b border-gray-200">
           <span className="text-blue-700 font-bold text-lg tracking-tight">LegalTracking</span>
        </div>
        
        {/* Mobile Navigation Links */}
        <div className="p-4 border-b border-gray-200 space-y-1">
           {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-blue-600" : "text-gray-400")} />
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Context Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
           <ContextSidebar /> {/* Reusing the context sidebar content */}
        </div>
      </SheetContent>
    </Sheet>
  )
}
