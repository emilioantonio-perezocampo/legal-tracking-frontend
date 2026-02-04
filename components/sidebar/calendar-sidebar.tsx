import { SidebarSection, SidebarButton } from './primitives';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function CalendarSidebar() {
  return (
    <>
      <div className="px-1 mb-6">
        <SidebarButton variant="primary">
          <Plus className="w-4 h-4" /> New Event
        </SidebarButton>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 mx-1 shadow-sm">
         <div className="flex justify-between items-center mb-4">
           <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="w-3 h-3 text-gray-500"/></button>
           <div className="text-center font-semibold text-sm text-gray-900">January 2026</div>
           <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-3 h-3 text-gray-500"/></button>
         </div>
         <div className="grid grid-cols-7 text-[10px] font-medium text-center text-gray-400 mb-2 uppercase tracking-wide">
           <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
         </div>
         <div className="grid grid-cols-7 text-xs text-center gap-y-3">
           {[28, 29, 30, 31].map(d => <div key={d} className="text-gray-300">{d}</div>)}
           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(d => (
             <div key={d} className={cn(
               "hover:bg-gray-100 rounded cursor-pointer py-0.5",
               d === 2 && "font-bold text-white bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center mx-auto shadow-sm"
             )}>{d}</div>
           ))}
         </div>
      </div>

      <SidebarSection title="Calendars">
         <div className="px-3 space-y-3">
           <div className="flex items-center space-x-2 group">
             <Checkbox id="c1" defaultChecked className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
             <Label htmlFor="c1" className="flex items-center gap-2 cursor-pointer font-normal text-sm text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-transparent group-hover:ring-red-100 transition-all"/> 
                Court Dates
             </Label>
           </div>
           <div className="flex items-center space-x-2 group">
             <Checkbox id="c2" defaultChecked className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
             <Label htmlFor="c2" className="flex items-center gap-2 cursor-pointer font-normal text-sm text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-transparent group-hover:ring-amber-100 transition-all"/> 
                Deadlines
             </Label>
           </div>
           <div className="flex items-center space-x-2 group">
             <Checkbox id="c3" defaultChecked className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
             <Label htmlFor="c3" className="flex items-center gap-2 cursor-pointer font-normal text-sm text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-transparent group-hover:ring-blue-100 transition-all"/> 
                Client Meetings
             </Label>
           </div>
         </div>
      </SidebarSection>
    </>
  );
}
