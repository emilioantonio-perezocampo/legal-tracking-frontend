'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  User as UserIcon, 
  Settings, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  className?: string;
  image?: string;
  name?: string;
  role?: string;
}

export function UserAvatarWithDropdown({ className, image, name, role }: UserAvatarProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const initials = name 
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : "JL";

  const email = name 
    ? name.toLowerCase().replace(/\s+/g, '.') + '@firm.com' 
    : 'john.law@firm.com';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="group flex items-center gap-3 cursor-pointer focus:outline-none p-1 rounded-md hover:bg-gray-100/50 transition-colors"
          aria-label="User menu"
        >
          <Avatar className={cn("h-8 w-8 shrink-0 border border-gray-200 shadow-sm", className)}>
            <AvatarImage src={image} alt={name || "User"} />
            <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="hidden md:flex flex-col items-start text-left">
            <span className="text-sm font-semibold text-gray-900 leading-none">
              {name || "John Law"}
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">
              {role || "Partner"}
            </span>
          </div>
          
          <ChevronDown className="hidden md:block w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64 p-1 shadow-xl border-gray-100">
        <DropdownMenuLabel className="font-normal px-3 py-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold text-gray-900 leading-none">{name || "John Law"}</p>
            <p className="text-xs text-muted-foreground truncate font-medium">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-gray-100" />
        
        <div className="py-1">
          <DropdownMenuItem className="gap-3 py-2.5 cursor-pointer">
            <UserIcon className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-700">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-3 py-2.5 cursor-pointer">
            <Settings className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-700">Settings</span>
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator className="bg-gray-100" />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="gap-3 py-2.5 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-bold">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
