import { SidebarSection, SidebarItem } from './primitives';
import { Search, BookOpen, FileText, MessageSquare, Settings, Scale, Folder, Users, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function KnowledgeBaseSidebar() {
  return (
    <>
      <div className="relative mb-6 px-1">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <Input 
          type="text" 
          placeholder="Search legal resources..." 
          className="pl-9 bg-white"
        />
      </div>

      <SidebarSection title="Browse by Category">
        <SidebarItem icon={BookOpen} label="Case Law" active />
        <SidebarItem icon={FileText} label="Statutes & Regs" />
        <SidebarItem icon={MessageSquare} label="Legal Commentary" />
        <SidebarItem icon={FileText} label="Firm Templates" />
      </SidebarSection>

      <SidebarSection title="Practice Areas">
        <SidebarItem icon={Settings} label="Corporate Law" />
        <SidebarItem icon={Scale} label="Litigation" />
        <SidebarItem icon={Folder} label="Real Estate" />
        <SidebarItem icon={Users} label="Employment" />
      </SidebarSection>

      <SidebarSection title="External Databases">
        <SidebarItem icon={CheckCircle} label="LexisNexis" className="text-green-700 hover:text-green-800" />
        <SidebarItem icon={CheckCircle} label="Westlaw" className="text-green-700 hover:text-green-800" />
        <SidebarItem icon={CheckCircle} label="HeinOnline" className="text-green-700 hover:text-green-800" />
      </SidebarSection>
    </>
  );
}
