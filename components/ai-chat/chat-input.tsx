'use client'

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { sendChatMessage } from "@/lib/api/ai-chat"
import { useAIChatStore } from "@/stores/ai-chat-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2, Plus } from "lucide-react"
import { toast } from "sonner"

export function ChatInput() {
  const [input, setInput] = useState("")
  const { addMessage, setIsProcessing } = useAIChatStore()

  const mutation = useMutation({
    mutationFn: sendChatMessage,
    onMutate: () => setIsProcessing(true),
    onSuccess: (data) => {
      addMessage(data)
      setIsProcessing(false)
    },
    onError: () => setIsProcessing(false)
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    addMessage(userMsg)
    mutation.mutate(input)
    setInput("")
  }

  return (
    <div className="border-t bg-white">
      {/* Quick Actions Bar */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide border-b border-gray-50 bg-gray-50/30">
        {[
          { label: 'Summarize', action: 'summarize' },
          { label: 'Simplify', action: 'simplify' },
          { label: 'Elaborate', action: 'elaborate' },
          { label: 'Find precedents', action: 'precedents' },
          { label: 'Draft document', action: 'draft' },
        ].map((item) => (
          <Button
            key={item.action}
            variant="outline"
            size="sm"
            className="h-7 px-3 text-[11px] font-medium bg-white text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-xs"
            onClick={() => toast.info(`Running ${item.label}...`)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 relative">
        <div className="relative">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a legal question..." 
            className="pr-12 py-6 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-blue-100"
            disabled={mutation.isPending}
          />
          <div className="absolute right-2 top-1.5 flex items-center gap-1">
             <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-gray-600">
                <Plus className="h-4 w-4" />
             </Button>
             <Button 
              type="submit" 
              size="icon" 
              className="h-9 w-9 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
              disabled={!input.trim() || mutation.isPending}
            >
              {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="mt-2 text-[10px] text-center text-gray-400">
           AI responses should be verified by a qualified attorney.
        </div>
      </form>
    </div>
  )
}
