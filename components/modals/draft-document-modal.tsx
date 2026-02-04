'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useModalStore } from "@/stores/modal-store"
import { Button } from "@/components/ui/button"

export function DraftDocumentModal() {
  const { draftModalOpen, closeDraftModal } = useModalStore()

  return (
    <Dialog open={draftModalOpen} onOpenChange={closeDraftModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Draft New Document</DialogTitle>
          <DialogDescription>
            Choose a template to start drafting based on the current context.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
           {['Client Memo', 'Legal Brief', 'Contract', 'Email Update'].map((type) => (
             <Button key={type} variant="outline" className="h-20 flex flex-col gap-1" onClick={closeDraftModal}>
               <span className="font-semibold">{type}</span>
             </Button>
           ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
