import React from 'react';
import { useCursor } from '../context/CursorContext';

export const Footer: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <footer className="relative bg-[#070709] text-white py-20 px-6 sm:px-12 border-t border-white/10">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10 items-end">
          {/* Left Brand & Tagline */}
          <div className="md:col-span-6 space-y-3">
            <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight block">
              NOVA
            </span>
            <p className="font-mono-tabular text-xs tracking-[0.22em] text-zinc-400 uppercase">
              WE BUILD DIGITAL EXPERIENCES THAT MOVE.
            </p>
          </div>

          {/* Center Navigation */}
          <div className="md:col-span-4 flex flex-wrap gap-6 font-mono-tabular text-xs tracking-[0.18em] text-zinc-400">
            <a
              href="#work"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="hover:text-white transition-colors"
            >
              WORK
            </a>
            <a
              href="#services"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="hover:text-white transition-colors"
            >
              SERVICES
            </a>
            <a
              href="#about"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="hover:text-white transition-colors"
            >
              ABOUT
            </a>
            <a
              href="#process"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="hover:text-white transition-colors"
            >
              PROCESS
            </a>
            <a
              href="#contact"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="hover:text-white transition-colors"
            >
              CONTACT
            </a>
          </div>

          {/* Right Location */}
          <div className="md:col-span-2 md:text-right font-mono-tabular text-xs tracking-[0.2em] text-zinc-400">
            KOLKATA / INDIA
          </div>
        </div>

        {/* Bottom Status & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-tabular text-xs tracking-[0.18em] text-zinc-400">
          <div className="inline-flex items-center gap-2.5 text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
            <span>AVAILABLE FOR SELECT PROJECTS</span>
          </div>

          <span>© 2026 NOVA.</span>
        </div>
      </div>
    </footer>
  );
};
