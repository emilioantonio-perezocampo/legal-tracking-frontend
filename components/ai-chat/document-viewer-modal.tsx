'use client'

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Printer, 
  FileText
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogClose, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DocumentViewerModalProps {
  document: any; // Using any for flexibility with SourceDocument type
  open: boolean;
  onClose: () => void;
}

export function DocumentViewerModal({ document, open, onClose }: DocumentViewerModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(47); // Mock total pages

  // Reset page when document changes
  useEffect(() => {
    if (open) setCurrentPage(1);
  }, [open, document]);

  if (!document) return null;

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-[95vw] h-[95vh] flex flex-col p-0 gap-0 sm:max-w-[1000px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shrink-0">
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-lg font-semibold text-gray-900 leading-none flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              {document.title}
            </DialogTitle>
            <p className="text-sm text-gray-500 font-medium">
              {document.citation} • {document.sourceType === 'case_law' ? 'Supreme Court of the United States' : 'Legal Source'}
            </p>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </DialogClose>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden bg-gray-100 relative">
          {/* Document Page View */}
          <div className="flex-1 flex justify-center p-8 overflow-y-auto">
            <div className="bg-white shadow-lg w-full max-w-[800px] min-h-[1000px] p-12 text-gray-900 font-serif leading-relaxed relative">
               {/* Page Number Indicator on Paper */}
               <div className="absolute top-8 right-8 text-gray-400 font-sans text-xs">
                 Page {currentPage}
               </div>

               {/* Mock Content based on ASCII Art */}
               <div className="text-center mb-12 space-y-4 text-black">
                 <div className="text-sm font-bold tracking-widest uppercase border-b border-gray-900 pb-2 inline-block">
                   Supreme Court of the United States
                 </div>
                 <div className="font-bold">No. 16-402</div>
                 <div className="font-bold text-xl my-4">
                   TIMOTHY IVORY CARPENTER, PETITIONER v. UNITED STATES
                 </div>
                 <div className="text-sm font-medium uppercase text-gray-600">
                   On Writ of Certiorari to the United States<br/>
                   Court of Appeals for the Sixth Circuit
                 </div>
                 <div className="text-sm italic mt-4">[June 22, 2018]</div>
               </div>

               <div className="space-y-6 text-justify text-black">
                 <p className="first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                   <span className="font-bold font-sans uppercase text-sm tracking-wide mr-2">Chief Justice Roberts</span> 
                   delivered the opinion of the Court.
                 </p>
                 
                 <p>
                   This case presents the question whether the Government conducts a search under the Fourth Amendment when it accesses historical cell phone records that provide a comprehensive chronicle of the user's past movements.
                 </p>

                 <div className="text-center font-bold my-4 uppercase">I</div>

                 <p>
                   There are 396 million cell phone service accounts in the United States—for a Nation of 326 million people. Cell phones perform their wide and growing variety of functions by connecting to a set of radio antennas called "cell sites." Although cell sites are usually mounted on a tower, they can also be found on light posts, flagpoles, church steeples, or the sides of buildings.
                 </p>
                 
                 <p>
                   Each time a phone connects to a cell site, it generates a time-stamped record known as cell-site location information (CSLI). The precision of this information depends on the size of the geographic area covered by the cell site. The greater the concentration of cell sites, the smaller the coverage area.
                 </p>
                 
                 <p>
                   {document.excerpt && (
                     <span className="bg-yellow-100 px-1 rounded ring-2 ring-yellow-100/50">
                       {document.excerpt}
                     </span>
                   )}
                   {" "}In the instant case, the Government obtained 12,898 location points cataloging Carpenter's movements over 127 days—an average of 101 data points per day.
                 </p>
               </div>
            </div>
          </div>

          {/* Side Thumbnails (Visual only) */}
          <div className="hidden lg:block w-32 border-l border-gray-200 bg-gray-50 p-4 overflow-y-auto">
             <div className="space-y-3">
               {[1, 2, 3, 4, 5].map(page => (
                 <div 
                   key={page}
                   className={`aspect-[3/4] bg-white border cursor-pointer hover:border-blue-500 transition-colors shadow-sm flex items-center justify-center text-xs text-gray-400 ${page === currentPage ? 'ring-2 ring-blue-500 border-transparent' : 'border-gray-200'}`}
                   onClick={() => setCurrentPage(page)}
                 >
                   {page}
                 </div>
               ))}
               <div className="text-center text-xs text-gray-400 font-sans">...</div>
             </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="h-16 border-t border-gray-200 bg-white px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 w-1/3">
             <div className="relative w-full max-w-[240px]">
               <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
               <Input className="h-9 pl-8 text-sm" placeholder="Find in document..." />
             </div>
          </div>

          <div className="flex items-center gap-4 w-1/3 justify-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(c => Math.max(1, c - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-gray-600 min-w-[80px] text-center">
              Page {currentPage} of {totalPages}
            </span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 w-1/3 justify-end">
             <Button variant="ghost" size="sm" className="text-gray-600">
               <Download className="w-4 h-4 mr-2" />
               Download
             </Button>
             <Button variant="ghost" size="sm" className="text-gray-600">
               <Printer className="w-4 h-4 mr-2" />
               Print
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}