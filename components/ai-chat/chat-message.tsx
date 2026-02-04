'use client'

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Message } from "@/stores/ai-chat-store"

export function ChatMessage({ message }: { message: Message }) {
  const isAI = message.role === 'assistant'

  return (
    <div className={cn("flex gap-4", !isAI && "flex-row-reverse")}>
      <Avatar className="h-8 w-8 shrink-0">
        {isAI ? (
          <AvatarFallback className="bg-blue-600 text-white font-bold text-xs">AI</AvatarFallback>
        ) : (
           <AvatarFallback className="bg-gray-200 text-gray-600 font-bold text-xs">JL</AvatarFallback>
        )}
      </Avatar>
      
      <div className={cn(
        "rounded-2xl p-4 max-w-[85%] text-sm leading-relaxed shadow-sm",
        isAI 
          ? "bg-gray-50 rounded-tl-none border border-gray-100 text-gray-800" 
          : "bg-blue-600 rounded-tr-none text-white"
      )}>
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div className={cn("text-[10px] mt-2 text-right", isAI ? "text-gray-400" : "text-blue-100")}>
          {message.timestamp}
        </div>
      </div>
    </div>
  )
}
