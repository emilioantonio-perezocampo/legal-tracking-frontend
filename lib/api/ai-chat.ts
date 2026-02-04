import { apiFetch } from "@/lib/api/client"

export interface ChatResponse {
  id: string
  content: string
  role: 'assistant'
  timestamp: string
}

export async function sendChatMessage(message: string, context?: any) {
  // In a real app, this would be a POST request
  // return apiFetch('/ai/chat', {
  //   method: 'POST',
  //   body: JSON.stringify({ message, context }),
  // })

  // Mock response for now
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: "I've analyzed your request. Based on the current legal context...",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } as ChatResponse
}

export async function runQuickAction(action: 'summarize' | 'simplify' | 'elaborate' | 'precedents', conversationId: string) {
  // return apiFetch('/ai/action', {
  //   method: 'POST',
  //   body: JSON.stringify({ action, conversationId }),
  // })
  
  await new Promise(resolve => setTimeout(resolve, 1500))
  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: `Here is the ${action} you requested...`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } as ChatResponse
}
