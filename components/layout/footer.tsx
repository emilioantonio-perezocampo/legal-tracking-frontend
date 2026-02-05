'use client'

import React from 'react';
import { 
  Keyboard, 
  HelpCircle,
  ExternalLink,
  Info
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="flex items-center justify-center gap-4 md:gap-6 h-10 px-6 bg-gray-50/80 backdrop-blur-sm border-t border-gray-200 text-xs text-gray-500 w-full mt-auto select-none z-40">
      
      {/* System Status */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden sm:inline font-medium text-gray-600">All systems operational</span>
            <span className="sm:hidden font-medium text-gray-600">Online</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-80 p-0 shadow-lg border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center text-black">
            <span className="font-semibold text-sm">System Status</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 border border-emerald-100 rounded">LIVE</span>
          </div>
          <div className="p-2 space-y-1">
            {[
              { name: 'API Services', status: 'Operational' },
              { name: 'AI Processing', status: 'Operational' },
              { name: 'Document Storage', status: 'Operational' },
              { name: 'Search & Indexing', status: 'Operational' },
              { name: 'External Integrations', status: 'Operational' },
            ].map((service) => (
              <div key={service.name} className="flex justify-between items-center px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors cursor-default">
                <div className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                   <span className="text-gray-700">{service.name}</span>
                </div>
                <span className="text-emerald-600 text-xs font-medium">{service.status}</span>
              </div>
            ))}
          </div>
          <DropdownMenuSeparator className="my-0"/>
          <div className="p-3 bg-gray-50/50 flex justify-between items-center text-xs">
            <span className="text-gray-400">Last updated: Just now</span>
            <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 font-medium">
              View Status Page <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>

      {/* Shortcuts Hint */}
      <div className="hidden sm:flex relative group">
        <button 
          className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 hover:border-gray-300 transition-all text-[10px] font-mono text-gray-500 shadow-sm"
        >
          <Keyboard className="w-3 h-3 text-gray-400" />
          <span>⌘K Search</span>
        </button>
        
        {/* Custom Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-gray-900 text-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-4 text-xs transform origin-bottom scale-95 group-hover:scale-100">
           <div className="font-semibold mb-3 text-gray-300 border-b border-gray-700 pb-2">Keyboard Shortcuts</div>
           <div className="grid grid-cols-[1fr_auto] gap-y-2 gap-x-4">
             <span>Global search</span> <span className="font-mono text-gray-400 bg-gray-800 px-1 rounded">⌘K</span>
             <span>New item</span> <span className="font-mono text-gray-400 bg-gray-800 px-1 rounded">⌘N</span>
             <span>Save changes</span> <span className="font-mono text-gray-400 bg-gray-800 px-1 rounded">⌘S</span>
             <span>Show shortcuts</span> <span className="font-mono text-gray-400 bg-gray-800 px-1 rounded">⌘/</span>
           </div>
           <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </div>

      <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>

      {/* Version */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="hidden sm:block px-2 py-1 rounded hover:bg-gray-100 transition-colors font-mono text-[10px] text-gray-400">
            v2.4.1
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-80 shadow-lg border-gray-200">
          <DropdownMenuLabel className="flex justify-between items-center px-4 pt-4 pb-2 text-black">
             <span className="font-bold">What's New</span>
             <span className="text-xs font-mono font-normal text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">v2.4.1</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-[300px] overflow-y-auto p-4 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                 <span className="text-base">✨</span> New Features
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 ml-1">
                <li className="flex gap-2.5 items-start">
                   <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                   <span className="leading-relaxed">AI-powered document summarization now available in all views</span>
                </li>
                <li className="flex gap-2.5 items-start">
                   <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                   <span className="leading-relaxed">Enhanced case timeline visualization with drag-and-drop</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                 <span className="text-base">🐛</span> Bug Fixes
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 ml-1">
                <li className="flex gap-2.5 items-start">
                   <span className="w-1 h-1 bg-emerald-500 rounded-full mt-2 shrink-0"></span>
                   <span className="leading-relaxed">Fixed search results pagination issue</span>
                </li>
                <li className="flex gap-2.5 items-start">
                   <span className="w-1 h-1 bg-emerald-500 rounded-full mt-2 shrink-0"></span>
                   <span className="leading-relaxed">Resolved calendar sync delay for external calendars</span>
                </li>
              </ul>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs text-blue-600 justify-center cursor-pointer font-medium hover:text-blue-700 py-2.5">
             View Full Changelog
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>

      {/* Copyright */}
      <span className="hidden md:block text-gray-400">© 2026 Asistente Juridico Virtual</span>

      <div className="w-px h-4 bg-gray-200 hidden md:block"></div>

      {/* Links */}
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
      </div>

      <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>

      {/* Help Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm">
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 shadow-lg border-gray-200">
          <DropdownMenuLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider text-black">Help & Resources</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Info className="mr-2 h-4 w-4 text-gray-500" /> Documentation
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <ExternalLink className="mr-2 h-4 w-4 text-gray-500" /> Video Tutorials
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4 text-gray-500" /> FAQ
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
             <Keyboard className="mr-2 h-4 w-4 text-gray-500" /> Keyboard Shortcuts
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </footer>
  );
}