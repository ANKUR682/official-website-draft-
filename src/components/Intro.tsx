import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useCursor } from '../context/CursorContext';

export const Intro: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Sculptural Brushed Chrome Torus Knot on Alabaster Light Stage
    const knotGeo = new THREE.TorusKnotGeometry(1.15, 0.34, 160, 32, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4d4d8,
      metalness: 0.92,
      roughness: 0.12,
      clearcoat: 1.0,
      iridescence: 0.55,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knotMesh);

    // Architectural Wireframe Ring
    const ringGeo = new THREE.TorusGeometry(1.9, 0.01, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x5e3bee });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    const ambient = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3.5);
    dirLight1.position.set(4, 6, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.PointLight(0x6d4aff, 8, 12);
    dirLight2.position.set(-3, -2, 3);
    scene.add(dirLight2);

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
      if (!prefersReducedMotion) {
        knotMesh.rotation.y = t * 0.28 + mouseX * 0.5;
        knotMesh.rotation.x = t * 0.18 - mouseY * 0.4;
        ringMesh.rotation.z = -t * 0.22;
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      knotGeo.dispose();
      knotMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="intro"
      className="relative py-28 md:py-40 px-6 sm:px-12 bg-[#F4F3EF] text-[#09090D] overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] relative">
        {/* Asymmetrical Editorial Composition with Large 3D Object Behind/Beside */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Monumental Statement */}
          <div className="lg:col-span-7 relative z-10">
            <p className="font-mono-tabular text-xs tracking-[0.24em] text-[#5E3BEE] uppercase mb-6">
              01 — WHO WE ARE
            </p>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-extrabold tracking-[-0.035em] leading-[0.92] text-[#09090D]">
              <span className="block">WE TURN</span>
              <span className="block text-[#5E3BEE]">IDEAS INTO</span>
              <span className="block">EXPERIENCES.</span>
            </h2>
          </div>

          {/* Center/Right Interactive 3D Chrome Sculpture in Sunlit Gallery */}
          <div
            ref={mountRef}
            onMouseEnter={() => setCursor('glow', '3D FORM')}
            onMouseLeave={resetCursor}
            className="lg:col-span-5 h-[360px] sm:h-[460px] w-full relative z-0"
          />
        </div>

        {/* Bottom Asymmetrical Offset — Strictly 2 Lines of Copy */}
        <div className="mt-8 lg:mt-4 lg:ml-[42%] max-w-xl border-l-2 border-[#09090D] pl-6">
          <p className="text-lg sm:text-xl font-medium text-[#181820] leading-snug">
            An independent creative engineering studio crafting spatial WebGL worlds, flagship websites, and kinetic digital products.
          </p>
        </div>
      </div>
    </section>
  );
};
