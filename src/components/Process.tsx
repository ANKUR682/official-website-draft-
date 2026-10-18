import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_VISUAL_STEPS } from '../data/studioData';
import { useCursor } from '../context/CursorContext';

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 55%',
        end: 'bottom 45%',
        onUpdate: (self) => {
          const idx = Math.min(
            PROCESS_VISUAL_STEPS.length - 1,
            Math.floor(self.progress * PROCESS_VISUAL_STEPS.length)
          );
          setActiveIdx(idx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentStep = PROCESS_VISUAL_STEPS[activeIdx] || PROCESS_VISUAL_STEPS[0];
  const linePercent = ((activeIdx + 1) / PROCESS_VISUAL_STEPS.length) * 100;

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-28 md:py-40 px-6 sm:px-12 bg-[#070709] text-white border-b border-white/10"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="font-mono-tabular text-xs tracking-[0.24em] text-[#8B70FF] uppercase mb-3">
              05 — VISUAL PROCESS
            </p>
            <h2 className="font-display text-5xl sm:text-7xl font-extrabold tracking-[-0.035em] leading-none">
              HOW WE MOVE.
            </h2>
          </div>
          <span className="font-mono-tabular text-xs tracking-[0.2em] text-zinc-400">
            STEP {currentStep.number} / 05
          </span>
        </div>

        {/* Animated Connecting Line + 5 Interactive Steps */}
        <div className="relative mb-14">
          <div className="h-[1px] w-full bg-white/15" />
          <div
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#6D4AFF] via-white to-[#60A5FA] transition-all duration-500"
            style={{ width: `${linePercent}%` }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-6">
            {PROCESS_VISUAL_STEPS.map((step, idx) => {
              const isActive = idx === activeIdx;
              const isPast = idx <= activeIdx;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => {
                    setActiveIdx(idx);
                    setCursor('link');
                  }}
                  onMouseLeave={resetCursor}
                  className="text-left group focus-visible:outline-2 focus-visible:outline-[#7C5CFF]"
                >
                  <span
                    className={`block font-mono-tabular text-xs mb-1 transition-colors ${
                      isActive ? 'text-[#8B70FF] font-semibold' : isPast ? 'text-white' : 'text-zinc-500'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`font-display text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                      isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Large Visual Viewport Changing for Each Step */}
        <div className="relative aspect-[16/8] min-h-[340px] w-full overflow-hidden bg-[#0E0E15] border border-white/10">
          <img
            key={currentStep.image}
            src={currentStep.image}
            alt={currentStep.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 scale-100 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-black/25 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono-tabular text-xs tracking-[0.22em] text-[#9D85FF] block mb-2">
                {currentStep.number} — {currentStep.title}
              </span>
              <p className="font-display text-2xl sm:text-4xl font-bold text-white max-w-2xl">
                {currentStep.oneLiner}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
