import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VisualBreakProps {
  image: string;
  statement: string;
  sublabel?: string;
  themeTransition?: 'dark-to-light' | 'light-to-dark';
}

export const VisualBreak: React.FC<VisualBreakProps> = ({
  image,
  statement,
  sublabel = 'VISUAL INTERLUDE',
  themeTransition = 'dark-to-light',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.16, filter: 'blur(6px)' },
          {
            scale: 1.0,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 60, opacity: 0.2 },
          {
            y: -20,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'center center',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label={statement}
      className={`relative h-[92vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center ${
        themeTransition === 'dark-to-light' ? 'bg-[#F4F3EF]' : 'bg-[#070709]'
      }`}
    >
      {/* Full-Screen Moving Architectural / Sculptural Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={image}
          alt={statement}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover will-change-transform"
        />
        <div
          className={`absolute inset-0 ${
            themeTransition === 'dark-to-light'
              ? 'bg-gradient-to-b from-[#070709]/80 via-black/35 to-[#F4F3EF]'
              : 'bg-gradient-to-b from-[#F4F3EF] via-black/45 to-[#070709]'
          }`}
        />
      </div>

      {/* Minimal Monumental Statement */}
      <div className="relative z-10 px-6 text-center max-w-5xl">
        <p className="font-mono-tabular text-[11px] tracking-[0.3em] uppercase text-white/80 mb-4">
          {sublabel}
        </p>
        <h2
          ref={textRef}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[-0.035em] leading-[0.92] text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
        >
          {statement}
        </h2>
      </div>
    </section>
  );
};
