import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsLeaving(true), 450);
    const timer2 = setTimeout(() => onComplete(), 800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#070709] text-white flex items-center justify-center transition-opacity duration-350 ease-out ${
        isLeaving ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading NOVA"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
          NOVA
        </span>
        <div className="w-24 h-[1px] bg-white/15 overflow-hidden">
          <div className="h-full w-full bg-white/80 origin-left animate-[pulse_0.6s_ease-out]" />
        </div>
      </div>
    </div>
  );
};
