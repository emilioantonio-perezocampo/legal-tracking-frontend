import { SidebarSection, SidebarItem, SidebarButton, ClientAvatar } from './primitives';
import { Plus, Search, MessageSquare, FileText, LayoutDashboard, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function LegalAISidebar() {
  return (
    <>
      <div className="px-1 mb-2">
        <SidebarButton variant="primary">
          <Plus className="w-4 h-4" /> New Chat
        </SidebarButton>
      </div>

      <div className="relative mb-6 px-1">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <Input 
          type="text" 
          placeholder="Search conversations..." 
          className="pl-9 bg-white"
        />
      </div>

      <SidebarSection title="Today">
        <SidebarItem icon={MessageSquare} label="Data privacy compliance" active />
        <SidebarItem icon={MessageSquare} label="Contract review questions" />
      </SidebarSection>

      <SidebarSection title="Recent Clients">
        <ClientAvatar initials="AC" name="Acme Corporation" color="bg-blue-100 text-blue-700" />
        <ClientAvatar initials="GI" name="Global Industries" color="bg-green-100 text-green-700" />
        <ClientAvatar initials="TF" name="Tech Futures Ltd." color="bg-purple-100 text-purple-700" />
      </SidebarSection>

      <SidebarSection title="Quick Templates">
        <SidebarItem icon={FileText} label="Contract Analysis" />
        <SidebarItem icon={Search} label="Legal Research" />
        <SidebarItem icon={LayoutDashboard} label="Case Strategy" />
      </SidebarSection>

      <div className="mt-auto border-t border-gray-200 pt-4 px-1">
        <SidebarSection title="AI Settings" action={<Settings className="w-3 h-3 cursor-pointer hover:text-blue-600" />}>
          <div className="px-3 text-xs text-gray-600 space-y-2 bg-gray-50 py-3 rounded border border-gray-100">
            <div className="flex justify-between">
              <span>Style:</span>
              <span className="font-medium text-gray-900">Detailed</span>
            </div>
            <div className="flex justify-between">
              <span>Jurisdiction:</span>
              <span className="font-medium text-gray-900">Federal (USA)</span>
            </div>
          </div>
        </SidebarSection>
      </div>
    </>
  );
}
