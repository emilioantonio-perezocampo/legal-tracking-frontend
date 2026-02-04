'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSidebarStore } from '@/stores/sidebar-store'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Plus, Search, Bot } from 'lucide-react'

// Import all sidebar variants
import { DashboardSidebar } from '@/components/sidebar/dashboard-sidebar'
import { LegalAISidebar } from '@/components/sidebar/legal-ai-sidebar'
import { CasesSidebar } from '@/components/sidebar/cases-sidebar'
import { CaseDetailSidebar } from '@/components/sidebar/case-detail-sidebar'
import { DocumentsSidebar } from '@/components/sidebar/documents-sidebar'
import { KnowledgeBaseSidebar } from '@/components/sidebar/knowledge-base-sidebar'
import { AnalyticsSidebar } from '@/components/sidebar/analytics-sidebar'
import { AdminSidebar } from '@/components/sidebar/admin-sidebar'
import { CalendarSidebar } from '@/components/sidebar/calendar-sidebar'

export function ContextSidebar() {
  const pathname = usePathname()
  // const { isCollapsed, toggle } = useSidebarStore() // Use persisted store
  // For simplicity in this demo, using local state to avoid hydration mismatch without a wrapper
  // In production, use the store with a client-only wrapper component
  const [isCollapsed, setIsCollapsed] = useState(false) 

  const getSidebarContent = () => {
    if (pathname === '/dashboard') return <DashboardSidebar />
    if (pathname === '/legal-ai') return <LegalAISidebar />
    if (pathname.startsWith('/expedientes/') && pathname !== '/expedientes') return <CaseDetailSidebar />
    if (pathname === '/expedientes') return <CasesSidebar />
    if (pathname === '/documents') return <DocumentsSidebar />
    if (pathname === '/knowledge-base') return <KnowledgeBaseSidebar />
    if (pathname === '/analytics') return <AnalyticsSidebar />
    if (pathname === '/admin') return <AdminSidebar />
    if (pathname === '/calendar') return <CalendarSidebar />
    
    // Default fallback
    return <DashboardSidebar />
  }

  return (
    <aside 
      className={cn(
        'relative bg-gray-50/50 border-r border-gray-200 h-full overflow-y-auto flex-shrink-0 transition-all duration-300 ease-in-out hidden md:flex flex-col',
        isCollapsed ? 'w-20' : 'w-[280px]'
      )}
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 -right-3 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-gray-50 text-gray-500 shadow-sm transition-transform hover:scale-105"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className={cn(
        "p-4 flex-1 transition-all duration-300",
        isCollapsed ? 'opacity-0 invisible absolute' : 'opacity-100 visible'
      )}>
        {getSidebarContent()}
      </div>

      {isCollapsed && (
        <div className="flex flex-col items-center pt-8 gap-6 animate-in fade-in duration-500">
           {/* Collapsed Icons - Simplified view */}
           <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm cursor-pointer hover:bg-blue-200 transition-colors" title="New Item">
             <Plus className="w-5 h-5" />
           </div>
           <div className="w-10 h-10 rounded-xl hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer transition-colors" title="Search">
             <Search className="w-5 h-5" />
           </div>
           <div className="w-10 h-10 rounded-xl hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer transition-colors" title="Ask AI">
             <Bot className="w-5 h-5" />
           </div>
        </div>
      )}
    </aside>
  )
}