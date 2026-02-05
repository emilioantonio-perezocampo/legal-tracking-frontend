'use client'

import { X, Search, Clipboard, Folder, Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TemplatePanelProps {
  isOpen: boolean
  onClose: () => void
  onUseTemplate: () => void
}

export function TemplatePanel({ isOpen, onClose, onUseTemplate }: TemplatePanelProps) {
  if (!isOpen) return null

  return (
    <div className="absolute top-16 right-4 w-[380px] bg-white border border-gray-200 shadow-xl rounded-lg z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 flex flex-col max-h-[600px]">
       {/* Header */}
       <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white shrink-0">
         <h3 className="font-semibold text-gray-900 text-sm">Query Templates</h3>
         <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4"/></button>
       </div>
       
       {/* Search */}
       <div className="p-3 border-b border-gray-100 bg-gray-50 shrink-0">
         <div className="relative">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search templates..." 
              className="pl-9 bg-white"
            />
         </div>
       </div>

       {/* Content */}
       <div className="overflow-y-auto p-2 space-y-4 flex-1">
          {/* Contract Analysis */}
          <div>
            <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-gray-500 uppercase mb-1">
              <Clipboard className="w-3 h-3" /> Contract Analysis
            </div>
            <div className="space-y-1">
              {[
                { title: 'Review contract for risks', text: '"Analyze the attached contract and identify any clauses that could pose risks to my client..."' },
                { title: 'Extract and summarize key clauses', text: '"Please extract and summarize the following key clauses: termination, liability..."' },
                { title: 'Compare with standard terms', text: '"Compare this contract terms with standard industry practices for..."' }
              ].map((t, i) => (
                <button key={i} onClick={() => { onUseTemplate(); onClose(); }} className="w-full text-left p-2 hover:bg-blue-50 rounded-md group transition-colors">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700">{t.title}</div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2 italic">{t.text}</div>
                  <div className="mt-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-[10px] font-medium text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">Use Template</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Legal Research */}
          <div>
            <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-gray-500 uppercase mb-1">
              <Folder className="w-3 h-3" /> Legal Research
            </div>
            <div className="space-y-1">
              {[
                { title: 'Find relevant precedents', text: '"Find case precedents related to [legal issue] in [jurisdiction], focusing on..."' },
                { title: 'Summarize recent rulings', text: '"Provide a summary of recent court rulings on [topic], including key holdings..."' },
                { title: 'Explain legal implications', text: '"What are the legal implications of [action] under [law]?"' }
              ].map((t, i) => (
                <button key={i} onClick={() => { onUseTemplate(); onClose(); }} className="w-full text-left p-2 hover:bg-blue-50 rounded-md group transition-colors">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700">{t.title}</div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2 italic">{t.text}</div>
                  <div className="mt-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-[10px] font-medium text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">Use Template</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

           {/* Case Strategy */}
          <div>
            <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-gray-500 uppercase mb-1">
              <Check className="w-3 h-3" /> Case Strategy
            </div>
            <div className="space-y-1">
              {[
                { title: 'Analyze case strengths', text: '"Based on the provided facts, analyze the strengths and weaknesses..."' },
                { title: 'Generate discovery requests', text: '"Draft a list of interrogatories regarding [issue]..."' }
              ].map((t, i) => (
                <button key={i} onClick={() => { onUseTemplate(); onClose(); }} className="w-full text-left p-2 hover:bg-blue-50 rounded-md group transition-colors">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700">{t.title}</div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2 italic">{t.text}</div>
                  <div className="mt-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-[10px] font-medium text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">Use Template</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
       </div>

       <div className="p-3 border-t border-gray-100 bg-gray-50 shrink-0">
         <button className="w-full py-1.5 text-sm font-medium text-blue-600 border border-dashed border-blue-300 rounded hover:bg-blue-50 transition-colors flex items-center justify-center gap-1">
           <Plus className="w-3.5 h-3.5" /> Create Custom Template
         </button>
       </div>
    </div>
  )
}
