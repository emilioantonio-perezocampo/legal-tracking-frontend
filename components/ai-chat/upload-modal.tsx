'use client'

import React, { useState, useEffect } from 'react';
import { X, FileText, CheckCircle, Folder, Cloud } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AIUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (files: File[]) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
}

export function AIUploadModal({ open, onOpenChange, onUpload }: AIUploadModalProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Mock upload simulation
  useEffect(() => {
    if (files.some(f => f.status === 'uploading')) {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.status === 'uploading') {
            const newProgress = Math.min(f.progress + 10, 100);
            return {
              ...f,
              progress: newProgress,
              status: newProgress === 100 ? 'complete' : 'uploading'
            };
          }
          return f;
        }));
      }, 300);
      return () => clearInterval(interval);
    }
  }, [files]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const newUploads: UploadedFile[] = newFiles.map(f => ({
      id: Math.random().toString(36).substr(2, 9),
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(1) + ' MB',
      type: f.name.split('.').pop()?.toUpperCase() || 'FILE',
      progress: 0,
      status: 'uploading'
    }));
    setFiles(prev => [...prev, ...newUploads]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleUploadClick = () => {
    // In a real app, convert UploadedFile back to File or pass IDs
    onUpload([] as any); // Mock passing files
    onOpenChange(false);
    setFiles([]); // Reset
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Document for AI Analysis</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Drop Zone */}
          <div 
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center transition-colors",
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Drag and drop files here, or click to browse</h3>
            <p className="text-xs text-gray-500 mt-1">Supported: PDF, DOCX, DOC, TXT (Max 25MB)</p>
            <input 
              type="file" 
              className="hidden" 
              id="file-upload" 
              multiple 
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileSelect}
            />
            <Button variant="outline" size="sm" className="mt-4" onClick={() => document.getElementById('file-upload')?.click()}>
              Browse Files
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="h-px w-12 bg-gray-200"></span>
            <span>OR</span>
            <span className="h-px w-12 bg-gray-200"></span>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" className="flex gap-2">
              <Folder className="w-4 h-4" /> Select from Case Documents
            </Button>
            <Button variant="outline" size="sm" className="flex gap-2">
              <Cloud className="w-4 h-4" /> Connect Cloud Storage
            </Button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Uploaded Files</h4>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {files.map(file => (
                  <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">
                      {file.type}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900 truncate">{file.name}</span>
                        <button onClick={() => removeFile(file.id)} className="text-gray-400 hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {file.status === 'uploading' ? (
                        <div className="space-y-1">
                          <Progress value={file.progress} className="h-1.5" />
                          <div className="flex justify-between text-[10px] text-gray-500">
                            <span>Uploading...</span>
                            <span>{file.progress}%</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-[10px] text-green-600 font-medium">
                          <CheckCircle className="w-3 h-3" /> Ready • {file.size}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            onClick={handleUploadClick} 
            disabled={files.length === 0 || files.some(f => f.status === 'uploading')} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Upload & Attach
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
