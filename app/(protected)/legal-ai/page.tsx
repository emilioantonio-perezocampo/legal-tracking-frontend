import { ChatContainer } from "@/components/ai-chat/chat-container"
import { QuickSettings } from "@/components/ai-chat/quick-settings"
import { SourcesPanel } from "@/components/ai-chat/sources-panel"

export default function LegalAIPage() {
  return (
    <div className="flex gap-6 h-full">
      {/* Main Chat Area */}
      <div className="flex-1 min-w-0">
        <ChatContainer />
      </div>

      {/* Right Sidebar (Settings & Sources) */}
      <div className="w-80 hidden xl:flex flex-col gap-6">
        <QuickSettings />
        <SourcesPanel />
      </div>
    </div>
  )
}
