'use client'

import { useEffect, useRef } from "react"
import { AIChatHeader } from "./chat-header"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { useAIChatStore } from "@/stores/ai-chat-store"
import { Loader2 } from "lucide-react"

export function ChatContainer() {
  const { messages, isProcessing } = useAIChatStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isProcessing])

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <AIChatHeader />
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex gap-4">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
               <span className="font-bold text-xs">AI</span>
             </div>
             <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 max-w-[85%] text-sm text-gray-800 leading-relaxed shadow-sm border border-gray-100">
               <p>Hello. I'm ready to assist with your legal tasks.</p>
               <p className="mt-2">I can help you review regulations, draft documents, or analyze case files.</p>
             </div>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isProcessing && (
          <div className="flex gap-4 animate-pulse">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
               <span className="font-bold text-xs">AI</span>
             </div>
             <div className="flex items-center gap-2 text-sm text-gray-500 italic">
               <Loader2 className="h-4 w-4 animate-spin" />
               <span>Processing request...</span>
             </div>
          </div>
        )}
      </div>

      <ChatInput />
    </div>
  )
}
