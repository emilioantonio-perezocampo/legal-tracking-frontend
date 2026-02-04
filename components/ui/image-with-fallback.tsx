'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
  fallbackIconClassName?: string;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  fallbackClassName,
  fallbackIconClassName,
  ...props 
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-gray-100 text-gray-400', 
          className, 
          fallbackClassName
        )}
        title={alt || 'Image unavailable'}
        {...props}
      >
        <ImageOff className={cn("h-6 w-6", fallbackIconClassName)} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
