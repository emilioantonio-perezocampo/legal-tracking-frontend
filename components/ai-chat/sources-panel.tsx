'use client'

import { BookOpen, ExternalLink } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SourcesPanel() {
  const sources = [
     { title: "Constitución Política de los Estados Unidos Mexicanos", type: "Constitution", link: "#" },
     { title: "Código Civil Federal - Art. 1792", type: "Statute", link: "#" },
     { title: "Amparo Directo 123/2023 (SCJN)", type: "Case Law", link: "#" },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full max-h-[300px]">
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Sources
        </h3>
        <span className="bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">3</span>
      </div>
      
      <ScrollArea className="flex-1">
         <div className="divide-y divide-gray-100">
           {sources.map((source, i) => (
             <div key={i} className="p-3 hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="text-xs font-medium text-blue-600 mb-1 flex items-center justify-between">
                  {source.type}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-sm text-gray-800 line-clamp-2 leading-snug">
                  {source.title}
                </div>
             </div>
           ))}
         </div>
      </ScrollArea>
    </div>
  )
}
