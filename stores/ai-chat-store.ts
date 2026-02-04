import { create } from 'zustand'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: React.ReactNode | string
  timestamp: string
}

interface AIChatStore {
  messages: Message[]
  isProcessing: boolean
  processingAction: string | null
  addMessage: (msg: Message) => void
  clearMessages: () => void
  setProcessingAction: (action: string | null) => void
  setIsProcessing: (isProcessing: boolean) => void
}

export const useAIChatStore = create<AIChatStore>((set) => ({
  messages: [],
  isProcessing: false,
  processingAction: null,
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
  setProcessingAction: (action) => set({ processingAction: action }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
}))
