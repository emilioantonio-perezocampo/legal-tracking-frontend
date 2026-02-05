'use client'

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileText, FileCheck, FileSignature, ShieldAlert, BookOpen } from 'lucide-react';
import { useModalStore } from "@/stores/modal-store";

export type DocumentType = 
  | 'Client Memo' 
  | 'Legal Opinion Letter' 
  | 'Internal Research Memo' 
  | 'Compliance Checklist' 
  | 'Contract Amendment' 
  | 'Policy Document';

const DOCUMENT_TYPES: { type: DocumentType; description: string; icon: React.ElementType }[] = [
  { 
    type: 'Client Memo', 
    description: 'Summarize findings and recommendations for client',
    icon: FileText
  },
  { 
    type: 'Legal Opinion Letter', 
    description: 'Formal legal opinion with analysis and conclusions',
    icon: FileSignature
  },
  { 
    type: 'Internal Research Memo', 
    description: 'Detailed research summary for internal use',
    icon: BookOpen
  },
  { 
    type: 'Compliance Checklist', 
    description: 'Action items and compliance requirements',
    icon: FileCheck
  },
  { 
    type: 'Contract Amendment', 
    description: 'Draft amendments based on legal requirements',
    icon: FileText
  },
  { 
    type: 'Policy Document', 
    description: 'Draft or update company policies',
    icon: ShieldAlert
  },
];

export function DraftDocumentModal() {
  const { draftModalOpen, closeDraftModal } = useModalStore();
  const [selectedType, setSelectedType] = useState<DocumentType>('Client Memo');

  const handleDraft = () => {
    // In a real app, this would trigger the AI generation with the selected type
    console.log(`Drafting ${selectedType}...`);
    closeDraftModal();
  };

  return (
    <Dialog open={draftModalOpen} onOpenChange={closeDraftModal}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Draft Document</DialogTitle>
          <DialogDescription>
            Select the type of document you want to generate based on the analysis.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup value={selectedType} onValueChange={(val) => setSelectedType(val as DocumentType)} className="grid gap-3">
            {DOCUMENT_TYPES.map((item) => (
              <Label
                key={item.type}
                htmlFor={item.type}
                className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all hover:bg-gray-50 ${
                  selectedType === item.type 
                    ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50/50' 
                    : 'border-gray-200'
                }`}
              >
                <RadioGroupItem value={item.type} id={item.type} className="mt-1" />
                <div className="flex-1 grid gap-1">
                  <div className="flex items-center gap-2 font-medium text-gray-900">
                    <item.icon className="w-4 h-4 text-blue-600" />
                    {item.type}
                  </div>
                  <p className="text-sm text-gray-500 font-normal">
                    {item.description}
                  </p>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={closeDraftModal}>Cancel</Button>
          <Button onClick={handleDraft} className="bg-blue-600 hover:bg-blue-700 text-white">
            Generate Draft
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}