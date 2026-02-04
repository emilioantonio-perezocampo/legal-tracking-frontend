'use client'

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { sendChatMessage } from "@/lib/api/ai-chat"
import { useAIChatStore } from "@/stores/ai-chat-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2 } from "lucide-react"

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
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white relative">
      <div className="relative">
        <Input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a legal question..." 
          className="pr-12 py-6 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-blue-100"
          disabled={mutation.isPending}
        />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-2 top-1.5 h-9 w-9 bg-blue-600 hover:bg-blue-700 rounded-lg"
          disabled={!input.trim() || mutation.isPending}
        >
          {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
      <div className="mt-2 text-[10px] text-center text-gray-400">
         AI responses should be verified by a qualified attorney.
      </div>
    </form>
  )
}
