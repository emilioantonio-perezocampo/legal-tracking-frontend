'use client'

import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Edit2, Key, Trash2, 
  ChevronDown, Shield, Users, 
  Database, FileText, 
  Lock, Globe, Book, Server, CheckCircle, AlertTriangle
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// --- Types ---

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending';
  lastLogin: string;
  initials: string;
  color: string;
}

// --- Mock Data ---

const MOCK_USERS: User[] = [
  { id: '#UM1001', name: 'John Lawson', email: 'john.lawson@asistentejuridico.com', role: 'Administrator', status: 'Active', lastLogin: 'Today, 9:42 AM', initials: 'JL', color: 'bg-blue-100 text-blue-700' },
  { id: '#UM1002', name: 'David Chen', email: 'david.chen@asistentejuridico.com', role: 'Partner', status: 'Active', lastLogin: 'Today, 11:15 AM', initials: 'DC', color: 'bg-teal-100 text-teal-700' },
  { id: '#UM1003', name: 'Sarah Johnson', email: 'sarah.johnson@asistentejuridico.com', role: 'Associate', status: 'Active', lastLogin: 'Today, 10:30 AM', initials: 'SJ', color: 'bg-blue-100 text-blue-700' },
  { id: '#UM1004', name: 'Michael Rodriguez', email: 'michael.rodriguez@asistentejuridico.com', role: 'Associate', status: 'Active', lastLogin: 'Yesterday, 5:15 PM', initials: 'MR', color: 'bg-blue-100 text-blue-700' },
  { id: '#UM1005', name: 'Emily Williams', email: 'emily.williams@asistentejuridico.com', role: 'Paralegal', status: 'Active', lastLogin: 'Today, 8:45 AM', initials: 'EW', color: 'bg-purple-100 text-purple-700' },
  { id: '#UM1006', name: 'Jessica Thompson', email: 'jessica.thompson@asistentejuridico.com', role: 'Support Staff', status: 'Pending', lastLogin: 'Never', initials: 'JT', color: 'bg-gray-100 text-gray-700' },
];

// --- Sub-components ---

const UserTable = ({ users }: { users: User[] }) => {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'Administrator': return 'default';
      case 'Partner': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="group cursor-pointer">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={user.color}>{user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-[10px] text-muted-foreground">{user.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm">{user.email}</TableCell>
              <TableCell>
                <Badge variant={getRoleBadgeVariant(user.role) as any} className="font-normal">
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === 'Active' ? 'default' : 'outline'} className={user.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Key className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="px-4 py-3 border-t bg-gray-50/50 flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing 1-{users.length} of 24 users</span>
        <div className="flex gap-1">
           <Button variant="outline" size="sm" className="h-7 px-2" disabled>&lt;</Button>
           <Button variant="default" size="sm" className="h-7 px-2 bg-blue-600">1</Button>
           <Button variant="outline" size="sm" className="h-7 px-2">2</Button>
           <Button variant="outline" size="sm" className="h-7 px-2">&gt;</Button>
        </div>
      </div>
    </div>
  );
};

export function AdminUserManagementView() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage users, roles, and permissions for the system.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 mb-6">
          <TabsTrigger value="users" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent pb-3 px-6">Users & Permissions</TabsTrigger>
          <TabsTrigger value="roles" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent pb-3 px-6">Roles</TabsTrigger>
          <TabsTrigger value="teams" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent pb-3 px-6">Teams</TabsTrigger>
          <TabsTrigger value="logs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent pb-3 px-6">Access Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-9 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all-roles">
                <SelectTrigger className="w-[140px] bg-white">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-roles">All Roles</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-status">
                <SelectTrigger className="w-[140px] bg-white">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="bg-white"><Filter className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* User Table */}
          <UserTable users={MOCK_USERS} />

          {/* Management Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Permission Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Administrative', desc: 'Full system access' },
                  { name: 'Legal Team', desc: 'Case and document access' },
                  { name: 'Support', desc: 'Limited access' },
                  { name: 'Read-Only', desc: 'View-only access' },
                ].map((group, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium">{group.name}</div>
                      <div className="text-xs text-muted-foreground">{group.desc}</div>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-blue-600 text-xs">Edit</Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2 text-muted-foreground border-dashed">
                  + Add Permission Group
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Role-Based Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Administrator', count: '3 users' },
                  { name: 'Partner', count: '5 users' },
                  { name: 'Associate', count: '8 users' },
                  { name: 'Paralegal', count: '4 users' },
                  { name: 'Support Staff', count: '4 users' },
                ].map((role, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">{role.name}</div>
                      <div className="text-xs text-muted-foreground">{role.count}</div>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-blue-600 text-xs">Manage</Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2 text-muted-foreground border-dashed">
                  + Add Role
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Authentication Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium">Multi-Factor Authentication</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Require MFA for all users</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                {[
                  { name: 'Password Policy', desc: '12 character minimum' },
                  { name: 'Session Timeout', desc: '30 minutes of inactivity' },
                  { name: 'Login Attempts', desc: '5 failed attempts' },
                ].map((setting, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium">{setting.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{setting.desc}</div>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-blue-600 text-xs">Configure</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-base">RAG Data Sources</CardTitle>
                <Button variant="link" className="h-auto p-0 text-blue-600 text-sm font-medium">+ Add Source</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Internal Case Database', desc: "Firm's proprietary case database", icon: Database, color: 'bg-blue-100 text-blue-600', status: 'Active', details: 'Last indexed: 2h ago' },
                  { name: 'LexisNexis Integration', desc: "Legal research database via API", icon: Globe, color: 'bg-red-100 text-red-600', status: 'Active', details: 'Status: Operational' },
                  { name: 'Document Management', desc: "Firm's DMS for client filings", icon: Server, color: 'bg-yellow-100 text-yellow-600', status: 'Active', details: 'Last indexed: 8h ago' },
                ].map((source, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-lg border border-transparent hover:border-gray-100 hover:bg-gray-50/50 transition-all cursor-pointer">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${source.color}`}>
                      <source.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="font-medium text-sm">{source.name}</div>
                        <Badge variant="outline" className="text-[10px] h-4 bg-green-50 text-green-700 border-green-200">{source.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{source.desc}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 font-medium">{source.details}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Privacy & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Data Retention</h4>
                  <div className="space-y-3">
                    {['AI Query History', 'User Activity Logs'].map((policy) => (
                      <div key={policy} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{policy}</span>
                        <Select defaultValue="90d">
                          <SelectTrigger className="h-8 w-28 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="90d">90 Days</SelectItem>
                            <SelectItem value="1y">1 Year</SelectItem>
                            <SelectItem value="inf">Indefinite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Security Controls</h4>
                  <div className="space-y-3">
                    {['Data Encryption', 'IP Restrictions'].map((control) => (
                      <div key={control} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{control}</span>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2">
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
