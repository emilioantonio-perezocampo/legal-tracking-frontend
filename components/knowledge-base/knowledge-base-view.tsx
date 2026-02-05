'use client'

import React, { useState } from 'react'
import { 
  Search, Filter, Plus, ChevronRight, Briefcase, 
  Scale, Home, BookOpen, UserCheck, ShieldCheck, 
  Database, Globe, Bookmark, Star, ExternalLink, 
  ArrowRight, Layout, Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const practiceAreas = [
  { name: 'Corporate Law', icon: Briefcase, color: 'text-blue-600 bg-blue-100', desc: 'Mergers & acquisitions, securities, corporate governance, and compliance.', resources: '2,458', updated: '3 days ago' },
  { name: 'Litigation', icon: Scale, color: 'text-orange-600 bg-orange-100', desc: 'Civil procedure, evidence, trial practice, and appellate advocacy.', resources: '3,721', updated: '1 day ago' },
  { name: 'Real Estate', icon: Home, color: 'text-green-600 bg-green-100', desc: 'Property transactions, land use, zoning, and construction law.', resources: '1,890', updated: '5 days ago' },
  { name: 'Employment Law', icon: UserCheck, color: 'text-red-600 bg-red-100', desc: 'Labor relations, discrimination, harassment, and workplace safety.', resources: '2,145', updated: '2 days ago' },
  { name: 'Intellectual Property', icon: ShieldCheck, color: 'text-purple-600 bg-purple-100', desc: 'Patents, trademarks, copyrights, and trade secrets.', resources: '1,723', updated: 'yesterday' },
  { name: 'Tax Law', icon: Database, color: 'text-yellow-600 bg-yellow-100', desc: 'Federal, state, and international taxation for individuals and businesses.', resources: '1,456', updated: '4 days ago' },
]

export function KnowledgeBaseView() {
  const [activeFilter, setActiveFilter] = useState('Advanced Search')

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Legal Knowledge Base</h1>
          <p className="text-muted-foreground mt-1">Access and browse legal resources, precedents, and jurisprudence.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search legal knowledge base..." 
              className="pl-12 py-6 text-base bg-gray-50/50"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-hide">
              {['Advanced Search', 'Case Law', 'Statutes', 'Regulations', 'Legal Commentary'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                    activeFilter === filter 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">Last updated: Today at 10:23 AM</span>
          </div>
        </CardContent>
      </Card>

      {/* Browse by Practice Area */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Browse by Practice Area</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area) => (
            <Card key={area.name} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", area.color)}>
                    <area.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{area.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6 h-10 line-clamp-2">{area.desc}</p>
                <div className="flex items-center justify-between text-xs pt-4 border-t border-gray-50">
                  <span className="text-blue-600 font-semibold">{area.resources} resources</span>
                  <span className="text-muted-foreground italic">Updated {area.updated}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Precedent Visualization */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Precedent Visualization</CardTitle>
          <div className="flex items-center gap-4">
            <Select defaultValue="network">
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Select View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="network">Network View</SelectItem>
                <SelectItem value="timeline">Timeline View</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="link" className="text-blue-600 h-auto p-0 font-semibold flex items-center gap-1">
              <Layout className="w-3.5 h-3.5" />
              Full View
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center mb-6 relative overflow-hidden group">
             <div className="absolute inset-0 opacity-10 flex items-center justify-center group-hover:opacity-20 transition-opacity">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-current text-blue-600">
                   <circle cx="50" cy="50" r="20" fill="none" strokeWidth="0.5" />
                   <circle cx="30" cy="30" r="10" fill="none" strokeWidth="0.5" />
                   <circle cx="70" cy="70" r="15" fill="none" strokeWidth="0.5" />
                   <line x1="50" y1="50" x2="30" y2="30" strokeWidth="0.5" />
                   <line x1="50" y1="50" x2="70" y2="70" strokeWidth="0.5" />
                </svg>
             </div>
             <span className="text-muted-foreground font-medium flex items-center gap-2">
               <ArrowRight className="w-4 h-4 animate-bounce" />
               Interactive Visualization Placeholder
             </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Most Cited Case</h4>
              <p className="text-sm font-semibold text-gray-900">Brown v. Board of Education (1954)</p>
              <span className="text-xs text-blue-600 font-medium">12,453 citations</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Landmark Case</h4>
              <p className="text-sm font-semibold text-gray-900">Obergefell v. Hodges (2015)</p>
              <span className="text-xs text-blue-600 font-medium">2,187 citations</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Trending Citation</h4>
              <p className="text-sm font-semibold text-gray-900">Carpenter v. United States (2018)</p>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-none font-bold">+45% this year</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Bookmarks & Favorites */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Your Bookmarks & Favorites</h2>
          <div className="flex gap-4">
            <Button variant="link" className="text-blue-600 p-0 h-auto font-semibold">Manage Bookmarks</Button>
            <Button variant="link" className="text-blue-600 p-0 h-auto font-semibold">Manage Favorites</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookmarks */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 py-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-blue-500 fill-blue-500" />
                Recent Bookmarks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {[
                  { title: 'United States v. Microsoft Corp.', subtitle: '584 U.S. ___ (2018)', desc: 'Antitrust law, jurisdiction over data stored abroad' },
                  { title: 'Alice Corp. v. CLS Bank International', subtitle: '573 U.S. 208 (2014)', desc: 'Patent law, software patents, abstract ideas' },
                  { title: 'NLRB v. Canning', subtitle: '573 U.S. 513 (2014)', desc: 'Constitutional law, recess appointments' },
                ].map((item, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-start group">
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                      <p className="text-[10px] font-bold text-muted-foreground mt-0.5">{item.subtitle}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.desc}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-300 hover:text-yellow-400 h-8 w-8 shrink-0">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Favorites */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 py-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                Favorites
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {[
                  { title: 'Delaware General Corporation Law', subtitle: 'Title 8, Chapter 1', desc: 'Corporate formation, governance, and operations' },
                  { title: 'Uniform Commercial Code', subtitle: 'Article 2: Sales', desc: 'Commercial transactions, sale of goods' },
                  { title: 'Federal Rules of Civil Procedure', subtitle: '2023 Edition', desc: 'Procedural rules for civil actions in U.S. federal courts' },
                ].map((item, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-start group">
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                      <p className="text-[10px] font-bold text-muted-foreground mt-0.5">{item.subtitle}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.desc}</p>
                    </div>
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Integrated External Databases */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Integrated External Databases</h2>
          <Button variant="link" className="text-blue-600 p-0 h-auto font-semibold flex items-center gap-1">
             <Settings className="w-3.5 h-3.5" />
             Manage Connections
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'LexisNexis', type: 'Legal research database', desc: 'Access comprehensive legal research, case law, statutes, and secondary sources.', synced: '2 hours ago', color: 'text-blue-600 bg-blue-100' },
            { name: 'Westlaw', type: 'Legal research service', desc: 'Search legal materials, including cases, statutes, regulations, and legal journals.', synced: '1 day ago', color: 'text-teal-600 bg-teal-100' },
            { name: 'HeinOnline', type: 'Academic database', desc: 'Access legal journals, government documents, and historical legal materials.', synced: '3 days ago', color: 'text-yellow-600 bg-yellow-100' },
          ].map((db) => (
            <Card key={db.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", db.color)}>
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{db.name}</h3>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">{db.type}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100 px-1.5 gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Live
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-6 line-clamp-2 leading-relaxed">{db.desc}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-[10px] text-muted-foreground">Synced {db.synced}</span>
                  <Button variant="link" className="text-blue-600 h-auto p-0 text-xs font-bold">Search Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connect Additional Databases */}
        <Card className="bg-gray-50/50 border-dashed border-2">
           <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-900">Connect Additional Databases</h3>
                    <p className="text-sm text-muted-foreground">Expand your research capabilities by connecting to more legal databases.</p>
                 </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 shrink-0 px-8">
                 Connect
              </Button>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
