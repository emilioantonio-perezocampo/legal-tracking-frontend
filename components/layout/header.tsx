'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/stores/ui-store"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/auth/client"
import { 
  Menu, 
  Bell, 
  Search, 
  Settings,
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  FileText,
  BookOpen,
  Users,
  BarChart,
  Calendar as CalendarIcon
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserAvatarWithDropdown } from "./user-avatar-dropdown"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { setMobileSidebarOpen } = useUIStore()
  const supabase = createClient()

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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 md:hidden"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="flex items-center gap-2 mr-8">
           <span className="text-blue-700 font-bold text-lg tracking-tight">LegalTracking</span>
           <span className="bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded-full font-medium border border-blue-100">Enterprise</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-blue-600" : "text-gray-400")} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden sm:block">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
             <input 
               type="search" 
               placeholder="Search..." 
               className="h-9 w-64 rounded-md border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
             />
          </div>
          
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Bell className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-gray-500">
            <Settings className="h-5 w-5" />
          </Button>
          
          <UserAvatarWithDropdown 
            name="John Lawson"
            role="Partner"
            className="ml-2"
          />
        </div>
      </div>
    </header>
  )
}
