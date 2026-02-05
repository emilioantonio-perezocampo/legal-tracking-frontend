'use client'

import React, { useState } from 'react'
import { 
  X, 
  Scale, 
  Globe, 
  Folder, 
  BookOpen, 
  Info,
  AlertTriangle
} from 'lucide-react'
import { 
  Dialog, 
  DialogContent, 
  DialogClose, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface CitationHelpModalProps {
  open: boolean
  onClose: (dontShowAgain: boolean) => void
}

export function CitationHelpModal({ open, onClose }: CitationHelpModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false)

  const handleClose = () => {
    onClose(dontShowAgain)
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
      <DialogContent className="max-w-[600px] p-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <DialogTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Understanding AI Source Citations
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 rounded-full hover:bg-gray-200/50">
              <X className="w-4 h-4" />
            </Button>
          </DialogClose>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Relevance Scores Section */}
          <div className="space-y-3">
             <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 inline-block">
               <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-2">
                 📊 Relevance Scores
               </h3>
             </div>
             <p className="text-sm text-gray-600 leading-relaxed">
               Each source is assigned a relevance score (0-100%) indicating how closely it matches your query. Scores are based on:
             </p>
             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 ml-1">
               <li className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                 Keyword and semantic matching
               </li>
               <li className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                 Source authority and reliability
               </li>
               <li className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                 Publication recency
               </li>
               <li className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                 Citation frequency
               </li>
             </ul>
          </div>

          <Separator />

          {/* Source Types Section */}
          <div className="space-y-4">
             <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 inline-block">
               <h3 className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center gap-2">
                 📄 Source Types
               </h3>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                 <div className="p-2 bg-blue-100 rounded text-blue-600">
                   <Scale className="w-4 h-4" />
                 </div>
                 <div>
                   <h4 className="text-sm font-semibold text-gray-900">Case Law</h4>
                   <p className="text-xs text-gray-500 mt-1">Court decisions and judicial opinions from federal/state courts</p>
                 </div>
               </div>

               <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                 <div className="p-2 bg-teal-100 rounded text-teal-600">
                   <Globe className="w-4 h-4" />
                 </div>
                 <div>
                   <h4 className="text-sm font-semibold text-gray-900">Statute</h4>
                   <p className="text-xs text-gray-500 mt-1">Laws, regulations, statutes, and administrative codes</p>
                 </div>
               </div>

               <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                 <div className="p-2 bg-orange-100 rounded text-orange-600">
                   <Folder className="w-4 h-4" />
                 </div>
                 <div>
                   <h4 className="text-sm font-semibold text-gray-900">Internal</h4>
                   <p className="text-xs text-gray-500 mt-1">Firm documents, templates, and knowledge base</p>
                 </div>
               </div>

               <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                 <div className="p-2 bg-pink-100 rounded text-pink-600">
                   <BookOpen className="w-4 h-4" />
                 </div>
                 <div>
                   <h4 className="text-sm font-semibold text-gray-900">Journal</h4>
                   <p className="text-xs text-gray-500 mt-1">Academic articles, law reviews, and legal commentary</p>
                 </div>
               </div>
             </div>
          </div>

          <Separator />

          {/* Disclaimer Section */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-yellow-800">Important Disclaimer</h4>
              <p className="text-sm text-yellow-800/90 leading-relaxed">
                AI-generated citations should always be verified before use in legal documents or court filings. While we strive for accuracy, please confirm all citations independently.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <Button variant="link" className="text-blue-600 h-auto p-0">
            View Full Documentation
          </Button>
          <Button onClick={handleClose}>
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}