import React, { useEffect, useRef, useState } from 'react';
import { useCursor } from '../context/CursorContext';

export const CustomCursor: React.FC = () => {
  const { variant, label } = useCursor();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const tick = () => {
      // Smooth lerp interpolation
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  const getCursorText = () => {
    if (label) return label;
    if (variant === 'project') return 'VIEW PROJECT →';
    if (variant === 'service') return 'EXPLORE →';
    if (variant === 'button') return 'OPEN →';
    return '';
  };

  const text = getCursorText();
  const isExpandedPill = variant === 'project' || variant === 'service' || variant === 'button';

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden lg:block"
      aria-hidden="true"
    >
      {/* Smooth Lerp Circle / Pill */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center transition-all duration-200 ease-out will-change-transform ${
          isExpandedPill
            ? 'px-4 py-2 -ml-14 -mt-5 rounded-full bg-[#09090D]/90 text-white border border-white/25 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.45)]'
            : variant === 'glow'
            ? 'w-16 h-16 -ml-8 -mt-8 rounded-full bg-[#6D4AFF]/15 border border-[#7C5CFF] shadow-[0_0_35px_rgba(109,74,255,0.6)]'
            : variant === 'link'
            ? 'w-12 h-12 -ml-6 -mt-6 rounded-full border border-[#7C5CFF] bg-[#6D4AFF]/10'
            : 'w-8 h-8 -ml-4 -mt-4 rounded-full border border-zinc-400/50 mix-blend-difference'
        }`}
      >
        {text && (
          <span className="font-mono-tabular text-[10px] font-medium tracking-[0.16em] uppercase whitespace-nowrap">
            {text}
          </span>
        )}
      </div>

      {/* Crisp Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white mix-blend-difference transition-transform duration-150 will-change-transform ${
          isExpandedPill ? 'scale-0' : 'scale-100'
        }`}
      />
    </div>
  );
};
