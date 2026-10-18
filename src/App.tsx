/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Background } from './components/Background';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VisualBreak } from './components/VisualBreak';
import { Intro } from './components/Intro';
import { Projects } from './components/Projects';
import { Experience3D } from './components/Experience3D';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { About } from './components/About';
import { Technology } from './components/Technology';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { CTA } from './components/CTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { VISUAL_ASSETS } from './data/studioData';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Lenis heavy, fluid smooth scrolling synced with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-[#070709] text-[#F4F4F6] selection:bg-[#6D4AFF] selection:text-white">
        {/* 8-Layer Persistent Cinematic Background System */}
        <Background />

        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Lerp Custom Cursor (Desktop) */}
        <CustomCursor />

        {/* Cinematic Loader */}
        {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

        {/* Floating Minimal Navigation */}
        <Navbar />

        {/* Page Rhythm: Alternating Dark & Light Visual-First Experience */}
        <main className="relative z-10">
          {/* 1. HERO (70% Visual / 30% Text — Dark Obsidian & Chrome) */}
          <Hero />

          {/* 2. FULLSCREEN VISUAL BREAK (Transition from Obsidian Dark to Alabaster Light) */}
          <VisualBreak
            image={VISUAL_ASSETS.visualBreakLight}
            statement="IDEAS SHOULD MOVE."
            sublabel="00 — KINETIC PHILOSOPHY"
            themeTransition="dark-to-light"
          />

          {/* 3. SHORT TEXT + 3D SCULPTURE (Alabaster Light Editorial Stage) */}
          <Intro />

          {/* 4. LARGE PROJECT IMAGES + FULLSCREEN SCROLL CASE STUDY (Dark/Light Alternating) */}
          <Projects />

          {/* 5. FULLSCREEN 3D EXPERIENCE & VISUAL STORYTELLING (WOW Moment) */}
          <Experience3D />

          {/* 6. INTERACTIVE SERVICES MENU (Alabaster Light with Cursor-Following Visuals) */}
          <Services />

          {/* 7. FULLSCREEN IMAGE TRANSITION (Light back to Dark) */}
          <VisualBreak
            image={VISUAL_ASSETS.kairoObject}
            statement="CRAFT WITHOUT COMPROMISE."
            sublabel="PRECISION ENGINEERING"
            themeTransition="light-to-dark"
          />

          {/* 8. PROCESS VISUAL TIMELINE (Dark Stage) */}
          <Process />

          {/* 9. ABOUT IMAGE + PARALLAX (Alabaster Light Stage) */}
          <About />

          {/* 10. 3D TECHNOLOGY ORBITAL ENVIRONMENT (Dark WebGL Stage) */}
          <Technology />

          {/* 11. MONUMENTAL TESTIMONIAL QUOTE (Atmospheric Visual Stage) */}
          <Testimonials />

          {/* 12. COMPACT INTERACTIVE PRICING ROWS (Alabaster Light Stage) */}
          <Pricing />

          {/* 13. FINAL 3D CTA WOW MOMENT */}
          <CTA />

          {/* 14. MINIMAL CONTACT (Alabaster Light Stage) */}
          <Contact />
        </main>

        {/* 15. MINIMAL PREMIUM FOOTER */}
        <Footer />
      </div>
    </CursorProvider>
  );
}
