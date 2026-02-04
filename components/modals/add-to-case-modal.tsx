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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddToCaseModal() {
  const { addToCaseOpen, closeAddToCase } = useModalStore()

  return (
    <Dialog open={addToCaseOpen} onOpenChange={closeAddToCase}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Case</DialogTitle>
          <DialogDescription>
            Attach this conversation or document to an existing legal matter.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
             <Label htmlFor="case-search">Search Cases</Label>
             <Input id="case-search" placeholder="Enter case name or number..." />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={closeAddToCase}>Cancel</Button>
            <Button onClick={closeAddToCase}>Attach</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
