'use client'

import React, { useState } from 'react'
import { 
  Search, Filter, Plus, FileText, ChevronDown, 
  MoreVertical, Download, Eye, Share2, Printer, 
  Globe, Database, ExternalLink, Calendar,
  CheckCircle, AlertCircle, FileCheck, FileSignature
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// --- Mock Data ---

const DOCUMENTS = [
  { 
    id: '1', 
    name: 'Acme Corp - Merger Agreement.pdf', 
    type: 'Contract', 
    client: 'Acme Corporation', 
    case: 'Merger', 
    status: 'Draft', 
    date: '2 hours ago',
    size: '2.4 MB'
  },
  { 
    id: '2', 
    name: 'Global Industries - NDA.docx', 
    type: 'Contract', 
    client: 'Global Industries', 
    case: 'General', 
    status: 'Signed', 
    date: 'Yesterday',
    size: '1.1 MB'
  },
  { 
    id: '3', 
    name: 'Tech Futures - IP Complaint.pdf', 
    type: 'Litigation', 
    client: 'Tech Futures Ltd.', 
    case: 'IP Dispute', 
    status: 'Urgent', 
    date: '3 days ago',
    size: '4.5 MB'
  },
  { 
    id: '4', 
    name: 'Employment Contract Template.docx', 
    type: 'Template', 
    client: 'Internal', 
    case: '-', 
    status: 'Final', 
    date: '1 week ago',
    size: '0.8 MB'
  },
  { 
    id: '5', 
    name: 'Acme Corp - Financial Analysis.xlsx', 
    type: 'Analysis', 
    client: 'Acme Corporation', 
    case: 'Merger', 
    status: 'Review', 
    date: '2 weeks ago',
    size: '1.2 MB'
  },
]

const INTEGRATIONS = [
  { name: 'LexisNexis', status: 'Connected', icon: Globe, color: 'text-blue-600 bg-blue-100' },
  { name: 'Westlaw', status: 'Connected', icon: Database, color: 'text-teal-600 bg-teal-100' },
  { name: 'HeinOnline', status: 'Syncing', icon: FileText, color: 'text-yellow-600 bg-yellow-100' },
]

export function DocumentLibraryView() {
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Signed': return 'bg-green-100 text-green-700 border-green-200'
      case 'Urgent': return 'bg-red-100 text-red-700 border-red-200'
      case 'Final': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Review': return 'bg-purple-100 text-purple-700 border-purple-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Contract': return FileSignature
      case 'Litigation': return Scale
      case 'Template': return FileText
      case 'Analysis': return BarChart
      default: return FileText
    }
  }

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Document Library</h1>
          <p className="text-muted-foreground mt-1">Manage, search, and analyze all your legal documents.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Upload Document
          </Button>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase">Document Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="contract">Contracts</SelectItem>
                  <SelectItem value="filing">Court Filings</SelectItem>
                  <SelectItem value="memo">Memos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase">Client</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corp</SelectItem>
                  <SelectItem value="global">Global Industries</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase">Case</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="merger">Merger</SelectItem>
                  <SelectItem value="ip">IP Dispute</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase">Date Range</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Select dates" className="pl-9" />
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 items-end">
             <div className="flex-1 space-y-2">
               <label className="text-xs font-semibold text-gray-500 uppercase">Full Text Search</label>
               <div className="relative">
                 <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                 <Input 
                   placeholder="Search document contents..." 
                   className="pl-9"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
             </div>
             <Button variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-700">Reset</Button>
             <Button className="bg-blue-600 hover:bg-blue-700 w-24">Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs & Content */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 mb-6">
          <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent pb-3 px-6 text-sm font-medium">All Documents</TabsTrigger>
          <TabsTrigger value="recent" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent pb-3 px-6 text-sm font-medium">Recently Added</TabsTrigger>
          <TabsTrigger value="contracts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent pb-3 px-6 text-sm font-medium">Contracts</TabsTrigger>
          <TabsTrigger value="filings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent pb-3 px-6 text-sm font-medium">Court Filings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="rounded-md border bg-white shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead className="w-[400px]">Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DOCUMENTS.map((doc) => (
                  <TableRow key={doc.id} className="group cursor-pointer hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded text-gray-500">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-gray-900">{doc.name}</div>
                          <div className="text-xs text-muted-foreground">{doc.size}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{doc.type}</TableCell>
                    <TableCell className="text-sm text-gray-600">{doc.client}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("font-normal border", getStatusBadge(doc.status))}>
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{doc.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600"><Download className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900"><MoreVertical className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="px-4 py-3 border-t bg-gray-50/50 flex items-center justify-between text-xs text-muted-foreground">
              <span>Showing 1-{DOCUMENTS.length} of 42 documents</span>
              <div className="flex gap-1">
                 <Button variant="outline" size="sm" className="h-7 px-2" disabled>&lt;</Button>
                 <Button variant="default" size="sm" className="h-7 px-2 bg-blue-600">1</Button>
                 <Button variant="outline" size="sm" className="h-7 px-2">2</Button>
                 <Button variant="outline" size="sm" className="h-7 px-2">&gt;</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Integrations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-bold">Integrated Databases</CardTitle>
            <Button variant="link" className="text-xs h-auto p-0 text-blue-600">Manage</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {INTEGRATIONS.map((integration, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", integration.color)}>
                    <integration.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">{integration.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={cn("w-1.5 h-1.5 rounded-full", integration.status === 'Connected' ? 'bg-green-500' : 'bg-yellow-500')}></span>
                      <span className="text-xs text-gray-500">{integration.status}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs">Sync Now</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-blue-50/50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-blue-900">Connect New Source</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center text-center py-8">
             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
               <Plus className="w-6 h-6 text-blue-600" />
             </div>
             <p className="text-sm text-blue-800 mb-4 max-w-xs">Expand your research capabilities by connecting to additional legal databases and repositories.</p>
             <Button className="bg-blue-600 hover:bg-blue-700">Browse Integrations</Button>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

function BarChart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

function Scale({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  )
}
