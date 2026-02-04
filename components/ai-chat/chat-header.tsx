'use client'

import { Button } from "@/components/ui/button"
import { Plus, Paperclip, FileText, LayoutTemplate } from "lucide-react"
import { useAIChatStore } from "@/stores/ai-chat-store"
import { toast } from "sonner"

export function AIChatHeader() {
  const { clearMessages } = useAIChatStore()

  const handleNewChat = () => {
    clearMessages()
    toast.info("New conversation started")
  }

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold text-gray-900">Legal Assistant</h2>
        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Online</span>
      </div>
      <div className="flex items-center gap-2">
         <Button variant="ghost" size="sm" onClick={() => toast.info("Attach Context")}>
           <Paperclip className="h-4 w-4 mr-2" />
           Context
         </Button>
         <Button variant="ghost" size="sm" onClick={() => toast.info("Upload Document")}>
           <FileText className="h-4 w-4 mr-2" />
           Upload
         </Button>
         <Button variant="ghost" size="sm" onClick={() => toast.info("Use Template")}>
           <LayoutTemplate className="h-4 w-4 mr-2" />
           Template
         </Button>
         <Button size="sm" onClick={handleNewChat}>
           <Plus className="h-4 w-4 mr-2" />
           New Chat
         </Button>
      </div>
    </div>
  )
}
