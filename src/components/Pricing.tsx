import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PRICING_ROWS } from '../data/studioData';
import { useCursor } from '../context/CursorContext';

export const Pricing: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('growth');
  const { setCursor, resetCursor } = useCursor();

  return (
    <section
      id="pricing"
      className="relative py-28 md:py-36 px-6 sm:px-12 bg-[#F4F3EF] text-[#09090D]"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <p className="font-mono-tabular text-xs tracking-[0.24em] text-[#5E3BEE] uppercase mb-3">
              08 — COMMISSIONS
            </p>
            <h2 className="font-display text-5xl sm:text-7xl font-extrabold tracking-[-0.035em] leading-none">
              ENGAGEMENTS
            </h2>
          </div>
          <span className="font-mono-tabular text-xs tracking-[0.2em] text-zinc-500">
            HOVER TO EXPAND
          </span>
        </div>

        {/* Compact Interactive Rows (STARTER / GROWTH / EXPERIENCE) */}
        <div className="border-t border-black/15">
          {PRICING_ROWS.map((row, idx) => {
            const isExpanded = expandedId === row.id;
            return (
              <div
                key={row.id}
                onMouseEnter={() => {
                  setExpandedId(row.id);
                  setCursor('button', 'SELECT →');
                }}
                onMouseLeave={resetCursor}
                onClick={() => setExpandedId(row.id)}
                className={`border-b border-black/15 transition-colors duration-300 cursor-pointer ${
                  isExpanded ? 'bg-[#E9E7DF]' : 'bg-transparent'
                }`}
              >
                <div className="py-8 px-4 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono-tabular text-xs text-[#5E3BEE] font-semibold">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] leading-none">
                      {row.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-8">
                    <span className="font-mono-tabular text-2xl sm:text-4xl font-bold text-[#09090D]">
                      {row.price}
                    </span>
                    <a
                      href="#contact"
                      aria-label={`Start ${row.name} engagement`}
                      className="w-11 h-11 rounded-full border border-black/25 flex items-center justify-center bg-[#09090D] text-white hover:bg-[#5E3BEE] transition-colors"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Smooth Height Expansion Revealing Starting Price, Deliverables, and Timeline */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isExpanded ? 'max-h-48 opacity-100 pb-8 px-4 sm:px-8' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-4 border-t border-black/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex flex-wrap items-center gap-3">
                      {row.deliverables.map((del) => (
                        <span
                          key={del}
                          className="font-mono-tabular text-xs uppercase tracking-wider text-zinc-800 after:content-['·'] last:after:content-none after:ml-3"
                        >
                          {del}
                        </span>
                      ))}
                    </div>

                    <div className="font-mono-tabular text-xs uppercase tracking-[0.2em] text-[#5E3BEE] font-semibold">
                      TIMELINE: {row.timeline}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
