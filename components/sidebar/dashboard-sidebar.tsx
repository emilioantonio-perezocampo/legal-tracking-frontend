import { SidebarSection, SidebarItem, SidebarButton } from './primitives';
import { Plus, Bot, Clock, Users, FileText, Folder, MessageSquare, Pin, Star } from 'lucide-react';

export function DashboardSidebar() {
  return (
    <>
      <div className="space-y-2 mb-6 px-1">
        <SidebarButton variant="primary" href="/expedientes/new">
          <Plus className="w-4 h-4" /> New Case
        </SidebarButton>
        <SidebarButton variant="secondary" href="/legal-ai">
          <Bot className="w-4 h-4" /> Ask Legal AI
        </SidebarButton>
      </div>

      <SidebarSection title="Today's Priorities">
        <SidebarItem icon={Clock} label="Filing deadline (2)" className="text-red-600 hover:text-red-700" />
        <SidebarItem icon={Users} label="Client meetings (3)" className="text-amber-600 hover:text-amber-700" />
        <SidebarItem icon={FileText} label="Docs to review (5)" className="text-blue-600 hover:text-blue-700" />
      </SidebarSection>

      <SidebarSection title="Recent Activity">
        <div className="px-3 py-1.5 mb-2 hover:bg-gray-50 rounded-md transition-colors cursor-pointer group">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">Contract_v3.docx</span>
          </div>
          <div className="text-xs text-gray-500 ml-6">Edited 10 min ago</div>
        </div>
        <div className="px-3 py-1.5 mb-2 hover:bg-gray-50 rounded-md transition-colors cursor-pointer group">
          <div className="flex items-center gap-2 mb-1">
            <Folder className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">TechCorp Privacy</span>
          </div>
          <div className="text-xs text-gray-500 ml-6">Updated 1 hour ago</div>
        </div>
        <div className="px-3 py-1.5 mb-2 hover:bg-gray-50 rounded-md transition-colors cursor-pointer group">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">AI Chat: Compliance</span>
          </div>
          <div className="text-xs text-gray-500 ml-6">Yesterday</div>
        </div>
      </SidebarSection>

      <SidebarSection title="Pinned Items" action={<Pin className="w-3 h-3 cursor-pointer hover:text-blue-600" />}>
        <SidebarItem icon={Star} label="Acme Corp Agreement" />
        <SidebarItem icon={Star} label="Privacy Policy Template" />
        <SidebarItem icon={Star} label="Client Intake Checklist" />
      </SidebarSection>
    </>
  );
}
