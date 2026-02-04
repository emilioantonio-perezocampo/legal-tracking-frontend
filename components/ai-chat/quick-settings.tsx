'use client'

import { Button } from "@/components/ui/button"
import { SlidersHorizontal, Settings2 } from "lucide-react"

export function QuickSettings() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
          <Settings2 className="h-4 w-4" />
          Quick Settings
        </h3>
      </div>
      
      <div className="space-y-2">
        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Response Style</div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" className="flex-1 text-xs">Brief</Button>
           <Button variant="secondary" size="sm" className="flex-1 text-xs bg-blue-50 text-blue-700 border-blue-200">Detailed</Button>
        </div>
        
        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2 mt-4">Jurisdiction</div>
        <select className="w-full text-sm border-gray-200 rounded-md p-2 bg-gray-50">
           <option>Federal (Mexico)</option>
           <option>CDMX</option>
           <option>Jalisco</option>
           <option>Nuevo León</option>
        </select>
      </div>
    </div>
  )
}
