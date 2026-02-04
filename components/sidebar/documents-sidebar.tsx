import { SidebarSection, SidebarItem, SidebarButton } from './primitives';
import { Plus, Search, Folder, Users, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function DocumentsSidebar() {
  return (
    <>
      <div className="px-1 mb-2">
        <SidebarButton variant="primary">
          <Plus className="w-4 h-4" /> Upload Document
        </SidebarButton>
      </div>

      <div className="relative mb-6 px-1">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <Input 
          type="text" 
          placeholder="Search documents..." 
          className="pl-9 bg-white"
        />
      </div>

      <SidebarSection title="Folders">
        <SidebarItem icon={Folder} label="All Documents" active />
        <SidebarItem icon={Folder} label="My Documents" />
        <SidebarItem icon={Users} label="Shared with Me" />
        <SidebarItem icon={Folder} label="Templates" />
        <div className="pl-6 border-l border-gray-200 ml-6 space-y-1 mt-1">
          <SidebarItem icon={Folder} label="Contracts" className="!py-1.5 !text-xs" />
          <SidebarItem icon={Folder} label="Letters" className="!py-1.5 !text-xs" />
          <SidebarItem icon={Folder} label="Court Forms" className="!py-1.5 !text-xs" />
        </div>
      </SidebarSection>

      <SidebarSection title="Filter by Type">
        <SidebarItem icon={FileText} label="Contracts" badge="45" active />
        <SidebarItem icon={FileText} label="Pleadings" badge="32" />
        <SidebarItem icon={FileText} label="Memos" badge="15" />
      </SidebarSection>

      <SidebarSection title="Tags">
         <div className="flex flex-wrap gap-2 px-3">
           {['Confidential', 'Urgent', 'NDA', 'Internal'].map(tag => (
             <span key={tag} className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200 hover:bg-gray-200 cursor-pointer transition-colors">
               {tag}
             </span>
           ))}
         </div>
      </SidebarSection>
    </>
  );
}
