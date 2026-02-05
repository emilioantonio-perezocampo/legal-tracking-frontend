'use client'

import React, { useState } from 'react';
import { Search, Star, MoreVertical, X, Clipboard, Plus, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AISavedQueriesPanelProps {
  open: boolean;
  onClose: () => void;
  onUseQuery: (text: string) => void;
}

export function AISavedQueriesPanel({ open, onClose, onUseQuery }: AISavedQueriesPanelProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  if (!open) return null;

  const savedQueries = [
    { id: '1', title: 'Standard contract risk analysis', query: 'Analyze this contract for: 1) Liability exposure 2) Term...', used: 12, lastUsed: 'Today', favorite: true },
    { id: '2', title: 'IP infringement case finder', query: 'Find recent cases involving software IP infringement with...', used: 8, lastUsed: 'Yesterday', favorite: true },
    { id: '3', title: 'Employment termination clause review', query: 'Review the termination provisions in this employment...', used: 5, lastUsed: '3 days ago', favorite: false },
    { id: '4', title: 'Non-compete enforceability check', query: 'Analyze this non-compete agreement for enforceability in...', used: 3, lastUsed: '1 week ago', favorite: false },
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
          <h2 className="text-lg font-semibold text-gray-900">Saved Queries</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search saved queries..." 
              className="pl-9 bg-white"
            />
          </div>
        </div>

        {/* List */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            
            {/* Favorites */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Favorites
              </h3>
              <div className="space-y-3">
                {savedQueries.filter(q => q.favorite).map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all group relative">
                    <div className="flex justify-between items-start mb-1 pr-6">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 flex items-center gap-1">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3 italic">"{item.query}"</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-400">Used {item.used} times • Last: {item.lastUsed}</span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 bg-white pl-2">
                         <Button 
                           variant="secondary" 
                           size="sm" 
                           onClick={() => onUseQuery(item.query)} 
                           className="text-xs font-medium text-blue-600 hover:bg-blue-100 bg-blue-50 h-7 px-2"
                         >
                           Use
                         </Button>
                         <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-gray-600">
                           <Edit2 className="w-3.5 h-3.5" />
                         </Button>
                         <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-gray-600">
                               <MoreVertical className="w-3.5 h-3.5" />
                             </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end">
                             <DropdownMenuItem>Remove from favorites</DropdownMenuItem>
                             <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                           </DropdownMenuContent>
                         </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Queries */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                <Clipboard className="w-3 h-3" /> All Saved Queries
              </h3>
              <div className="space-y-3">
                {savedQueries.filter(q => !q.favorite).map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all group relative">
                    <div className="flex justify-between items-start mb-1 pr-6">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{item.title}</h4>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3 italic">"{item.query}"</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-400">Used {item.used} times • Last: {item.lastUsed}</span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 bg-white pl-2">
                         <Button 
                           variant="secondary" 
                           size="sm" 
                           onClick={() => onUseQuery(item.query)} 
                           className="text-xs font-medium text-blue-600 hover:bg-blue-100 bg-blue-50 h-7 px-2"
                         >
                           Use
                         </Button>
                         <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-gray-600">
                           <Edit2 className="w-3.5 h-3.5" />
                         </Button>
                         <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-gray-600">
                               <MoreVertical className="w-3.5 h-3.5" />
                             </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end">
                             <DropdownMenuItem>Add to favorites</DropdownMenuItem>
                             <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                           </DropdownMenuContent>
                         </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-200 shrink-0 bg-white">
          <Button 
            variant="outline" 
            onClick={() => setShowSaveDialog(true)} 
            className="w-full border-dashed border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <Plus className="w-4 h-4 mr-2" /> Save Current Query
          </Button>
        </div>
      </div>

      {/* Save Query Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Query</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>Query Name</Label>
              <Input placeholder="e.g. Contract Liability Analysis" />
            </div>
            <div className="space-y-2">
              <Label>Query Text</Label>
              <Textarea 
                placeholder="Enter query text..." 
                defaultValue="Analyze this contract and identify all clauses that could expose my client to liability..." 
                className="h-24 resize-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="fav" />
              <Label htmlFor="fav" className="font-normal text-gray-600">Add to Favorites</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowSaveDialog(false)} className="bg-blue-600 hover:bg-blue-700">Save Query</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
