import { SidebarSection, SidebarItem, SidebarButton } from './primitives';
import { Plus, Search, CheckCircle, Clock, Folder, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function CasesSidebar() {
  return (
    <>
      <div className="px-1 mb-2">
        <SidebarButton variant="primary" href="/expedientes/new">
          <Plus className="w-4 h-4" /> New Case
        </SidebarButton>
      </div>

      <div className="relative mb-6 px-1">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <Input 
          type="text" 
          placeholder="Search cases..." 
          className="pl-9 bg-white"
        />
      </div>

      <SidebarSection title="Filter by Status">
        <SidebarItem icon={CheckCircle} label="Active" badge="24" active />
        <SidebarItem icon={Clock} label="Pending" badge="8" />
        <SidebarItem icon={Folder} label="Closed" badge="156" />
      </SidebarSection>

      <SidebarSection title="Practice Area">
        <SidebarItem icon={Settings} label="Corporate Law" badge="12" active />
        <SidebarItem icon={Settings} label="Litigation" badge="8" />
        <SidebarItem icon={Settings} label="Real Estate" badge="4" />
        <SidebarItem icon={Settings} label="Employment" badge="6" />
      </SidebarSection>

      <SidebarSection title="Assigned To">
        <div className="px-3">
          <RadioGroup defaultValue="me">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="anyone" id="r1" />
              <Label htmlFor="r1" className="text-sm font-normal text-gray-700">Anyone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="me" id="r2" />
              <Label htmlFor="r2" className="text-sm font-normal text-gray-700">Me</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="team" id="r3" />
              <Label htmlFor="r3" className="text-sm font-normal text-gray-700">My Team</Label>
            </div>
          </RadioGroup>
        </div>
      </SidebarSection>
    </>
  );
}
