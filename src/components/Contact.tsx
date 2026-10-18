import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useCursor } from '../context/CursorContext';

const SOCIALS = [
  { label: 'INSTAGRAM', href: 'https://instagram.com' },
  { label: 'LINKEDIN', href: 'https://linkedin.com' },
  { label: 'DRIBBBLE', href: 'https://dribbble.com' },
  { label: 'GITHUB', href: 'https://github.com' },
];

export const Contact: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
  const [sent, setSent] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative py-28 md:py-40 px-6 sm:px-12 bg-[#F4F3EF] text-[#09090D]"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 pb-16 border-b border-black/15">
          <div>
            <p className="font-mono-tabular text-xs tracking-[0.24em] text-[#5E3BEE] uppercase mb-5">
              09 — INITIATE DIALOGUE
            </p>
            <h2 className="font-display text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-[-0.04em] leading-[0.9] mb-8">
              HAVE AN IDEA?
            </h2>
            <a
              href="mailto:hello@nova.studio"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="font-mono-tabular text-xl sm:text-3xl font-medium text-[#09090D] hover:text-[#5E3BEE] border-b-2 border-[#09090D] hover:border-[#5E3BEE] pb-1 transition-colors"
            >
              hello@nova.studio
            </a>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-6">
            <MagneticButton
              onClick={() => setDrawerOpen(!drawerOpen)}
              cursorVariant="button"
              className="px-9 py-5 text-xs sm:text-sm font-mono-tabular font-semibold uppercase tracking-[0.22em] bg-[#09090D] text-white hover:bg-[#5E3BEE] transition-colors"
            >
              <span>{drawerOpen ? 'CLOSE BRIEF' : "LET'S TALK →"}</span>
            </MagneticButton>

            <div className="flex flex-wrap items-center gap-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  className="inline-flex items-center gap-1 font-mono-tabular text-xs tracking-[0.18em] text-zinc-600 hover:text-black transition-colors"
                >
                  <span>{s.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Collapsible Brief Form */}
        {drawerOpen && (
          <div className="pt-12">
            {sent ? (
              <div className="p-8 bg-white border border-black/15 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#5E3BEE]" />
                  <p className="font-display text-xl font-bold">
                    Transmission received. We will reply within 24 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setName('');
                    setEmail('');
                    setIdea('');
                  }}
                  className="font-mono-tabular text-xs uppercase tracking-widest underline"
                >
                  RESET
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end"
              >
                <div className="md:col-span-3">
                  <label
                    htmlFor="minimal-name"
                    className="block font-mono-tabular text-[11px] uppercase tracking-widest text-zinc-500 mb-2"
                  >
                    NAME
                  </label>
                  <input
                    id="minimal-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full bg-transparent border-b border-black/30 focus:border-[#5E3BEE] py-3 text-sm text-black placeholder:text-zinc-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-3">
                  <label
                    htmlFor="minimal-email"
                    className="block font-mono-tabular text-[11px] uppercase tracking-widest text-zinc-500 mb-2"
                  >
                    EMAIL *
                  </label>
                  <input
                    id="minimal-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@brand.com"
                    className="w-full bg-transparent border-b border-black/30 focus:border-[#5E3BEE] py-3 text-sm text-black placeholder:text-zinc-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-4">
                  <label
                    htmlFor="minimal-idea"
                    className="block font-mono-tabular text-[11px] uppercase tracking-widest text-zinc-500 mb-2"
                  >
                    PROJECT VISION
                  </label>
                  <input
                    id="minimal-idea"
                    type="text"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="WebGL launch, brand flagship..."
                    className="w-full bg-transparent border-b border-black/30 focus:border-[#5E3BEE] py-3 text-sm text-black placeholder:text-zinc-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 font-mono-tabular text-xs uppercase tracking-widest bg-[#5E3BEE] text-white hover:bg-black transition-colors whitespace-nowrap"
                  >
                    SEND →
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
