import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { VISUAL_ASSETS } from '../data/studioData';
import { MagneticButton } from './MagneticButton';
import { useCursor } from '../context/CursorContext';

export const CTA: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Cursor-Following 3D Chrome Sculpture
    const geo = new THREE.OctahedronGeometry(1.35, 3);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x161622,
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 1.0,
      iridescence: 0.85,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Particles
    const pCount = isMobile ? 80 : 200;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) {
      pPos[i] = (Math.random() - 0.5) * 14;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.55,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const movingLight = new THREE.PointLight(0x7c5cff, 15, 18);
    movingLight.position.set(2, 2, 4);
    scene.add(movingLight);

    let targetX = 0;
    let targetY = 0;
    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = -(e.clientY / window.innerHeight) * 2 + 1;
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
      // 3D object follows cursor smoothly
      mesh.position.x += (targetX * 1.6 - mesh.position.x) * 0.05;
      mesh.position.y += (targetY * 1.1 - mesh.position.y) * 0.05;
      mesh.rotation.y = t * 0.35 + targetX * 0.8;
      mesh.rotation.x = t * 0.25 - targetY * 0.8;

      movingLight.position.x = targetX * 4;
      movingLight.position.y = targetY * 3;

      points.rotation.y = t * 0.04;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[680px] w-full bg-[#070709] text-white overflow-hidden flex items-center justify-center px-6 sm:px-12">
      {/* Large Cinematic Image Backdrop */}
      <img
        src={VISUAL_ASSETS.ctaMonolith}
        alt="Floating titanium and glass monolith over dark ocean"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-black/40 to-[#070709]" />

      {/* Cursor-Following 3D Object & Particles */}
      <div
        ref={mountRef}
        onMouseEnter={() => setCursor('glow', 'MOVE')}
        onMouseLeave={resetCursor}
        className="absolute inset-0 z-[1]"
      />

      {/* Film Grain */}
      <div className="nova-grain pointer-events-none absolute inset-0 z-[2]" />

      {/* Huge Statement & Magnetic Button */}
      <div className="relative z-10 mx-auto max-w-[1440px] text-center pointer-events-none">
        <p className="font-mono-tabular text-xs tracking-[0.3em] text-[#9D85FF] uppercase mb-6">
          THE NEXT CHAPTER
        </p>

        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-extrabold tracking-[-0.035em] leading-[0.92] text-white mb-12">
          <span className="block">LET&apos;S BUILD</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#9D85FF]">
            SOMETHING
          </span>
          <span className="block">IMPOSSIBLE.</span>
        </h2>

        <div className="pointer-events-auto">
          <MagneticButton
            href="#contact"
            cursorVariant="button"
            strength={0.32}
            className="px-10 py-5 text-xs sm:text-sm font-mono-tabular font-semibold uppercase tracking-[0.22em] bg-white text-black hover:bg-[#6D4AFF] hover:text-white transition-colors duration-300 shadow-[0_0_50px_rgba(255,255,255,0.25)]"
          >
            <span>START A PROJECT →</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
