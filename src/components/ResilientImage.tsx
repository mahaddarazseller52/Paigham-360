import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  caption?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-[4/3]',
  caption,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#064E3B] ${aspectClass} ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="islamic-lattice-dark flex h-full w-full flex-col items-center justify-center p-6 text-center text-[#FAFAF5]">
          <BookOpen className="mb-3 h-8 w-8 text-[#D4AF37]" aria-hidden="true" />
          <p className="font-display text-lg font-medium text-[#FAFAF5]">
            {caption || 'Paigham360'}
          </p>
        </div>
      )}
    </div>
  );
}
