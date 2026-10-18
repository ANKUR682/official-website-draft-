import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VISUAL_ASSETS } from '../data/studioData';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 8,
            scale: 1.0,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-40 px-6 sm:px-12 bg-[#F4F3EF] text-[#09090D] overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Top Minimal Label & Monumental Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-8">
            <p className="font-mono-tabular text-xs tracking-[0.24em] text-[#5E3BEE] uppercase mb-4">
              ABOUT NOVA
            </p>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-extrabold tracking-[-0.035em] leading-[0.92]">
              <span className="block">WE DESIGN</span>
              <span className="block text-[#5E3BEE]">DIGITAL WORLDS.</span>
            </h2>
          </div>

          {/* Strictly 2 lines of description */}
          <div className="lg:col-span-4">
            <p className="text-base sm:text-lg text-zinc-700 leading-relaxed">
              Born in Kolkata, working globally. A collective of visual directors, shader artists, and systems engineers building the future of the web.
            </p>
          </div>
        </div>

        {/* Large Atmospheric Parallax Image with Subtle 3D Geometric Emblem Overlay */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
          <img
            ref={imgRef}
            src={VISUAL_ASSETS.aboutAtrium}
            alt="NOVA Studio architectural pavilion overlooking volcanic horizon"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Subtle Rotating 3D Geometric Wireframe Overlay */}
          <div className="pointer-events-none absolute top-6 right-6 sm:top-10 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-black/45 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-16 h-16 stroke-white fill-none animate-[spin_16s_linear_infinite]"
              strokeWidth="1.2"
            >
              <circle cx="50" cy="50" r="38" strokeDasharray="4 4" />
              <polygon points="50,14 86,50 50,86 14,50" stroke="#9D85FF" />
              <polygon points="50,26 74,50 50,74 26,50" />
            </svg>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono-tabular text-xs text-white/85">
            <span>20+ GLOBAL COMMISSIONS</span>
            <span>KOLKATA · LONDON · TOKYO</span>
          </div>
        </div>
      </div>
    </section>
  );
};
