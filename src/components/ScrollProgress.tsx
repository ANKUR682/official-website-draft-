import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      setProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <>
      {/* Top 1.5px razor progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#6D4AFF] via-[#60A5FA] to-white transition-[width] duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Subtle right-edge architectural scroll meter (Desktop) */}
      <div
        className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 pointer-events-none mix-blend-difference"
        aria-hidden="true"
      >
        <span className="font-mono-tabular text-[10px] tracking-widest text-white/70">
          {String(Math.round(progress)).padStart(2, '0')}
        </span>
        <div className="w-[1px] h-24 bg-white/20 overflow-hidden relative">
          <div
            className="w-full bg-white transition-all duration-75"
            style={{ height: `${progress}%` }}
          />
        </div>
      </div>
    </>
  );
};
