import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../data/studioData';
import { useCursor } from '../context/CursorContext';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section
      id="faq"
      className="relative py-28 md:py-40 px-6 sm:px-12 bg-[#070709] border-b border-white/10"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="font-mono-tabular text-xs tracking-[0.22em] text-[#8B70FF] uppercase mb-4">
              10. COMMON QUESTIONS
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] leading-[0.95] text-white mb-6">
              FREQUENTLY ASKED.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md">
              Everything you need to know about our engineering process, timelines, and WebGL capabilities.
            </p>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-7 border-t border-white/10">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="border-b border-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    onMouseEnter={() => setCursor('link')}
                    onMouseLeave={resetCursor}
                    aria-expanded={isOpen}
                    className="w-full py-6 sm:py-7 flex items-center justify-between gap-6 text-left group"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono-tabular text-xs text-[#7C5CFF]">
                        0{idx + 1}
                      </span>
                      <span className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#9D85FF] transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <span className="w-8 h-8 shrink-0 flex items-center justify-center border border-white/15 text-zinc-300">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#8B70FF]" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-7 pl-8 sm:pl-11 pr-4">
                      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
