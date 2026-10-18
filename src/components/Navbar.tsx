import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { MagneticButton } from './MagneticButton';

const NAV_LINKS = [
  { label: 'WORK', href: '#work' },
  { label: 'SERVICES', href: '#services' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROCESS', href: '#process' },
  { label: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3 px-4 sm:px-8' : 'py-6 px-6 sm:px-12'
        }`}
      >
        <div
          className={`mx-auto max-w-[1440px] flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? 'bg-[#070709]/80 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.45)]'
              : 'bg-black/20 backdrop-blur-sm border border-white/5 px-5 py-2.5'
          }`}
        >
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className="font-display text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            NOVA
          </a>

          {/* Zone 2: 5 clean text links */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className="group relative py-1 text-xs font-mono-tabular tracking-[0.2em] text-zinc-300 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary CTA */}
          <div className="flex items-center gap-3">
            <MagneticButton
              href="#contact"
              cursorVariant="button"
              strength={0.24}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono-tabular tracking-[0.18em] uppercase text-black bg-white hover:bg-[#7C5CFF] hover:text-white transition-colors duration-300"
            >
              <span>LET&apos;S TALK</span>
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 text-white border border-white/15 bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Animated Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#070709]/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-28 transition-all duration-500 ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-6 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col space-y-5" aria-label="Mobile Navigation">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="group flex items-baseline justify-between border-b border-white/10 pb-4"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono-tabular text-xs text-[#7C5CFF]">0{idx + 1}</span>
                <span className="font-display text-4xl font-bold text-white">{link.label}</span>
              </div>
              <ArrowUpRight className="w-6 h-6 text-zinc-400" />
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <span className="font-mono-tabular text-xs text-zinc-400">KOLKATA / INDIA</span>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-6 py-3 text-xs font-mono-tabular uppercase tracking-widest bg-white text-black font-semibold whitespace-nowrap"
          >
            LET&apos;S TALK →
          </a>
        </div>
      </div>
    </>
  );
};
