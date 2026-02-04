import { SidebarSection, SidebarItem, SidebarButton } from './primitives';
import { BarChart2, Clock, Bot, Download } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function AnalyticsSidebar() {
  return (
    <>
      <SidebarSection title="Reports">
        <SidebarItem icon={BarChart2} label="Dashboard Overview" active />
        <SidebarItem icon={BarChart2} label="Productivity Metrics" />
        <SidebarItem icon={Clock} label="Time & Billing" />
        <SidebarItem icon={Bot} label="AI Usage" />
      </SidebarSection>

      <SidebarSection title="Date Range">
        <div className="px-3">
           <RadioGroup defaultValue="month">
             {['Today', 'This Week', 'This Month', 'This Quarter'].map((range, i) => {
                const value = range.toLowerCase().replace(' ', '-');
                return (
                  <div key={value} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={value} id={`d-${i}`} />
                    <Label htmlFor={`d-${i}`} className="text-sm font-normal text-gray-700">{range}</Label>
                  </div>
                )
             })}
           </RadioGroup>
        </div>
      </SidebarSection>

      <SidebarSection title="Export">
        <div className="space-y-2 px-1">
          <SidebarButton variant="secondary">
             <Download className="w-4 h-4" /> Export PDF
          </SidebarButton>
          <SidebarButton variant="secondary">
             <BarChart2 className="w-4 h-4" /> Export Excel
          </SidebarButton>
        </div>
      </SidebarSection>
    </>
  );
}
