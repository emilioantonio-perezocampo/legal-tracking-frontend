import { Header } from "@/components/layout/header"
import { ContextSidebar } from "@/components/layout/context-sidebar"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"
import { Footer } from "@/components/layout/footer"
import { AddToCaseModal } from "@/components/modals/add-to-case-modal"
import { DraftDocumentModal } from "@/components/modals/draft-document-modal"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]">
        <ContextSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto pb-6 h-full">
            {children}
          </div>
        </main>
      </div>
      <MobileSidebar />
      <AddToCaseModal />
      <DraftDocumentModal />
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  )
}