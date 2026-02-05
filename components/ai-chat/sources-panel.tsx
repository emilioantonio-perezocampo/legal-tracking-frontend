'use client'

import React, { useState } from 'react';
import {
  Scale,
  Globe,
  Folder,
  FileText,
  ChevronRight,
  Search,
  Copy,
  Download,
  Check,
  CircleHelp,
  Loader2
} from 'lucide-react';
import { toast } from "sonner";
import { DocumentViewerModal } from './document-viewer-modal';
import { CitationHelpModal } from './citation-help-modal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Types ---

type SourceType = 'case_law' | 'regulation' | 'internal' | 'journal';

interface SourceDocument {
  id: string;
  title: string;
  citation?: string;
  description: string;
  relevanceScore: number;
  excerpt?: string;
  sourceType: SourceType;
  fullText?: string;
  date?: string;
}

interface RAGSource {
  id: string;
  name: string;
  icon: React.ElementType;
  iconColor: string;
  documentCount: number;
  documents: SourceDocument[];
}

// --- Mock Data ---

const SAMPLE_SOURCES: RAGSource[] = [
  {
    id: 'supreme_court',
    name: 'Supreme Court Decisions Database',
    icon: Scale,
    iconColor: 'text-blue-600',
    documentCount: 5,
    documents: [
      {
        id: '1',
        title: 'Carpenter v. United States',
        citation: '585 U.S. ___ (2018)',
        description: 'Fourth Amendment, digital privacy, cell-site location',
        relevanceScore: 94,
        sourceType: 'case_law',
        date: '2018',
        excerpt: "We decline to grant the state unrestricted access to a wireless carrier's database of physical location information. In light of the deeply revealing nature of CSLI, its depth, breadth, and comprehensive reach, and the inescapable and automatic nature of its collection, the fact that such information is gathered by a third party does not make it any less deserving of Fourth Amendment protection."
      },
      {
        id: '2',
        title: 'Riley v. California',
        citation: '573 U.S. 373 (2014)',
        description: 'Warrantless cell phone searches, privacy expectations',
        relevanceScore: 91,
        sourceType: 'case_law',
        date: '2014',
        excerpt: "Modern cell phones are not just another technological convenience. With all they contain and all they may reveal, they hold for many Americans 'the privacies of life'. The fact that technology now allows an individual to carry such information in his hand does not make the information any less worthy of the protection for which the Founders fought."
      },
      {
        id: '3',
        title: 'United States v. Jones',
        citation: '565 U.S. 400 (2012)',
        description: 'GPS tracking, Fourth Amendment protections',
        relevanceScore: 88,
        sourceType: 'case_law',
        date: '2012',
        excerpt: "The Government's physical intrusion on an 'effect' for the purpose of obtaining information constitutes a 'search'. This type of encroachment on areas normally considered private via GPS tracking falls squarely within Fourth Amendment protections."
      },
      {
        id: '4',
        title: 'Kyllo v. United States',
        citation: '533 U.S. 27 (2001)',
        description: 'Thermal imaging, reasonable expectation of privacy',
        relevanceScore: 82,
        sourceType: 'case_law',
        date: '2001',
        excerpt: "Where the Government uses a device that is not in general public use, to explore details of the home that would previously have been unknowable without physical intrusion, the surveillance is a 'search' and is presumptively unreasonable without a warrant."
      },
      {
        id: '5',
        title: 'Katz v. United States',
        citation: '389 U.S. 347 (1967)',
        description: 'Privacy expectations, electronic surveillance',
        relevanceScore: 78,
        sourceType: 'case_law',
        date: '1967',
        excerpt: "The Fourth Amendment protects people, not places. What a person knowingly exposes to the public, even in his own home or office, is not a subject of Fourth Amendment protection. But what he seeks to preserve as private, even in an area accessible to the public, may be constitutionally protected."
      }
    ],
  },
  {
    id: 'federal_reg',
    name: 'Federal Regulatory Framework',
    icon: Globe,
    iconColor: 'text-teal-600',
    documentCount: 3,
    documents: [
      {
        id: '6',
        title: 'CCPA - California Consumer Privacy Act',
        citation: 'Cal. Civ. Code § 1798',
        description: 'Consumer data rights, business obligations',
        relevanceScore: 89,
        sourceType: 'regulation',
        date: '2018',
        excerpt: "Consumers shall have the right to request that a business that collects a consumer's personal information disclose to that consumer the categories and specific pieces of personal information the business has collected."
      },
      {
        id: '7',
        title: 'GDPR Article 17',
        citation: 'Regulation (EU) 2016/679',
        description: 'Right to Erasure ("Right to be Forgotten")',
        relevanceScore: 85,
        sourceType: 'regulation',
        date: '2016',
        excerpt: "The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay and the controller shall have the obligation to erase personal data without undue delay where one of the following grounds applies..."
      },
      {
        id: '8',
        title: 'FTC Act Section 5',
        citation: '15 U.S.C. § 45',
        description: 'Unfair or Deceptive Acts or Practices',
        relevanceScore: 80,
        sourceType: 'regulation',
        date: '1914',
        excerpt: "Unfair methods of competition in or affecting commerce, and unfair or deceptive acts or practices in or affecting commerce, are hereby declared unlawful."
      }
    ],
  },
  {
    id: 'firm_kb',
    name: "Firm's Privacy Law Knowledge Base",
    icon: Folder,
    iconColor: 'text-orange-600',
    documentCount: 4,
    documents: [
      {
        id: '9',
        title: 'Data Privacy Compliance Checklist (2023)',
        description: 'Internal document • Last updated: March 2023',
        relevanceScore: 87,
        sourceType: 'internal',
        date: '2023-03-15',
        excerpt: "Key Checklist Items: 1. Data Inventory & Mapping 2. Privacy Policy Updates 3. Consumer Request Mechanisms 4. Opt-Out Capabilities for Data Sales 5. Vendor Contract Remediation"
      },
      {
        id: '10',
        title: 'Internal Memo: Cross-State Data Transfers',
        description: 'Analysis of risk factors for multi-state clients',
        relevanceScore: 84,
        sourceType: 'internal',
        date: '2023-01-20',
        excerpt: "Clients operating in both CA and VA need to harmonize their compliance approaches. We recommend adopting the strictest standard (currently CA) across the board to simplify operations."
      },
      {
        id: '11',
        title: 'Client Advisory: Biometric Data',
        description: 'Draft guidance for retail clients',
        relevanceScore: 75,
        sourceType: 'internal',
        date: '2022-11-05',
        excerpt: "The collection of biometric data represents a significant liability risk under BIPA and similar emerging statutes. Explicit written consent is non-negotiable."
      },
      {
        id: '12',
        title: 'Seminar Notes: Future of Privacy Litigation',
        description: 'Partner meeting notes from annual retreat',
        relevanceScore: 70,
        sourceType: 'internal',
        date: '2022-09-12',
        excerpt: "Expect a rise in class actions related to pixel tracking and chat bot interactions. Courts are increasingly skeptical of arbitration clauses in these contexts."
      }
    ],
  },
];

// --- Helper Functions ---

const formatCitation = (doc: SourceDocument): string => {
  if (doc.sourceType === 'case_law' && doc.citation) {
    return `${doc.title}, ${doc.citation}`;
  }
  if (doc.sourceType === 'regulation' && doc.citation) {
    return `${doc.title}, ${doc.citation}`;
  }
  return doc.title;
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for environments where clipboard API is restricted
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      
      // Ensure textarea is not visible but part of DOM
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (fallbackErr) {
      console.error('Fallback copy failed', fallbackErr);
      return false;
    }
  }
};

// --- Components ---

export function AISourcesPanel() {
  const [expandedSources, setExpandedSources] = useState<string[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<SourceDocument | null>(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Interaction States
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isLoadingDocument, setIsLoadingDocument] = useState(false);
  const [copiedCitationId, setCopiedCitationId] = useState<string | null>(null);

  const toggleSource = (id: string) => {
    setExpandedSources(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleDocumentClick = (doc: SourceDocument) => {
    setSelectedDocument(doc);
    setIsPreviewOpen(true);
  };

  const handleViewFullDocument = async () => {
    setIsLoadingDocument(true);
    // Simulate network delay for fetching document
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoadingDocument(false);
    setIsDocumentModalOpen(true);
  };

  const handleCopyCitation = async (doc: SourceDocument) => {
    const citation = formatCitation(doc);
    const success = await copyToClipboard(citation);
    
    if (success) {
      setCopiedCitationId(doc.id);
      toast.success("Citation copied to clipboard", {
        description: citation,
      });
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedCitationId(null), 2000);
    } else {
      toast.error("Failed to copy citation", {
        description: "Please manually copy: " + citation,
      });
    }
  };

  return (
    <>
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">Sources consulted</h4>
          <Button 
            variant="ghost" 
            className="text-xs text-[#0071c5] hover:text-[#0059a0] hover:bg-blue-50 h-auto p-1 font-normal"
            onClick={() => setIsViewAllOpen(true)}
          >
            View all
          </Button>
        </div>
        
        <div className="space-y-2">
          {SAMPLE_SOURCES.map((source) => (
            <div key={source.id} className="bg-white border border-gray-200 rounded-md overflow-hidden transition-all duration-200">
              {/* Source Header Row */}
              <div 
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSource(source.id)}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <source.icon className={`w-4 h-4 shrink-0 ${source.iconColor}`} />
                  <span className="text-sm font-medium text-gray-700 truncate">{source.name}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          {source.documentCount} documents
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{source.documentCount} documents matched your query</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedSources.includes(source.id) ? 'rotate-90' : ''}`} />
                </div>
              </div>

              {/* Expanded Documents List */}
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSources.includes(source.id) ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'}`}>
                <div className="bg-gray-50/50 p-2 space-y-1">
                  {source.documents.map((doc) => (
                    <div 
                      key={doc.id}
                      className="group flex flex-col p-2.5 rounded hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all cursor-pointer"
                      onClick={(e) => {
                        // Prevent opening preview if clicking the action buttons
                        if ((e.target as HTMLElement).closest('button')) return;
                        handleDocumentClick(doc);
                      }}
                    >
                      <div className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                          <div className="min-w-0 flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors truncate">
                              {doc.title}
                            </span>
                            {doc.citation && <span className="text-sm text-gray-500 font-normal whitespace-nowrap hidden sm:inline">{doc.citation}</span>}
                            <Badge 
                              variant="secondary" 
                              className={`h-5 px-1.5 text-[10px] font-medium border ${doc.relevanceScore >= 90 ? 'bg-green-50 text-green-700 border-green-200' : 
                              'bg-blue-50 text-blue-700 border-blue-200'
                              }`}
                            >
                              {doc.relevanceScore}%
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 px-2 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDocumentClick(doc);
                          }}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Modal */}
      <Dialog open={isViewAllOpen} onOpenChange={setIsViewAllOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-0 gap-0">
          <DialogHeader className="px-6 py-4 border-b border-gray-200 shrink-0 bg-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                All Sources <span className="text-gray-500 font-normal">({SAMPLE_SOURCES.reduce((acc, s) => acc + s.documentCount, 0)} documents from {SAMPLE_SOURCES.length} databases)</span>
              </DialogTitle>
            </div>
            {/* Hidden description for accessibility */}
            <DialogDescription className="sr-only">
              Full list of sources consulted for this response.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between gap-4 shrink-0">
            <div className="relative flex-1 max-w-sm group">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input 
                placeholder="Search documents..." 
                className="pl-9 bg-white border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all h-9"
              />
            </div>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[160px] bg-white border-gray-200 h-9">
                <span className="text-gray-500 mr-1 text-sm">Sort:</span>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="flex-1 bg-white">
            <div className="p-6 pt-2 space-y-6">
              {SAMPLE_SOURCES.map((source, index) => (
                <div key={source.id} className="space-y-0">
                  <div className="flex items-center justify-between py-2 mt-4 border-b border-gray-200 first:mt-0 mb-3">
                     <div className="flex items-center gap-2.5 text-[13px] font-semibold text-gray-800 tracking-wide uppercase">
                       <source.icon className={`w-4 h-4 ${source.iconColor}`} />
                       <h3>{source.name}</h3>
                     </div>
                     <span className="text-[13px] text-gray-500 font-normal">{source.documentCount} documents</span>
                  </div>
                  
                  <div className="space-y-2">
                    {source.documents.map(doc => (
                      <div 
                        key={doc.id} 
                        className="group grid grid-cols-[32px_1fr_180px_60px_70px] items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer bg-white"
                        onClick={() => handleDocumentClick(doc)}
                      >
                        {/* Icon Column */}
                        <div className="flex justify-center">
                          <div className="p-1.5 bg-gray-50 rounded text-gray-400 group-hover:text-blue-500 transition-colors">
                            <FileText className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Title Column */}
                        <div className="min-w-0 font-medium text-gray-900 truncate group-hover:text-blue-700 text-sm">
                          {doc.title}
                        </div>

                        {/* Citation Column */}
                        <div className="text-[13px] text-gray-500 truncate">
                          {doc.citation || <span className="text-gray-300 italic">No citation</span>}
                        </div>

                        {/* Badge Column */}
                        <div className="flex justify-center">
                          <div 
                            className={`inline-flex items-center justify-center min-w-[48px] px-2.5 py-1 rounded-xl text-xs font-semibold border ${doc.relevanceScore >= 85 ? 'bg-green-50 text-green-700 border-green-100' : 
                            doc.relevanceScore >= 70 ? 'bg-blue-50 text-blue-700 border-blue-100' :
                            'bg-orange-50 text-orange-700 border-orange-100'
                            }`}
                          >
                            {doc.relevanceScore}%
                          </div>
                        </div>

                        {/* View Button Column */}
                        <div className="flex justify-center">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 px-3.5 bg-white border border-blue-600 text-blue-600 text-[13px] font-medium rounded-md hover:bg-blue-50 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDocumentClick(doc);
                            }}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="sticky bottom-0 bg-gray-50/95 backdrop-blur border-t border-gray-200 p-4 flex justify-between items-center z-10">
             <div className="text-xs text-gray-500">
               Displaying {SAMPLE_SOURCES.reduce((acc, s) => acc + s.documentCount, 0)} documents
             </div>
             <div className="flex gap-3">
               <Button variant="outline" size="sm" onClick={async () => {
                 const allCitations = SAMPLE_SOURCES.flatMap(s => s.documents).map(formatCitation).join('\n');
                 const success = await copyToClipboard(allCitations);
                 if (success) {
                   toast.success("All citations copied to clipboard");
                 } else {
                   toast.error("Failed to copy citations");
                 }
               }}>
                 <Copy className="w-3.5 h-3.5 mr-2" />
                 Copy All Citations
               </Button>
               <Button variant="outline" size="sm">
                 <Download className="w-3.5 h-3.5 mr-2" />
                 Export as PDF
               </Button>
             </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Preview Sheet */}
      <Sheet open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] sm:max-w-none flex flex-col gap-0 p-0">
          {selectedDocument && (
            <>
              <SheetHeader className="px-6 py-6 border-b border-gray-200 bg-gray-50/50">
                <div className="flex items-center gap-2 mb-2">
                   <Badge variant="outline" className="bg-white">
                     {selectedDocument.sourceType === 'case_law' ? 'Case Law' : 
                      selectedDocument.sourceType === 'regulation' ? 'Regulation' : 'Internal Doc'}
                   </Badge>
                   <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
                     {selectedDocument.relevanceScore}% Relevance
                   </Badge>
                </div>
                <SheetTitle className="text-xl leading-snug text-blue-800">
                  {selectedDocument.title}
                </SheetTitle>
                <SheetDescription className="text-gray-600 font-medium">
                  {selectedDocument.citation}
                </SheetDescription>
                <p className="text-sm text-gray-500 mt-2">{selectedDocument.description}</p>
              </SheetHeader>
              
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                      <Search className="w-4 h-4 text-blue-500" />
                      Relevant Excerpt
                    </h3>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-gray-800 leading-relaxed">
                      {selectedDocument.excerpt}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Why this source was cited</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      This source establishes the legal framework for privacy expectations in the digital age, specifically addressing how third-party data collection intersects with Fourth Amendment protections. It is directly relevant to your query regarding cross-state data processing and liability.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Metadata</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="block text-gray-500 text-xs">Date</span>
                        <span className="font-medium text-gray-900">{selectedDocument.date}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500 text-xs">Jurisdiction</span>
                        <span className="font-medium text-gray-900">Federal</span>
                      </div>
                      <div>
                        <span className="block text-gray-500 text-xs">Source Database</span>
                        <span className="font-medium text-gray-900">
                           {SAMPLE_SOURCES.find(s => s.documents.includes(selectedDocument))?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              <div className="p-4 pr-6 border-t border-gray-200 bg-white flex gap-3 shrink-0 items-center">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={handleViewFullDocument}
                  disabled={isLoadingDocument}
                >
                   {isLoadingDocument ? (
                     <>
                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                       Loading...
                     </>
                   ) : (
                     <>
                       <FileText className="w-4 h-4 mr-2" />
                       View Full Document
                     </>
                   )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => selectedDocument && handleCopyCitation(selectedDocument)}
                  className={`transition-all duration-200 ${copiedCitationId === selectedDocument?.id ? "text-green-700 border-green-200 bg-green-50" : ""}`}
                >
                   {copiedCitationId === selectedDocument?.id ? (
                     <>
                       <Check className="w-4 h-4 mr-2" />
                       Copied!
                     </>
                   ) : (
                     <>
                       <Copy className="w-4 h-4 mr-2" />
                       Copy Citation
                     </>
                   )}
                </Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="flex-shrink-0 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors"
                        onClick={() => setIsHelpModalOpen(true)}
                      >
                         <CircleHelp className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Learn about AI citations</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
      <DocumentViewerModal 
        document={selectedDocument} 
        open={isDocumentModalOpen} 
        onClose={() => setIsDocumentModalOpen(false)} 
      />

      <CitationHelpModal 
        open={isHelpModalOpen} 
        onClose={() => setIsHelpModalOpen(false)} 
      />
    </>
  );
}