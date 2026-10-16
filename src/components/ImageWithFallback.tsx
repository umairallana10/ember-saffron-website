import React, { useState } from 'react';
import { Flame } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackCategory?: string;
  aspectRatioClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Ember & Saffron',
  className = '',
  fallbackTitle,
  fallbackCategory = 'Ember & Saffron',
  aspectRatioClass,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#292420] via-[#3E161C] to-[#1E1B18] text-[#F7F3EB] flex flex-col items-center justify-center p-6 text-center select-none ${aspectRatioClass || 'w-full h-full min-h-[220px]'}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,160,89,0.15),transparent_65%)]" />
        
        {/* Subtle decorative geometric Middle Eastern inspired lattice lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none border border-[#C5A059]/40 m-3" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-[#C5A059]/40 bg-[#58151E]/60 flex items-center justify-center mb-3 shadow-md">
            <Flame className="w-6 h-6 text-[#C5A059]" />
          </div>
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#C5A059] font-medium mb-1">
            {fallbackCategory}
          </span>
          <p className="font-serif text-lg text-[#FCFAF6] font-medium max-w-[240px] leading-snug">
            {fallbackTitle || alt || 'Culinary Creation'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass || ''}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EFE9DD] animate-pulse flex items-center justify-center">
          <Flame className="w-6 h-6 text-[#C5A059]/40 animate-pulse" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
        {...props}
      />
    </div>
  );
};
