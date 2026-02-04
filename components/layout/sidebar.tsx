'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Calendar, 
  Briefcase, 
  Settings, 
  LogOut,
  Users
} from "lucide-react"
import { createClient } from "@/lib/auth/client"
import { useRouter } from "next/navigation"

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Expedientes', href: '/expedientes', icon: Briefcase },
  { name: 'Calendario', href: '/calendar', icon: Calendar },
  { name: 'Clientes', href: '/clientes', icon: Users },
  { name: 'Configuración', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
          <span>LegalTracking</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto p-4">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5 shrink-0",
                  isActive ? "text-primary-foreground" : "text-gray-400 group-hover:text-gray-500"
                )} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto border-t pt-4">
          <button
            onClick={handleSignOut}
            className="group flex w-full items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 shrink-0 text-gray-400 group-hover:text-red-600" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}
