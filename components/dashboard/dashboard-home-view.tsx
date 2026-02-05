'use client'

import React from 'react'
import { 
  Folder, MessageSquare, Bell, Search, FileText, 
  Calendar as CalendarIcon, MoreVertical, ArrowUpRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function DashboardHomeView({ onNavigateToCalendar }: { onNavigateToCalendar: () => void }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, John. Here's an overview of your legal practice.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Cases */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <Folder className="w-5 h-5 text-blue-600" />
            </div>
            <Button variant="link" className="text-xs h-auto p-0 text-blue-600">View all</Button>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
          <div className="text-xs text-green-600 font-medium mb-6 flex items-center gap-1">
             <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[10px] h-5 px-1">↑ 12%</Badge> 
             <span className="text-gray-500 ml-1">vs last month</span>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Corporate', count: 10, color: 'bg-blue-500' },
              { label: 'Litigation', count: 8, color: 'bg-indigo-500' },
              { label: 'Other', count: 6, color: 'bg-emerald-500' }
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                  <span className="font-medium">{item.label}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.count / 24) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent AI Queries */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-emerald-50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
            </div>
            <Button variant="link" className="text-xs h-auto p-0 text-blue-600">View history</Button>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">18</div>
          <div className="text-xs text-blue-600 font-medium mb-6 flex items-center gap-1">
             <span className="w-2 h-2 rounded-full bg-blue-500"></span> Last query 2h ago
          </div>
          <div className="space-y-4">
            {[
              { text: 'Precedent for IP infringement in software case', time: '2 hours ago' },
              { text: 'Employment contract clause analysis', time: 'Yesterday' },
              { text: 'Recent changes to tax law affecting corporate mergers', time: '2 days ago' }
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start group cursor-pointer">
                 <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 shrink-0 group-hover:bg-blue-500 transition-colors"></div>
                 <div>
                   <div className="text-sm text-gray-700 font-medium line-clamp-1 group-hover:text-blue-600 transition-colors">{item.text}</div>
                   <div className="text-xs text-gray-400 mt-0.5">{item.time}</div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Alerts */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-amber-50 rounded-lg">
              <Bell className="w-5 h-5 text-amber-600" />
            </div>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">Manage alerts</button>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">7</div>
          <div className="text-xs text-amber-600 font-medium mb-6 flex items-center gap-1">
             <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none text-[10px] h-5 px-1">ATTENTION</Badge> 
             <span className="text-gray-500 ml-1">3 require action</span>
          </div>
          <div className="space-y-4">
            {[
              { text: 'New Supreme Court ruling on data privacy', time: '1 day ago', priority: 'high' },
              { text: 'Legislative update: Corporate tax changes', time: '3 days ago', priority: 'medium' },
              { text: 'Deadline approaching: Regulatory filing', time: '5 days ago', priority: 'medium' }
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                 <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${item.priority === 'high' ? 'bg-amber-500' : 'bg-blue-400'}`}></div>
                 <div>
                   <div className="text-sm text-gray-700 font-medium line-clamp-1">{item.text}</div>
                   <div className="text-xs text-gray-400 mt-0.5">{item.time}</div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: MessageSquare, title: 'AI Consultation', sub: 'Ask legal questions', color: 'bg-blue-50 text-blue-600', border: 'hover:border-blue-200' },
          { icon: FileText, title: 'New Document', sub: 'Create or upload', color: 'bg-emerald-50 text-emerald-600', border: 'hover:border-emerald-200' },
          { icon: Folder, title: 'New Case', sub: 'Start case workflow', color: 'bg-indigo-50 text-indigo-600', border: 'hover:border-indigo-200' },
          { icon: Search, title: 'Research', sub: 'Search knowledge base', color: 'bg-purple-50 text-purple-600', border: 'hover:border-purple-200' }
        ].map((card, i) => (
          <div key={i} className={cn(
            "bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group",
            card.border
          )}>
             <div className={cn("p-3 rounded-lg group-hover:scale-110 transition-transform", card.color)}>
               <card.icon className="w-5 h-5" />
             </div>
             <div>
               <div className="font-semibold text-gray-900 text-sm">{card.title}</div>
               <div className="text-xs text-gray-500 mt-0.5">{card.sub}</div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
               <h3 className="font-bold text-gray-900 text-sm">Recent Activity</h3>
               <Button variant="link" className="text-xs h-auto p-0 text-blue-600">View all</Button>
            </div>
            <div className="divide-y divide-gray-100">
               {[
                 { title: 'Document Uploaded', desc: 'Merger Agreement v2.pdf uploaded to Acme Corp case', time: '10 mins ago', icon: FileText, color: 'text-blue-600 bg-blue-50' },
                 { title: 'Case Updated', desc: 'Status changed to "In Progress" for Smith Litigation', time: '2 hours ago', icon: Folder, color: 'text-amber-600 bg-amber-50' },
                 { title: 'AI Query', desc: 'Researched "non-compete enforceability in California"', time: '4 hours ago', icon: MessageSquare, color: 'text-purple-600 bg-purple-50' },
                 { title: 'Meeting Scheduled', desc: 'Client review with Global Industries for tomorrow', time: 'Yesterday', icon: CalendarIcon, color: 'text-emerald-600 bg-emerald-50' },
               ].map((item, i) => (
                 <div key={i} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-default group">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", item.color)}>
                       <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{item.title}</h4>
                       <p className="text-sm text-gray-500 truncate">{item.desc}</p>
                    </div>
                    <div className="text-xs text-gray-400 whitespace-nowrap">{item.time}</div>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
                       <MoreVertical className="w-4 h-4" />
                    </Button>
                 </div>
               ))}
            </div>
          </div>

          {/* Notifications & Updates */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
               <h3 className="font-bold text-gray-900 text-sm">Notifications & Updates</h3>
               <Button variant="link" className="text-xs h-auto p-0 text-blue-600">Mark all as read</Button>
            </div>
            <div className="divide-y divide-gray-100">
               {[
                 { text: 'System maintenance scheduled for Saturday 10 PM EST', type: 'System', unread: true },
                 { text: 'New "Family Law" module available', type: 'Feature', unread: true },
                 { text: 'Your weekly analytics report is ready', type: 'Report', unread: false },
               ].map((item, i) => (
                 <div key={i} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors group cursor-default">
                    <div className="mt-2">
                      {item.unread ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full border border-gray-300"></div>
                      )}
                    </div>
                    <div className="flex-1">
                       <p className={cn("text-sm", item.unread ? 'font-medium text-gray-900' : 'text-gray-600')}>{item.text}</p>
                       <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mt-1.5 inline-block px-2 py-0.5 bg-gray-100 rounded border border-gray-200">
                         {item.type}
                       </Badge>
                    </div>
                 </div>
               ))}
            </div>
          </div>

        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
           
           {/* Upcoming Deadlines */}
           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-5">
                 <h3 className="font-bold text-gray-900 text-sm">Upcoming Deadlines</h3>
                 <Button variant="link" onClick={onNavigateToCalendar} className="text-xs h-auto p-0 text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
                    <CalendarIcon className="w-3 h-3" /> View Calendar
                 </Button>
              </div>
              <div className="space-y-3">
                 <div className="p-3.5 bg-red-50/50 border border-red-100 rounded-lg hover:bg-red-50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-1.5">
                       <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">Today</span>
                       <Badge className="text-[10px] font-bold text-red-600 bg-white px-2 py-0.5 rounded-full border border-red-100 shadow-sm hover:bg-white">Urgent</Badge>
                    </div>
                    <div className="text-sm font-bold text-gray-900 group-hover:text-red-700 transition-colors">Motion to Compel Filing</div>
                    <div className="text-xs text-gray-500 mt-1 flex justify-between">
                      <span>Acme v. Smith</span>
                      <span>5:00 PM</span>
                    </div>
                 </div>
                 <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-1.5">
                       <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Tomorrow</span>
                       <Badge className="text-[10px] font-bold text-amber-600 bg-white px-2 py-0.5 rounded-full border border-amber-100 shadow-sm hover:bg-white">Important</Badge>
                    </div>
                    <div className="text-sm font-bold text-gray-900 group-hover:text-amber-700 transition-colors">Client Contract Review</div>
                    <div className="text-xs text-gray-500 mt-1 flex justify-between">
                      <span>Global Industries</span>
                      <span>2:00 PM</span>
                    </div>
                 </div>
                 <div className="p-3.5 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-1.5">
                       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Jun 15</span>
                       <Badge variant="outline" className="text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200 shadow-sm hover:bg-white">Scheduled</Badge>
                    </div>
                    <div className="text-sm font-bold text-gray-900 group-hover:text-gray-900 transition-colors">Quarterly Board Meeting</div>
                    <div className="text-xs text-gray-500 mt-1 flex justify-between">
                      <span>Internal</span>
                      <span>10:00 AM</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Team Activity */}
           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-5">
                 <h3 className="font-bold text-gray-900 text-sm">Team Activity</h3>
                 <Button variant="link" className="text-xs h-auto p-0 text-blue-600">View members</Button>
              </div>
              <div className="space-y-4">
                 {[
                   { name: 'John Lawson', role: 'Partner', status: 'Online', initials: 'JL', color: 'bg-blue-100 text-blue-700' },
                   { name: 'Sarah Johnson', role: 'Associate', status: 'In Court', initials: 'SJ', color: 'bg-emerald-100 text-emerald-700' },
                   { name: 'David Chen', role: 'Partner', status: 'In Meeting', initials: 'DC', color: 'bg-purple-100 text-purple-700' },
                   { name: 'Michael Rodriguez', role: 'Paralegal', status: 'Offline', initials: 'MR', color: 'bg-gray-100 text-gray-700' },
                 ].map((member, i) => (
                   <div key={i} className="flex items-center gap-3 group cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={cn("text-xs font-bold ring-2 ring-transparent group-hover:ring-offset-1 group-hover:ring-gray-200 transition-all", member.color)}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                         <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">{member.name}</div>
                         <div className="text-xs text-gray-500">{member.role}</div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 group-hover:text-gray-600 transition-colors">
                         <div className={cn("w-2 h-2 rounded-full", 
                           member.status === 'Online' ? 'bg-green-500' : 
                           member.status === 'Offline' ? 'bg-gray-300' : 'bg-amber-500'
                         )}></div>
                         <span>{member.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
              <Button variant="outline" className="w-full mt-5 text-xs text-gray-700 font-medium">
                 Manage Team
              </Button>
           </div>

        </div>
      </div>
    </div>
  )
}
