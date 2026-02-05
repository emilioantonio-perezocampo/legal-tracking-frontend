'use client'

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 z-40 transition-opacity" 
        onClick={onClose} 
      />
      <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
           <h2 className="text-lg font-semibold text-gray-900">AI Consultation Settings</h2>
           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
             <X className="w-5 h-5" />
           </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Response Preferences */}
          <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Response Preferences</h3>
            <div className="space-y-6">
               <div>
                 <div className="flex justify-between mb-2">
                   <Label className="text-sm font-medium text-gray-700">Response Length</Label>
                   <span className="text-xs text-gray-500">Comprehensive</span>
                 </div>
                 <Slider defaultValue={[75]} max={100} step={25} className="w-full" />
                 <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                   <span>Concise</span>
                   <span>Comprehensive</span>
                 </div>
               </div>
               
               <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Citation Detail</Label>
                  <Select defaultValue="full">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select citation detail" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full citations with excerpts</SelectItem>
                      <SelectItem value="standard">Standard citations</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
               </div>

               <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Include Confidence Scores</Label>
                  <Switch defaultChecked />
               </div>
            </div>
          </section>

          {/* Knowledge Sources */}
          <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Knowledge Sources</h3>
            <div className="space-y-3">
              {[
                { id: 'internal', label: 'Internal Case Database', checked: true },
                { id: 'lexis', label: 'LexisNexis Integration', checked: true },
                { id: 'westlaw', label: 'Westlaw Integration', checked: true },
                { id: 'docs', label: 'Firm Document Repository', checked: true },
                { id: 'journals', label: 'Legal Journals & Publications', checked: false },
              ].map((source) => (
                <div key={source.id} className="flex items-center space-x-2">
                   <Checkbox id={source.id} defaultChecked={source.checked} />
                   <Label htmlFor={source.id} className="text-sm font-normal text-gray-700 cursor-pointer">{source.label}</Label>
                </div>
              ))}
            </div>
          </section>

          {/* Jurisdiction Focus */}
          <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Jurisdiction Focus</h3>
            <div className="space-y-4">
               <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Primary Jurisdiction</Label>
                  <Select defaultValue="federal">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="federal">Federal - All Circuits</SelectItem>
                      <SelectItem value="ny">State - New York</SelectItem>
                      <SelectItem value="ca">State - California</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
               <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Secondary Jurisdictions</Label>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">New York <X className="w-3 h-3 cursor-pointer hover:text-red-500"/></span>
                    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">California <X className="w-3 h-3 cursor-pointer hover:text-red-500"/></span>
                    <button className="text-blue-600 text-xs font-medium hover:underline">+ Add</button>
                  </div>
               </div>
            </div>
          </section>

          {/* Practice Area Specialization */}
          <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Practice Area Specialization</h3>
            <div className="space-y-3">
              {[
                { id: 'corp', label: 'Corporate Law', checked: true },
                { id: 'ip', label: 'Intellectual Property', checked: true },
                { id: 'emp', label: 'Employment Law', checked: true },
                { id: 'real', label: 'Real Estate', checked: false },
                { id: 'tax', label: 'Tax Law', checked: false },
              ].map((area) => (
                <div key={area.id} className="flex items-center space-x-2">
                   <Checkbox id={area.id} defaultChecked={area.checked} />
                   <Label htmlFor={area.id} className="text-sm font-normal text-gray-700 cursor-pointer">{area.label}</Label>
                </div>
              ))}
              <button className="text-xs text-blue-600 font-medium hover:underline pl-6">Show all areas...</button>
            </div>
          </section>

          {/* Conversation Settings */}
          <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Conversation Settings</h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Auto-save conversations</Label>
                  <Switch defaultChecked />
               </div>
               <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Show typing indicators</Label>
                  <Switch defaultChecked />
               </div>
               <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Enable voice input</Label>
                  <Switch />
               </div>
               <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Keyboard shortcuts</Label>
                  <Switch defaultChecked />
               </div>
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center">
           <Button variant="ghost" className="text-gray-500 hover:text-gray-700">Reset to Defaults</Button>
           <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
             Save Settings
           </Button>
        </div>
      </div>
    </>
  )
}
