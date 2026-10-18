import React, { useEffect, useRef } from 'react';
import { MARQUEE_ITEMS } from '../data/studioData';

export const Marquee: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let xPos = 0;
    let direction = -1; // -1 moves left, 1 moves right
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let rafId: number;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;

      if (delta > 0.5) {
        direction = -1;
      } else if (delta < -0.5) {
        direction = 1;
      }
      scrollVelocity = Math.min(Math.abs(delta) * 0.14, 4.5);
    };

    const animate = () => {
      scrollVelocity *= 0.92;
      const baseSpeed = 0.055;
      const currentSpeed = (baseSpeed + scrollVelocity * 0.04) * direction;

      xPos += currentSpeed;
      if (xPos <= -50) {
        xPos += 50;
      } else if (xPos > 0) {
        xPos -= 50;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xPos}%, 0, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const repeatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      id="marquee"
      aria-label="Core Studio Disciplines"
      className="relative py-10 md:py-14 bg-[#070709] border-y border-white/10 overflow-hidden select-none"
    >
      <div
        ref={trackRef}
        className="flex w-max items-center whitespace-nowrap will-change-transform"
      >
        {repeatedItems.map((word, index) => (
          <div key={`${word}-${index}`} className="flex items-center">
            <span className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white/90 hover:text-[#7C5CFF] transition-colors duration-300 px-6 sm:px-10">
              {word}
            </span>
            <span
              className="w-3 h-3 md:w-4 md:h-4 rotate-45 bg-[#6D4AFF] shadow-[0_0_20px_#6D4AFF]"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
