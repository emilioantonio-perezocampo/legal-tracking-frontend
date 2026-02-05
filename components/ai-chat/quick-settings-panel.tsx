'use client'

import React, { useState } from 'react';
import { Settings, ChevronDown, Check, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const practiceAreaOptions = [
  'All Practice Areas',
  'Corporate Law',
  'Litigation',
  'Employment Law',
  'Intellectual Property',
  'Real Estate',
  'Tax Law',
  'Contract Law',
  'Mergers & Acquisitions',
  'Securities',
  'Bankruptcy',
];

const jurisdictionOptions = [
  'Federal (USA)',
  'Federal - 1st Circuit',
  'Federal - 2nd Circuit',
  'Federal - 9th Circuit',
  'New York',
  'California',
  'Texas',
  'Delaware',
  'Florida',
  'Illinois',
];

const dateRangeOptions = [
  'All Time',
  'Last 6 Months',
  'Last Year',
  'Last 5 Years',
  'Last 10 Years',
];

const languageOptions = [
  'English (US)',
  'English (UK)',
  'Spanish',
  'French',
  'German',
  'Portuguese',
];

export function AIQuickSettingsPanel() {
  const [dataSources, setDataSources] = useState({
    firmKnowledgeBase: true,
    caseLawDatabase: true,
    statutoryResources: true,
    legalJournals: true,
  });

  const [responseFormat, setResponseFormat] = useState({
    includeCitations: true,
    showSourceDocuments: true,
    practicalRecommendations: true,
    riskAssessment: false,
  });

  const [practiceArea, setPracticeArea] = useState('Corporate Law');
  const [jurisdiction, setJurisdiction] = useState('Federal (USA)');
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);

  // Advanced settings state
  const [responseLength, setResponseLength] = useState(50);
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  const [dateRange, setDateRange] = useState('All Time');
  const [language, setLanguage] = useState('English (US)');

  const handleResetDefaults = () => {
      setResponseLength(50);
      setConfidenceThreshold(75);
      setDateRange('All Time');
      setLanguage('English (US)');
      setDataSources({
        firmKnowledgeBase: true,
        caseLawDatabase: true,
        statutoryResources: true,
        legalJournals: true,
      });
      setResponseFormat({
        includeCitations: true,
        showSourceDocuments: true,
        practicalRecommendations: true,
        riskAssessment: false,
      });
      setPracticeArea('Corporate Law');
      setJurisdiction('Federal (USA)');
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Quick Settings</h2>
        <Button 
          variant="ghost" 
          size="sm"
          className={cn("gap-2", advancedSettingsOpen && "bg-blue-50 text-blue-700 hover:bg-blue-100")}
          onClick={() => setAdvancedSettingsOpen(!advancedSettingsOpen)}
          aria-label="Toggle advanced settings"
        >
          {advancedSettingsOpen ? (
             <><span>Collapse</span> <ChevronUp className="w-4 h-4" /></>
          ) : (
             <Settings className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {/* Data Sources */}
         <div>
           <h3 className="text-sm font-semibold text-gray-700 mb-4">Data Sources</h3>
           <div className="space-y-3">
             {[
               { id: 'firmKnowledgeBase', label: 'Firm Knowledge Base' },
               { id: 'caseLawDatabase', label: 'Case Law Database' },
               { id: 'statutoryResources', label: 'Statutory Resources' },
               { id: 'legalJournals', label: 'Legal Journals' },
             ].map((source) => (
               <div key={source.id} className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-50 rounded-md transition-colors cursor-pointer">
                 <Checkbox 
                   id={source.id} 
                   checked={dataSources[source.id as keyof typeof dataSources]}
                   onCheckedChange={() => setDataSources(prev => ({ ...prev, [source.id]: !prev[source.id as keyof typeof dataSources] }))}
                 />
                 <Label htmlFor={source.id} className="text-sm text-gray-700 cursor-pointer font-normal">{source.label}</Label>
               </div>
             ))}
           </div>
         </div>

         {/* Response Format */}
         <div>
           <h3 className="text-sm font-semibold text-gray-700 mb-4">Response Format</h3>
           <div className="space-y-3">
             {[
               { id: 'includeCitations', label: 'Include Citations' },
               { id: 'showSourceDocuments', label: 'Show Source Documents' },
               { id: 'practicalRecommendations', label: 'Practical Recommendations' },
               { id: 'riskAssessment', label: 'Risk Assessment' },
             ].map((item) => (
               <div key={item.id} className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-50 rounded-md transition-colors cursor-pointer">
                 <Checkbox 
                   id={item.id} 
                   checked={responseFormat[item.id as keyof typeof responseFormat]}
                   onCheckedChange={() => setResponseFormat(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof responseFormat] }))}
                 />
                 <Label htmlFor={item.id} className="text-sm text-gray-700 cursor-pointer font-normal">{item.label}</Label>
               </div>
             ))}
           </div>
         </div>
         
         <div className="space-y-6">
           {/* Practice Area Dropdown */}
           <div className="space-y-2">
             <Label className="text-sm font-semibold text-gray-700">Practice Area Focus</Label>
             <Select value={practiceArea} onValueChange={setPracticeArea}>
               <SelectTrigger className="bg-white">
                 <SelectValue placeholder="Select Area" />
               </SelectTrigger>
               <SelectContent>
                 {practiceAreaOptions.map(option => (
                   <SelectItem key={option} value={option}>{option}</SelectItem>
                 ))}
               </SelectContent>
             </Select>
           </div>

            {/* Jurisdiction Dropdown */}
            <div className="space-y-2">
             <Label className="text-sm font-semibold text-gray-700">Jurisdiction</Label>
             <Select value={jurisdiction} onValueChange={setJurisdiction}>
               <SelectTrigger className="bg-white">
                 <SelectValue placeholder="Select Jurisdiction" />
               </SelectTrigger>
               <SelectContent>
                 {jurisdictionOptions.map(option => (
                   <SelectItem key={option} value={option}>{option}</SelectItem>
                 ))}
               </SelectContent>
             </Select>
           </div>
         </div>
      </div>

      {/* Advanced Options Expansion */}
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        advancedSettingsOpen ? 'max-h-[500px] opacity-100 mt-6 border-t border-gray-100 pt-6' : 'max-h-0 opacity-0'
      )}>
         <div className="mb-6">
             <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Advanced Options</h3>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
             {/* Response Length */}
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <Label className="text-sm font-medium text-gray-700">Response Length</Label>
                   <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-tight text-gray-900">
                     {responseLength > 50 ? 'Detailed' : 'Concise'}
                   </span>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-[10px] text-muted-foreground font-bold uppercase w-12 text-right">Concise</span>
                   <Slider 
                      value={[responseLength]} 
                      onValueChange={(vals) => setResponseLength(vals[0])}
                      max={100} 
                      step={1} 
                      className="flex-1"
                   />
                   <span className="text-[10px] text-muted-foreground font-bold uppercase w-12">Detailed</span>
                </div>
             </div>

             {/* Confidence Threshold */}
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <Label className="text-sm font-medium text-gray-700">Confidence Threshold</Label>
                   <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{confidenceThreshold}%</span>
                </div>
                 <div className="flex items-center gap-4">
                   <span className="text-[10px] text-muted-foreground font-bold uppercase w-8 text-right">50%</span>
                   <Slider 
                      value={[confidenceThreshold]} 
                      onValueChange={(vals) => setConfidenceThreshold(vals[0])}
                      min={50}
                      max={95} 
                      step={1} 
                      className="flex-1"
                   />
                   <span className="text-[10px] text-muted-foreground font-bold uppercase w-8">95%</span>
                </div>
                <p className="text-[10px] text-muted-foreground italic text-center">Show only results above {confidenceThreshold}% confidence</p>
             </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
             {/* Date Range */}
             <div className="space-y-2">
                 <Label className="text-sm font-medium text-gray-700">Date Range for Sources</Label>
                 <Select value={dateRange} onValueChange={setDateRange}>
                   <SelectTrigger className="bg-white">
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     {dateRangeOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                   </SelectContent>
                 </Select>
             </div>

             {/* Language */}
             <div className="space-y-2">
                 <Label className="text-sm font-medium text-gray-700">Language</Label>
                 <Select value={language} onValueChange={setLanguage}>
                   <SelectTrigger className="bg-white">
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     {languageOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                   </SelectContent>
                 </Select>
             </div>
         </div>

         <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
             <Button variant="ghost" size="sm" onClick={handleResetDefaults} className="text-gray-500">
                 Reset to Defaults
             </Button>
             <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50 font-semibold">
                 Save as Preset
             </Button>
         </div>
      </div>
    </div>
  );
}
