'use client'

import React from 'react';
import { Search, Filter, MoreVertical, X, Clock, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AIHistoryPanelProps {
  open: boolean;
  onClose: () => void;
  onContinue: (id: string) => void;
}

export function AIHistoryPanel({ open, onClose, onContinue }: AIHistoryPanelProps) {
  if (!open) return null;

  const historyItems = [
    { id: '1', title: 'IP Infringement Precedents', query: 'Recent precedents for software patent infringement...', time: '10:45 AM', case: 'Acme v. Smith', messages: 8 },
    { id: '2', title: 'Employment Contract Analysis', query: 'Analyze termination clause for potential issues...', time: '9:15 AM', case: 'Global Industries', messages: 12 },
    { id: '3', title: 'Non-Compete Clause Research', query: 'What are the enforceability standards for non-compete...', time: 'Yesterday', case: 'Tech Futures', messages: 6 },
    { id: '4', title: 'Corporate Tax Changes Summary', query: 'Summarize recent changes to corporate tax law...', time: '11:00 AM', case: null, messages: 4 },
  ];

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 z-40 transition-opacity" 
        onClick={onClose} 
      />
      <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">Conversation History</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="px-6 py-4 border-b border-gray-100 space-y-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-9 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 gap-2 text-xs font-medium">
              <Filter className="w-3 h-3" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs font-medium">
              Sort: Recent
            </Button>
          </div>
        </div>

        {/* List */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Today Group */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Today</h3>
              <div className="space-y-3">
                {historyItems.slice(0, 2).map(item => (
                  <div 
                    key={item.id} 
                    className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group relative" 
                    onClick={() => onContinue(item.id)}
                  >
                    <div className="flex justify-between items-start mb-1 pr-6">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{item.title}</h4>
                      <span className="text-[10px] text-gray-500 whitespace-nowrap">{item.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2 italic pr-4">"{item.query}"</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.case ? (
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none text-[10px] gap-1 px-1.5 py-0">
                            <FileText className="w-2.5 h-2.5" /> {item.case}
                          </Badge>
                        ) : (
                          <span className="text-[10px] text-gray-400">No case attached</span>
                        )}
                        <span className="text-[10px] text-gray-400">• {item.messages} msgs</span>
                      </div>
                    </div>
                    <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500">
                            <MoreVertical className="w-3.5 h-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Pin conversation</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Yesterday Group */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Yesterday</h3>
              <div className="space-y-3">
                {historyItems.slice(2, 3).map(item => (
                  <div 
                    key={item.id} 
                    className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group relative" 
                    onClick={() => onContinue(item.id)}
                  >
                    <div className="flex justify-between items-start mb-1 pr-6">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{item.title}</h4>
                      <span className="text-[10px] text-gray-500 whitespace-nowrap">{item.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2 italic pr-4">"{item.query}"</p>
                    <div className="flex items-center gap-2">
                      {item.case ? (
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none text-[10px] gap-1 px-1.5 py-0">
                          <FileText className="w-2.5 h-2.5" /> {item.case}
                        </Badge>
                      ) : (
                        <span className="text-[10px] text-gray-400">No case attached</span>
                      )}
                      <span className="text-[10px] text-gray-400">• {item.messages} msgs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-200 text-center shrink-0 bg-gray-50">
          <Button variant="link" className="text-xs text-blue-600 font-medium h-auto p-0">
            Load more conversations...
          </Button>
        </div>
      </div>
    </>
  );
}
