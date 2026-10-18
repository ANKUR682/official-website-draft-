import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STORY_SEQUENCE } from '../data/studioData';
import { useCursor } from '../context/CursorContext';

gsap.registerPlugin(ScrollTrigger);

export const Experience3D: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const scrollProgressRef = useRef(0);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.065);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Floating Chrome & Glass Objects along the Z camera path
    const group = new THREE.Group();
    scene.add(group);

    const chromeMat = new THREE.MeshPhysicalMaterial({
      color: 0x181824,
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 1.0,
      iridescence: 0.75,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x7c5cff,
      metalness: 0.2,
      roughness: 0.08,
      transmission: 0.6,
      transparent: true,
      opacity: 0.85,
    });

    // Central Morphing Sculpture
    const centerGeo = new THREE.TorusKnotGeometry(1.2, 0.32, 128, 24);
    const centerMesh = new THREE.Mesh(centerGeo, chromeMat);
    group.add(centerMesh);

    // Floating Satellite Sculptures in Deep Space
    const floatingMeshes: THREE.Mesh[] = [];
    const shapes = [
      new THREE.IcosahedronGeometry(0.55, 1),
      new THREE.OctahedronGeometry(0.6, 0),
      new THREE.TorusGeometry(0.65, 0.16, 16, 48),
    ];

    for (let i = 0; i < (isMobile ? 6 : 12); i++) {
      const mesh = new THREE.Mesh(
        shapes[i % shapes.length],
        i % 2 === 0 ? chromeMat : glassMat
      );
      const angle = (i / 12) * Math.PI * 2;
      const radius = 2.6 + (i % 3) * 1.1;
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.65,
        (i - 6) * 0.9
      );
      group.add(mesh);
      floatingMeshes.push(mesh);
    }

    // Particles
    const pCount = isMobile ? 120 : 300;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) {
      pPos[i] = (Math.random() - 0.5) * 16;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x9d85ff,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const violetLight = new THREE.PointLight(0x7c5cff, 12, 16);
    violetLight.position.set(-3, 2, 4);
    scene.add(violetLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 10, 16);
    blueLight.position.set(3, -2, 2);
    scene.add(blueLight);

    let mouseX = 0;
    let mouseY = 0;
    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      const prog = scrollProgressRef.current;

      // Camera flies forward as user scrolls
      camera.position.z = 9 - prog * 4.8;
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.6 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      centerMesh.rotation.y = t * 0.3 + prog * Math.PI * 2;
      centerMesh.rotation.x = t * 0.2 + prog * Math.PI;
      const scale = 1 + Math.sin(prog * Math.PI) * 0.35;
      centerMesh.scale.setScalar(scale);

      floatingMeshes.forEach((m, idx) => {
        m.rotation.x = t * 0.4 + idx;
        m.rotation.y = t * 0.3 + idx;
        m.position.y += Math.sin(t + idx) * 0.002;
      });

      particles.rotation.y = t * 0.03 + prog * 0.8;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      centerGeo.dispose();
      shapes.forEach((s) => s.dispose());
      chromeMat.dispose();
      glassMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          const idx = Math.min(
            STORY_SEQUENCE.length - 1,
            Math.floor(self.progress * STORY_SEQUENCE.length)
          );
          setActiveStep(idx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentStory = STORY_SEQUENCE[activeStep] || STORY_SEQUENCE[0];

  return (
    <section
      ref={sectionRef}
      id="experience-3d"
      onMouseEnter={() => setCursor('glow', 'WEBGL WORLD')}
      onMouseLeave={resetCursor}
      className="relative h-screen w-full bg-[#070709] text-white overflow-hidden flex flex-col justify-between py-24 px-6 sm:px-12"
    >
      {/* Fullscreen WebGL Canvas */}
      <div ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Top Minimal Label */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] flex items-center justify-between font-mono-tabular text-xs tracking-[0.24em] text-zinc-400">
        <span>03 — SPATIAL WEBGL EXPERIENCE</span>
        <span>SCROLL TO FLY THROUGH</span>
      </div>

      {/* Center Monumental Statement & Visual Storytelling Sequence */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pointer-events-none">
        <div className="lg:col-span-7">
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-[-0.035em] leading-[0.92] text-white">
            <span className="block">DESIGN</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#8B70FF]">
              MEETS
            </span>
            <span className="block">TECHNOLOGY.</span>
          </h2>
        </div>

        {/* Right Connected Visual Storytelling Sequence: IDEA -> DESIGN -> CODE -> MOTION -> EXPERIENCE -> NOVA */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
          <div className="w-full max-w-sm bg-black/55 backdrop-blur-xl border border-white/15 p-6 sm:p-8 pointer-events-auto">
            <div className="flex items-center justify-between font-mono-tabular text-xs text-[#9D85FF] mb-6">
              <span>EVOLUTION SEQUENCE</span>
              <span>{currentStory.step} / 06</span>
            </div>

            <div className="space-y-2.5 relative">
              {STORY_SEQUENCE.map((item, idx) => {
                const isActive = idx === activeStep;
                return (
                  <button
                    key={item.word}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`w-full flex items-center justify-between py-1.5 text-left transition-all duration-300 ${
                      isActive ? 'opacity-100 translate-x-2' : 'opacity-35 hover:opacity-70'
                    }`}
                  >
                    <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      {item.word}
                    </span>
                    <span className="font-mono-tabular text-xs text-[#8B70FF]">
                      {item.step}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 pt-4 border-t border-white/15 text-xs sm:text-sm text-zinc-300">
              {currentStory.caption}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Progress Line */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        <div className="h-[1px] w-full bg-white/15 overflow-hidden">
          <div
            className="h-full bg-[#7C5CFF] transition-all duration-150"
            style={{ width: `${((activeStep + 1) / STORY_SEQUENCE.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};
