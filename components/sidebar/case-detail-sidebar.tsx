import { SidebarSection, SidebarItem } from './primitives';
import { ArrowLeft, LayoutDashboard, Users, FileText, Scale, Calendar, Bot, MessageSquare, Settings, BarChart2, Clock } from 'lucide-react';
import Link from 'next/link';

export function CaseDetailSidebar() {
  return (
    <>
      <Link 
        href="/expedientes"
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6 px-3 py-1 hover:bg-blue-50 rounded-md w-fit transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Cases
      </Link>

      <SidebarSection title="Case Navigation">
        <SidebarItem icon={LayoutDashboard} label="Overview" active />
        <SidebarItem icon={Users} label="Parties" />
        <SidebarItem icon={FileText} label="Documents" badge="23" />
        <SidebarItem icon={Scale} label="Court Filings" badge="8" />
        <SidebarItem icon={Calendar} label="Timeline" />
        <SidebarItem icon={Bot} label="Legal Analysis" />
        <SidebarItem icon={MessageSquare} label="Communications" />
        <SidebarItem icon={Settings} label="Billing" />
      </SidebarSection>

      <SidebarSection title="Case Tools">
        <SidebarItem icon={Bot} label="AI Research Assistant" />
        <SidebarItem icon={BarChart2} label="Case Analytics" />
        <SidebarItem icon={FileText} label="Generate Document" />
      </SidebarSection>

      <SidebarSection title="Deadlines">
        <SidebarItem icon={Clock} label="Jan 15 - Motion deadline" className="text-red-600 hover:text-red-700" />
        <SidebarItem icon={Clock} label="Jan 22 - Discovery due" className="text-amber-600 hover:text-amber-700" />
      </SidebarSection>
    </>
  );
}
