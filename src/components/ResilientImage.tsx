import {useState} from 'react';
import {Image as ImageIcon} from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  imgClassName?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = '',
  imgClassName = 'w-full h-full object-cover',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 border border-slate-200 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#2563EB] shadow-xs">
          <ImageIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="font-display text-sm font-semibold text-[#0F172A]">{fallbackTitle}</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={imgClassName}
      />
    </div>
  );
}
