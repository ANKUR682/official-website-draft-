import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { X } from 'lucide-react';
import { FEATURED_PROJECTS, ProjectItem, VISUAL_ASSETS } from '../data/studioData';
import { Project } from './Project';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ProjectItem | null>(null);
  const caseStudyRef = useRef<HTMLDivElement>(null);
  const zoomImgRef = useRef<HTMLImageElement>(null);
  const uiLayerRef = useRef<HTMLDivElement>(null);
  const threeHolderRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);

  // Fullscreen Scroll-Scrubbed Case Study Sequence:
  // IMAGE -> IMAGE ZOOMS -> UI APPEARS -> 3D OBJECT EMERGES -> TEXT APPEARS -> IMAGE TRANSFORMS
  useEffect(() => {
    const holder = threeHolderRef.current;
    if (!holder) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, holder.clientWidth / holder.clientHeight, 0.1, 100);
    camera.position.z = 5.2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    renderer.setSize(holder.clientWidth, holder.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    holder.innerHTML = '';
    holder.appendChild(renderer.domElement);

    const geo = new THREE.OctahedronGeometry(1.25, 2);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const light = new THREE.PointLight(0x7c5cff, 10, 15);
    light.position.set(2, 2, 3);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    let rafId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      mesh.rotation.y = t * 0.45;
      mesh.rotation.x = t * 0.25;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onResize = () => {
      if (!holder) return;
      camera.aspect = holder.clientWidth / holder.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(holder.clientWidth, holder.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: caseStudyRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.8,
        },
      });

      // Step 1 -> 2: Image zooms & sharpens
      tl.fromTo(
        zoomImgRef.current,
        { scale: 0.78, clipPath: 'inset(12% 14% 12% 14%)' },
        { scale: 1.08, clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }
      )
        // Step 3: Minimal Spatial UI Frame Appears
        .fromTo(
          uiLayerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        // Step 4: 3D Object Emerges
        .fromTo(
          threeHolderRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.9 },
          '-=0.2'
        )
        // Step 5 & 6: Text Appears & Image Transforms
        .fromTo(
          textLayerRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.3'
        );
    }, caseStudyRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="relative bg-[#070709]">
      {/* Section Header */}
      <div className="pt-28 pb-12 px-6 sm:px-12 mx-auto max-w-[1440px] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p className="font-mono-tabular text-xs tracking-[0.24em] text-[#8B70FF] uppercase mb-4">
            02 — ARCHIVE (2025–2026)
          </p>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-[-0.035em] leading-none text-white">
            SELECTED WORK
          </h2>
        </div>
        <span className="font-mono-tabular text-xs tracking-[0.2em] text-zinc-400">
          04 FEATURED COMMISSIONS
        </span>
      </div>

      {/* 4 Viewport-Dominating Projects (Alternating Dark & Light Gallery Contrast) */}
      <div>
        {FEATURED_PROJECTS.map((project, idx) => (
          <Project
            key={project.id}
            project={project}
            index={idx}
            onSelect={(item) => setActiveModal(item)}
          />
        ))}
      </div>

      {/* Fullscreen Interactive Case-Study Scroll Sequence */}
      <div
        ref={caseStudyRef}
        className="relative h-screen w-full bg-[#070709] overflow-hidden flex items-center justify-center"
      >
        {/* Step 1 & 2: Transforming Fullscreen Image */}
        <img
          ref={zoomImgRef}
          src={VISUAL_ASSETS.caseStudyTransform}
          alt="ARC Spatial Optical Launch Case Study"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-65 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-black/35 to-[#070709]/80" />

        {/* Step 3: Spatial UI Frame Overlay */}
        <div
          ref={uiLayerRef}
          className="pointer-events-none absolute inset-6 sm:inset-12 border border-white/20 flex flex-col justify-between p-6 font-mono-tabular text-[11px] tracking-[0.22em] text-white/80"
        >
          <div className="flex items-center justify-between">
            <span>CASE STUDY SPOTLIGHT · ARC OPTICS</span>
            <span>60 FPS WEBGL PIPELINE</span>
          </div>
          <div className="flex items-center justify-between">
            <span>SCROLL TO DECONSTRUCT</span>
            <span>1.2M LAUNCH SESSIONS</span>
          </div>
        </div>

        {/* Step 4: Emerging 3D Object in Center */}
        <div
          ref={threeHolderRef}
          className="pointer-events-none relative z-10 w-72 h-72 sm:w-96 sm:h-96"
        />

        {/* Step 5: Monumental Overlay Statement */}
        <div
          ref={textLayerRef}
          className="pointer-events-none absolute inset-x-6 bottom-20 z-20 text-center"
        >
          <p className="font-mono-tabular text-xs tracking-[0.28em] text-[#9D85FF] uppercase mb-3">
            INTERACTIVE PRODUCT LAUNCH
          </p>
          <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-white">
            BUILT TO BE FELT.
          </h3>
        </div>
      </div>

      {/* Minimal Visual Preview Lightbox when a Project is Clicked */}
      {activeModal && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeModal.title}
        >
          <div
            className="relative w-full max-w-5xl bg-[#0B0B10] border border-white/15 p-6 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 font-mono-tabular text-xs text-zinc-400">
              <span>
                {activeModal.number} — {activeModal.title} ({activeModal.year})
              </span>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Close preview"
                className="w-9 h-9 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full overflow-hidden mb-6">
              <img
                src={activeModal.image}
                alt={activeModal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-display text-3xl font-bold text-white">
                  {activeModal.title}
                </h4>
                <p className="text-sm text-zinc-400 mt-1">{activeModal.oneLiner}</p>
              </div>
              <a
                href="#contact"
                onClick={() => setActiveModal(null)}
                className="px-6 py-3.5 text-xs font-mono-tabular uppercase tracking-widest bg-white text-black hover:bg-[#6D4AFF] hover:text-white transition-colors whitespace-nowrap"
              >
                START SIMILAR PROJECT →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
