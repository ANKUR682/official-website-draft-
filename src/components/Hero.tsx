import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HeroScene } from './HeroScene';
import { MagneticButton } from './MagneticButton';
import { VISUAL_ASSETS } from '../data/studioData';
import { useCursor } from '../context/CursorContext';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-simple-fade',
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen min-h-[680px] w-full bg-[#070709] overflow-hidden flex flex-col justify-between pt-28 pb-10 px-6 sm:px-12"
    >
      {/* Layer 1: Crisp 4K Real Architectural Photography Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={VISUAL_ASSETS.heroArchitecture}
          alt="Minimalist Tokyo concrete and glass museum atrium at golden hour"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/85 via-[#070709]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/50" />
      </div>

      {/* Layer 2: Calm, Serene 3D Form */}
      <div
        className="absolute inset-0 z-[1]"
        onMouseEnter={() => setCursor('link')}
        onMouseLeave={resetCursor}
      >
        <HeroScene />
      </div>

      {/* Layer 3: Clean Editorial Typography & Actions */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] my-auto pointer-events-none">
        <div className="max-w-4xl">
          <h1 className="hero-simple-fade font-display text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-extrabold tracking-[-0.035em] leading-[0.94] text-white mb-6">
            <span className="block">WE BUILD</span>
            <span className="block text-zinc-200">DIGITAL</span>
            <span className="block">EXPERIENCES.</span>
          </h1>

          <p className="hero-simple-fade text-base sm:text-lg text-zinc-200 max-w-lg font-normal mb-9">
            Strategy, design, development and motion for ambitious digital brands.
          </p>

          <div className="hero-simple-fade flex flex-wrap items-center gap-4 pointer-events-auto">
            <MagneticButton
              href="#contact"
              cursorVariant="button"
              strength={0.15}
              className="px-7 py-4 text-xs font-mono-tabular font-semibold uppercase tracking-[0.2em] text-black bg-white hover:bg-[#6D4AFF] hover:text-white transition-colors duration-200"
            >
              <span>START A PROJECT →</span>
            </MagneticButton>

            <MagneticButton
              href="#work"
              cursorVariant="link"
              strength={0.15}
              className="px-7 py-4 text-xs font-mono-tabular font-semibold uppercase tracking-[0.2em] text-white bg-black/45 hover:bg-white/15 border border-white/25 backdrop-blur-md transition-colors duration-200"
            >
              <span>EXPLORE WORK ↓</span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="hero-simple-fade relative z-10 mx-auto w-full max-w-[1440px] flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5 text-[11px] font-mono-tabular tracking-[0.22em] text-zinc-300">
        <span>DIGITAL STUDIO</span>
        <span>KOLKATA / INDIA</span>
        <span>EST. 2026</span>
      </div>
    </section>
  );
};
