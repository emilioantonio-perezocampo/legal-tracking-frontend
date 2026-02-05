'use client'

import React, { useState } from 'react'
import { 
  Share2, Printer, Plus, FileText, 
  Scale, Clock, MessageSquare, CreditCard, Bot, 
  BarChart2, ChevronRight, MoreVertical,
  Briefcase, Users, ArrowRight, Check, Calendar as CalendarIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from 'next/link'

export function CaseDetailView({ savedContent }: { savedContent?: any }) {
  const [activeTab, setActiveTab] = useState('Case Overview')
  const [aiInput, setAiInput] = useState('')

  const navItems = [
    { name: 'Case Overview', icon: Briefcase },
    { name: 'Parties', icon: Users },
    { name: 'Documents', icon: FileText, badge: '12' },
    { name: 'Court Filings', icon: Scale },
    { name: 'Legal Analysis', icon: Bot },
    { name: 'Timeline', icon: Clock },
    { name: 'Communications', icon: MessageSquare },
    { name: 'Billing', icon: CreditCard },
  ]

  return (
    <div className="flex flex-col h-full bg-gray-50 min-h-screen pb-24 animate-in fade-in duration-500">
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/dashboard" className="hover:text-blue-600 cursor-pointer transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 mx-2 text-gray-400" />
        <Link href="/expedientes" className="hover:text-blue-600 cursor-pointer transition-colors">Cases</Link>
        <ChevronRight className="w-3 h-3 mx-2 text-gray-400" />
        <span className="hover:text-blue-600 cursor-pointer transition-colors">Corporate</span>
        <ChevronRight className="w-3 h-3 mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium" aria-current="page">Acme Corporation v. Smith</span>
      </nav>

      {/* Case Header */}
      <header className="bg-white rounded-xl border border-gray-200 p-6 mb-8 relative shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Acme Corporation v. Smith</h1>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
              </Badge>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="text-gray-400">Case ID:</span>
                <span className="font-mono text-gray-700">#LC-2023-42</span>
              </span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1.5">
                <span className="text-gray-400">Type:</span>
                <span className="font-medium text-gray-700">Corporate Litigation</span>
              </span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-gray-300"></span>
              <span>Opened May 15, 2023</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" size="sm" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
              <Share2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="outline" size="sm" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
              <Printer className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-100">
              <Plus className="w-4 h-4 mr-2" />
              Add Document
            </Button>
          </div>
        </div>
      </header>

      {/* THREE-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMN 1: Navigation & Tools (Span 3) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Case Navigation */}
          <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Case Navigation</h3>
            </div>
            <div className="p-1.5 space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-all duration-200",
                    activeTab === item.name 
                      ? "bg-blue-50 text-blue-700 font-medium" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn(
                      "w-4 h-4",
                      activeTab === item.name ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                    )} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                      activeTab === item.name 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-gray-100 text-gray-600"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Team Members */}
          <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Team Members</h3>
            </div>
            <div className="p-4 space-y-4">
              {[
                { name: 'John Lawson', role: 'Lead Counsel', initials: 'JL', color: 'bg-blue-100 text-blue-700' },
                { name: 'David Chen', role: 'Partner', initials: 'DC', color: 'bg-emerald-100 text-emerald-700' },
                { name: 'Sarah Johnson', role: 'Associate', initials: 'SJ', color: 'bg-purple-100 text-purple-700' },
              ].map((member) => (
                <div key={member.name} className="flex items-center gap-3 group cursor-pointer hover:bg-gray-50 -mx-2 p-2 rounded-lg transition-colors">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-transparent group-hover:ring-white shadow-sm", member.color)}>
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
              <Button variant="link" className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto font-medium">
                <Plus className="w-3 h-3 mr-1" /> Manage team
              </Button>
            </div>
          </section>
        </div>

        {/* COLUMN 2: Summary & Status (Span 6) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Case Summary */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <h3 className="text-sm font-bold text-gray-900">Case Summary</h3>
              <Button variant="link" className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto font-medium">Edit details</Button>
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-700 space-y-4 mb-8 leading-relaxed">
                <p>
                  This case involves a contract dispute between Acme Corporation and former executive John Smith regarding alleged breach of non-compete agreements and misappropriation of trade secrets following Smith's departure to competitor XYZ Tech.
                </p>
                <p>
                  Acme Corporation seeks injunctive relief and damages for alleged violations of the employment agreement signed on March 10, 2021, specifically sections 8.2 (non-compete) and 9.4 (confidentiality).
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 pt-6 border-t border-gray-100">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Jurisdiction</p>
                  <p className="text-sm font-medium text-gray-900">Southern District of New York</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Presiding Judge</p>
                  <p className="text-sm font-medium text-gray-900">Hon. Elizabeth Warren</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Opposing Counsel</p>
                  <p className="text-sm font-medium text-gray-900">Davis & Associates</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Current Phase</p>
                  <p className="text-sm font-medium text-gray-900">Discovery</p>
                </div>
              </div>
            </div>
          </section>

          {/* Case Status */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <h3 className="text-sm font-bold text-gray-900">Case Status & Timeline</h3>
              <Button variant="link" className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto font-medium">Update status</Button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-gray-900">Discovery Phase In Progress</span>
              </div>

              <div className="mb-8">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-medium text-gray-600">Overall Progress</span>
                  <span className="text-gray-900 font-bold">45%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">
                  <span>Complaint</span>
                  <span className="text-blue-600">Discovery</span>
                  <span>Pre-Trial</span>
                  <span>Trial</span>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Upcoming Key Dates</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-lg bg-red-50/50 border border-red-100 group hover:border-red-200 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm"></div>
                      <div>
                         <span className="text-sm font-semibold text-gray-900 block group-hover:text-red-700 transition-colors">Document Production Deadline</span>
                         <span className="text-xs text-gray-500">Priority: High</span>
                      </div>
                    </div>
                    <span className="text-xs text-red-700 font-bold bg-white px-2.5 py-1 rounded shadow-sm border border-red-100">June 15 (3 days)</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-lg bg-gray-50 border border-gray-200 group hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                      <div>
                         <span className="text-sm font-semibold text-gray-700 block group-hover:text-gray-900 transition-colors">Deposition - John Smith</span>
                         <span className="text-xs text-gray-500">Location: Conference Room A</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">June 28, 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* COLUMN 3: Actions & Docs (Span 3) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Quick Actions */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Upload Doc', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                { name: 'Add Party', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { name: 'New Event', icon: CalendarIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
                { name: 'Add Note', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((action) => (
                <button key={action.name} className="flex flex-col items-center justify-center p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-white hover:border-gray-300 hover:shadow-md transition-all text-center h-20 group">
                  <div className={cn("mb-2 p-1.5 rounded-md transition-transform group-hover:scale-110", action.bg, action.color)}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-700 leading-tight group-hover:text-gray-900">{action.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* AI Assistant Card */}
          <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl border border-blue-500/50 shadow-lg shadow-blue-900/10 p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Bot className="w-24 h-24" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-sm border border-white/10">
                   <Bot className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">AI Assistant</h3>
              </div>
              
              {savedContent ? (
                <div className="bg-white/10 border border-white/20 rounded-lg p-3 mb-4 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Check className="w-3 h-3 text-emerald-300" />
                    <span className="text-xs font-bold text-blue-50">Content Added</span>
                  </div>
                  <p className="text-xs text-blue-100 line-clamp-2 leading-relaxed">
                    {savedContent.title} saved to case context.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-blue-100 mb-4 leading-relaxed opacity-90 font-medium">
                  I can analyze documents, research relevant precedents, or draft responses for this case.
                </p>
              )}
              
              <div className="relative group">
                <Input 
                  type="text" 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full pl-3 pr-9 py-2.5 bg-white/10 border-white/20 rounded-lg text-sm text-white placeholder:text-blue-200 focus-visible:ring-0 focus-visible:border-white/40 focus:bg-white/20 transition-all backdrop-blur-sm shadow-inner"
                />
                <button className="absolute right-2 top-2 p-0.5 text-blue-200 hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Key Documents */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <h3 className="text-sm font-bold text-gray-900">Key Documents</h3>
              <Button variant="link" className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto font-medium">View All</Button>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { name: 'Complaint.pdf', date: 'May 15', size: '24pg', color: 'text-red-600 bg-red-50' },
                { name: 'Employment_Agreement.pdf', date: 'May 16', size: '12pg', color: 'text-blue-600 bg-blue-50' },
                { name: 'Financial_Analysis.xlsx', date: 'May 22', size: '3sht', color: 'text-emerald-600 bg-emerald-50' },
              ].map((doc, i) => (
                <div key={i} className="px-5 py-3 hover:bg-gray-50 flex justify-between items-center cursor-pointer group transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={cn("w-8 h-8 rounded flex items-center justify-center shrink-0 border border-transparent group-hover:border-gray-200 transition-colors", doc.color)}>
                       <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-700 transition-colors">{doc.name}</p>
                      <p className="text-[10px] text-gray-500 font-medium">{doc.date} • {doc.size}</p>
                    </div>
                  </div>
                  <MoreVertical className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" /> 
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
      
      {/* Floating Action Button (Responsive) */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
         <button className="w-14 h-14 bg-blue-600 rounded-full shadow-xl shadow-blue-600/30 flex items-center justify-center text-white hover:bg-blue-700 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-7 h-7" />
         </button>
      </div>
    </div>
  )
}
