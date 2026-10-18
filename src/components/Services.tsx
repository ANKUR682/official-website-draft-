import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICE_ROWS } from '../data/studioData';
import { useCursor } from '../context/CursorContext';

export const Services: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const floatImgRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current || !floatImgRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 190;
    const y = e.clientY - rect.top - 130;
    floatImgRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${
      (e.clientX / window.innerWidth - 0.5) * 6
    }deg)`;
  };

  const activeService = hoveredIdx !== null ? SERVICE_ROWS[hoveredIdx] : null;

  return (
    <section
      ref={sectionRef}
      id="services"
      onMouseMove={handleMouseMove}
      className={`relative py-28 md:py-40 px-6 sm:px-12 overflow-hidden transition-colors duration-500 ${
        hoveredIdx !== null
          ? 'bg-[#EAE8E1] text-[#09090D]'
          : 'bg-[#F4F3EF] text-[#09090D]'
      }`}
    >
      {/* Large Cursor-Following Visual Behind the Active Row */}
      <div
        ref={floatImgRef}
        className={`pointer-events-none hidden lg:block absolute top-0 left-0 z-0 w-[380px] h-[260px] overflow-hidden shadow-2xl transition-opacity duration-300 will-change-transform ${
          activeService ? 'opacity-90 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        {activeService && (
          <img
            src={activeService.image}
            alt={activeService.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Minimal Editorial Header */}
        <div className="flex items-end justify-between mb-16 md:mb-24">
          <div>
            <p className="font-mono-tabular text-xs tracking-[0.24em] text-[#5E3BEE] uppercase mb-3">
              04 — CAPABILITIES
            </p>
            <h2 className="font-display text-5xl sm:text-7xl font-extrabold tracking-[-0.035em] leading-none">
              SERVICES
            </h2>
          </div>
          <span className="font-mono-tabular text-xs tracking-[0.2em] text-zinc-500 hidden sm:inline">
            01 — 05
          </span>
        </div>

        {/* Interactive Editorial Menu Rows */}
        <div className="border-t border-black/15">
          {SERVICE_ROWS.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <a
                key={item.number}
                href="#contact"
                onMouseEnter={() => {
                  setHoveredIdx(idx);
                  setCursor('service', 'EXPLORE →');
                }}
                onMouseLeave={() => {
                  setHoveredIdx(null);
                  resetCursor();
                }}
                className="group block border-b border-black/15 py-8 sm:py-11 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-baseline gap-6 sm:gap-12">
                    <span
                      className={`font-mono-tabular text-sm sm:text-base transition-colors ${
                        isHovered ? 'text-[#5E3BEE] font-bold' : 'text-zinc-500'
                      }`}
                    >
                      {item.number}
                    </span>
                    <h3
                      className={`font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] leading-none transition-all duration-300 ${
                        isHovered
                          ? 'text-[#09090D] translate-x-4'
                          : 'text-[#09090D]/80'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-8 pl-12 md:pl-0">
                    <span
                      className={`text-sm max-w-xs transition-opacity duration-300 ${
                        isHovered ? 'opacity-100 text-zinc-900 font-medium' : 'opacity-65 text-zinc-600'
                      }`}
                    >
                      {item.caption}
                    </span>
                    <span className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-[#09090D] group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
