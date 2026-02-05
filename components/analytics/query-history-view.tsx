'use client'

import React, { useState } from 'react'
import { 
  Search, Filter, ChevronDown, Download, Eye, MoreVertical, 
  Clock, CheckCircle, AlertTriangle, XCircle, Calendar, 
  BarChart2, PieChart as PieChartIcon, TrendingUp, Users, ArrowUpRight, ArrowDownRight,
  FileText, Settings
} from 'lucide-react'
import { 
  AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// --- Mock Data ---

const QUERY_VOLUME_DATA = [
  { name: 'Mon', queries: 120 },
  { name: 'Tue', queries: 150 },
  { name: 'Wed', queries: 180 },
  { name: 'Thu', queries: 220 },
  { name: 'Fri', queries: 190 },
  { name: 'Sat', queries: 100 },
  { name: 'Sun', queries: 80 },
]

const PRACTICE_AREA_DATA = [
  { name: 'Corporate', value: 35, color: '#1976D2' },
  { name: 'Litigation', value: 25, color: '#2196F3' },
  { name: 'Real Estate', value: 20, color: '#4CAF50' },
  { name: 'Employment', value: 15, color: '#FF9800' },
  { name: 'Other', value: 5, color: '#9E9E9E' },
]

const SEARCH_PATTERNS_DATA = [
  { name: 'Contract Review', count: 450 },
  { name: 'Case Precedents', count: 320 },
  { name: 'Liability Clauses', count: 280 },
  { name: 'Compliance', count: 210 },
  { name: 'IP Infringement', count: 180 },
]

const QUERY_LOGS = [
  { id: 1, timestamp: '2023-06-03 14:32:18', user: 'John Lawson', query: 'Recent precedents for software patent infringement cases', area: 'Intellectual Property', duration: '2.8s', status: 'Successful', statusColor: 'bg-green-50 text-green-700', initials: 'JL', color: 'bg-blue-100 text-blue-700' },
  { id: 2, timestamp: '2023-06-03 13:45:07', user: 'Sarah Johnson', query: 'Employment contract termination clause analysis', area: 'Employment Law', duration: '4.2s', status: 'Successful', statusColor: 'bg-green-50 text-green-700', initials: 'SJ', color: 'bg-blue-100 text-blue-700' },
  { id: 3, timestamp: '2023-06-03 11:27:33', user: 'David Chen', query: 'Recent tax law changes affecting corporate mergers', area: 'Corporate Law', duration: '3.5s', status: 'Successful', statusColor: 'bg-green-50 text-green-700', initials: 'DC', color: 'bg-teal-100 text-teal-700' },
  { id: 4, timestamp: '2023-06-03 10:15:42', user: 'Michael Rodriguez', query: 'California real estate disclosure requirements', area: 'Real Estate', duration: '2.1s', status: 'Partial match', statusColor: 'bg-yellow-50 text-yellow-700', initials: 'MR', color: 'bg-blue-100 text-blue-700' },
  { id: 5, timestamp: '2023-06-03 09:03:19', user: 'John Lawson', query: 'Data privacy regulations for healthcare technology', area: 'Healthcare', duration: '5.7s', status: 'Failed', statusColor: 'bg-red-50 text-red-700', initials: 'JL', color: 'bg-blue-100 text-blue-700' },
]

const TEAM_PERFORMANCE = [
  { name: 'John Lawson', role: 'Senior Partner', queries: 284, avgTime: '3.1s', successRate: '97%', area: 'Intellectual Property', initials: 'JL', color: 'bg-blue-100 text-blue-700' },
  { name: 'Sarah Johnson', role: 'Associate', queries: 256, avgTime: '3.4s', successRate: '92%', area: 'Employment Law', initials: 'SJ', color: 'bg-blue-100 text-blue-700' },
  { name: 'David Chen', role: 'Partner', queries: 223, avgTime: '2.9s', successRate: '95%', area: 'Corporate Law', initials: 'DC', color: 'bg-teal-100 text-teal-700' },
  { name: 'Michael Rodriguez', role: 'Associate', queries: 187, avgTime: '3.6s', successRate: '91%', area: 'Real Estate', initials: 'MR', color: 'bg-blue-100 text-blue-700' },
]

export function AnalyticsQueryHistoryView() {
  const [timeRange, setTimeRange] = useState('Daily')
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex flex-col space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Query History & Analytics</h1>
          <p className="text-muted-foreground mt-1">Complete log of queries, search patterns, and usage statistics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white">
            This Month <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Queries', value: '1,248', trend: '12%', trendUp: true, icon: Search, color: 'text-blue-600 bg-blue-50' },
          { title: 'Avg. Query Time', value: '3.2s', trend: '8%', trendUp: false, icon: Clock, color: 'text-orange-600 bg-orange-50' },
          { title: 'Active Users', value: '18', trend: '0%', trendUp: true, neutral: true, icon: Users, color: 'text-green-600 bg-green-50' },
          { title: 'Success Rate', value: '94%', trend: '3%', trendUp: true, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
        ].map((metric, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                <div className={cn("p-2 rounded-full", metric.color)}>
                  <metric.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold">{metric.value}</span>
                <div className="flex items-center gap-1 text-xs">
                  {metric.neutral ? (
                    <span className="text-muted-foreground flex items-center gap-1">
                       = Same as previous
                    </span>
                  ) : (
                    <span className={cn("flex items-center gap-1 font-medium", metric.trendUp ? 'text-green-600' : 'text-green-600')}>
                      {metric.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {metric.trend}
                    </span>
                  )}
                  {!metric.neutral && <span className="text-muted-foreground">vs. previous</span>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Volume Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-bold text-gray-900">Query Volume Trends</CardTitle>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['Daily', 'Weekly', 'Monthly'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-all",
                  timeRange === range 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-muted-foreground hover:text-gray-900'
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={QUERY_VOLUME_DATA}>
                <defs>
                  <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1976D2" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1976D2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#757575'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#757575'}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#fff', border: '1px solid #E0E0E0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}
                  itemStyle={{color: '#1976D2', fontWeight: 600}}
                />
                <Area type="monotone" dataKey="queries" stroke="#1976D2" strokeWidth={2} fillOpacity={1} fill="url(#colorQueries)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pattern & Usage Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-bold text-gray-900">Common Search Patterns</CardTitle>
            <Button variant="link" className="h-auto p-0 text-xs text-blue-600">View detailed analysis</Button>
          </CardHeader>
          <CardContent className="flex-1 min-h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart layout="vertical" data={SEARCH_PATTERNS_DATA} margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F5F5F5" />
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 11, fill: '#424242'}} axisLine={false} tickLine={false} />
                 <Tooltip cursor={{fill: 'transparent'}} />
                 <Bar dataKey="count" fill="#1976D2" radius={[0, 4, 4, 0]} barSize={20} />
               </BarChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-bold text-gray-900">Usage by Practice Area</CardTitle>
            <Button variant="link" className="h-auto p-0 text-xs text-blue-600">View detailed breakdown</Button>
          </CardHeader>
          <CardContent className="flex-1 min-h-[250px] flex items-center justify-center">
            <div className="w-1/2 h-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={PRACTICE_AREA_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {PRACTICE_AREA_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-2 pl-4">
               {PRACTICE_AREA_DATA.map((item, i) => (
                 <div key={i} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                   <span className="text-xs text-gray-600">{item.name} ({item.value}%)</span>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Query Log Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <CardTitle className="text-base font-bold text-gray-900">Query Log</CardTitle>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search queries..." 
                  className="pl-9 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="bg-white text-blue-600 border-gray-200">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Query</TableHead>
                <TableHead>Practice Area</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {QUERY_LOGS.map((log) => (
                <TableRow key={log.id} className="hover:bg-gray-50 cursor-pointer group">
                  <TableCell className="text-muted-foreground whitespace-nowrap">{log.timestamp}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className={cn("text-[10px] font-bold", log.color)}>{log.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={log.query}>{log.query}</TableCell>
                  <TableCell>{log.area}</TableCell>
                  <TableCell>{log.duration}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("border-0 font-medium", log.statusColor)}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-4 border-t bg-gray-50/50 flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing 5 of 1,248 entries</span>
            <div className="flex gap-1">
               <Button variant="outline" size="sm" className="h-7 px-2" disabled>&lt;</Button>
               <Button variant="default" size="sm" className="h-7 px-2 bg-blue-600">1</Button>
               <Button variant="outline" size="sm" className="h-7 px-2">2</Button>
               <Button variant="outline" size="sm" className="h-7 px-2">&gt;</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Performance Table */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <CardTitle className="text-base font-bold text-gray-900">Team Performance</CardTitle>
          <Button variant="link" className="h-auto p-0 text-sm text-blue-600">View detailed report</Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead>Team Member</TableHead>
                <TableHead>Queries</TableHead>
                <TableHead>Avg. Time</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Most Common Area</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TEAM_PERFORMANCE.map((member, i) => (
                <TableRow key={i} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={cn("text-xs font-bold", member.color)}>{member.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.queries}</TableCell>
                  <TableCell>{member.avgTime}</TableCell>
                  <TableCell>{member.successRate}</TableCell>
                  <TableCell>{member.area}</TableCell>
                  <TableCell>
                    <div className="w-16 h-8">
                       <ResponsiveContainer width="100%" height="100%">
                         <LineChart data={QUERY_VOLUME_DATA.slice(0, 5)}>
                           <Line type="monotone" dataKey="queries" stroke="#4CAF50" strokeWidth={2} dot={false} />
                         </LineChart>
                       </ResponsiveContainer>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  )
}
