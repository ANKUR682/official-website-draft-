import React, { useState } from 'react';
import { TESTIMONIAL_QUOTES } from '../data/studioData';
import { useCursor } from '../context/CursorContext';

export const Testimonials: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const { setCursor, resetCursor } = useCursor();

  const current = TESTIMONIAL_QUOTES[activeIdx] || TESTIMONIAL_QUOTES[0];

  return (
    <section
      id="testimonials"
      className="relative min-h-[82vh] w-full bg-[#070709] text-white overflow-hidden flex items-center justify-center py-28 px-6 sm:px-12"
    >
      {/* Slowly Moving Atmospheric Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          key={current.image}
          src={current.image}
          alt={current.client}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-35 scale-105 animate-[pulse_12s_ease-in-out_infinite] transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/65 to-[#070709]" />
      </div>

      {/* Foreground Huge Quote Typography */}
      <div className="relative z-10 mx-auto max-w-[1440px] w-full text-center">
        <p className="font-mono-tabular text-xs tracking-[0.28em] text-[#9D85FF] uppercase mb-10">
          07 — CLIENT PERSPECTIVE
        </p>

        <blockquote className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-[-0.035em] leading-[0.96] text-white max-w-6xl mx-auto mb-12">
          <span className="block">&ldquo;{current.lines[0]}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#9D85FF]">
            {current.lines[1]}&rdquo;
          </span>
        </blockquote>

        {/* Small Client Information Underneath */}
        <div className="space-y-1 mb-12">
          <p className="font-mono-tabular text-sm font-semibold tracking-[0.2em] text-white">
            — {current.client}
          </p>
          <p className="font-mono-tabular text-xs tracking-[0.18em] text-zinc-400">
            {current.role}
          </p>
        </div>

        {/* Minimal Index Switcher */}
        <div className="inline-flex items-center gap-3">
          {TESTIMONIAL_QUOTES.map((q, idx) => (
            <button
              key={q.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className={`px-3.5 py-1.5 font-mono-tabular text-xs border transition-colors ${
                idx === activeIdx
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-transparent text-zinc-400 border-white/20 hover:border-white/50 hover:text-white'
              }`}
            >
              0{idx + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
