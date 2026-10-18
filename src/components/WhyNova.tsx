import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WHY_NOVA_STATEMENTS } from '../data/studioData';

gsap.registerPlugin(ScrollTrigger);

export const WhyNova: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>('.why-statement-card');
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { y: 48, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 82%',
              end: 'top 35%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-nova"
      className="relative py-28 md:py-40 px-6 sm:px-12 bg-[#070709] border-b border-white/10"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section Heading */}
        <div className="mb-20 md:mb-28">
          <p className="font-mono-tabular text-xs tracking-[0.22em] text-[#8B70FF] uppercase mb-4">
            04. THE NOVA STANDARD
          </p>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-[-0.03em] leading-[0.95] text-white">
            WHY NOVA?
          </h2>
        </div>

        {/* 4 Monumental Statements */}
        <div className="space-y-16 md:space-y-24">
          {WHY_NOVA_STATEMENTS.map((item) => (
            <div
              key={item.number}
              className="why-statement-card group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start border-t border-white/15 pt-10 md:pt-14"
            >
              {/* Left Index */}
              <div className="lg:col-span-2">
                <span className="font-mono-tabular text-3xl sm:text-5xl font-medium text-[#7C5CFF]">
                  {item.number}
                </span>
              </div>

              {/* Center Monumental Typography */}
              <div className="lg:col-span-6">
                <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] leading-[0.95] text-white">
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
              </div>

              {/* Right Substantiation & Proof */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
                <div className="border-l-2 border-[#6D4AFF] pl-4 py-1">
                  <p className="font-mono-tabular text-xs text-zinc-400 uppercase tracking-wider">
                    VERIFIED BENCHMARK
                  </p>
                  <p className="text-sm font-medium text-white mt-0.5">{item.proof}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
