'use client'

import { useState } from "react"
import { 
  Plus, Settings, MessageSquare, Folder, FileText, Clipboard, Clock, Pin, Bot
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAIChatStore } from "@/stores/ai-chat-store"
import { toast } from "sonner"
import { SettingsPanel } from "./settings-panel"
import { TemplatePanel } from "./template-panel"
import { AIHistoryPanel } from "./history-panel"
import { AISavedQueriesPanel } from "./saved-queries-panel"
import { AIUploadModal } from "./upload-modal"
import { AddToCaseModal } from "@/components/modals/add-to-case-modal"
import { useModalStore } from "@/stores/modal-store"

interface AIChatHeaderProps {
  onNewConversation?: () => void
  onAttachCaseContext?: () => void
  onUploadDocument?: () => void
  onUseTemplate?: () => void
}

export function AIChatHeader({ 
  onNewConversation, 
  onAttachCaseContext, 
  onUploadDocument, 
  onUseTemplate 
}: AIChatHeaderProps) {
  const { clearMessages, messages } = useAIChatStore()
  const { openAddToCase } = useModalStore()
  
  // Panel States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [showTemplatePanel, setShowTemplatePanel] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isSavedQueriesOpen, setIsSavedQueriesOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  
  // Dialog States
  const [showNewConvDialog, setShowNewConvDialog] = useState(false)

  // Handlers
  const handleNewConversationClick = () => {
    if (messages.length > 0) {
      setShowNewConvDialog(true)
    } else {
      handleStartNewConversation()
    }
  }

  const handleStartNewConversation = () => {
    clearMessages()
    if (onNewConversation) onNewConversation()
    setShowNewConvDialog(false)
    toast.success("New conversation started")
  }

  return (
    <>
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm md:text-base">Asistente Juridico Virtual</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
              <span>Online • Trained on legal data through 2023</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Plus Icon with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50">
                <Plus className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleNewConversationClick} className="gap-3 py-2.5 cursor-pointer">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <span>New Conversation</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => openAddToCase()} className="gap-3 py-2.5 cursor-pointer">
                <Folder className="w-4 h-4 text-gray-500" />
                <span>Attach Case Context</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsUploadModalOpen(true)} className="gap-3 py-2.5 cursor-pointer">
                <FileText className="w-4 h-4 text-gray-500" />
                <span>Upload Document</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowTemplatePanel(!showTemplatePanel)} className="gap-3 py-2.5 cursor-pointer">
                <Clipboard className="w-4 h-4 text-gray-500" />
                <span>Use Template Query</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsHistoryOpen(true)} className="gap-3 py-2.5 cursor-pointer">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>View History</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsSavedQueriesOpen(true)} className="gap-3 py-2.5 cursor-pointer">
                <Pin className="w-4 h-4 text-gray-500" />
                <span>Saved Queries</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings Icon */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            className={`rounded-full transition-all ${isSettingsOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
          >
            <Settings className={`w-5 h-5 transition-transform duration-300 ${!isSettingsOpen && 'group-hover:rotate-12'}`} />
          </Button>
        </div>
      </div>

      {/* --- External Components --- */}
      
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      
      <TemplatePanel 
        isOpen={showTemplatePanel} 
        onClose={() => setShowTemplatePanel(false)} 
        onUseTemplate={() => {
          if (onUseTemplate) onUseTemplate()
          toast.success("Template applied to input")
        }} 
      />

      <AIHistoryPanel 
        open={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        onContinue={(id) => {
          setIsHistoryOpen(false)
          toast.info(`Continuing conversation ${id}`)
        }}
      />

      <AISavedQueriesPanel 
        open={isSavedQueriesOpen} 
        onClose={() => setIsSavedQueriesOpen(false)} 
        onUseQuery={(text) => {
          setIsSavedQueriesOpen(false)
          toast.success("Query applied to input")
        }} 
      />

      <AIUploadModal 
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
        onUpload={(files) => {
          if (onUploadDocument) onUploadDocument()
          toast.success("Documents attached to conversation")
        }}
      />

      {/* New Conversation Confirmation Dialog */}
      <Dialog open={showNewConvDialog} onOpenChange={setShowNewConvDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Start New Conversation?</DialogTitle>
          </DialogHeader>
          
          <div className="py-2 space-y-4">
            <div className="flex items-start gap-3 text-sm text-gray-600">
               <MessageSquare className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
               <p>Your current conversation will be automatically saved to your history.</p>
            </div>
            
            <div className="bg-gray-50 rounded-md p-3 text-sm space-y-1">
               <div className="flex justify-between">
                 <span className="text-gray-500">Current conversation:</span>
                 <span className="font-medium text-gray-900">{messages.length} messages</span>
               </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowNewConvDialog(false)}>Cancel</Button>
            <Button onClick={handleStartNewConversation} className="bg-blue-600 hover:bg-blue-700">Start New Conversation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}