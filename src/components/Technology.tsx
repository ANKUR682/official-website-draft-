import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TECH_ORBIT_ITEMS, TechOrbitItem } from '../data/studioData';
import { useCursor } from '../context/CursorContext';

export const Technology: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeTech, setActiveTech] = useState<TechOrbitItem>(TECH_ORBIT_ITEMS[0]);
  const hoveredRef = useRef<string>(TECH_ORBIT_ITEMS[0].id);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    hoveredRef.current = activeTech.id;
  }, [activeTech]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Central 3D Core Sculpture
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 3);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x161622,
      metalness: 0.9,
      roughness: 0.14,
      clearcoat: 1.0,
      iridescence: 0.8,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    const cageGeo = new THREE.IcosahedronGeometry(1.55, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x7c5cff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    group.add(cageMesh);

    // Orbiting 3D Nodes for Each Technology
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeGeo = new THREE.OctahedronGeometry(0.16, 0);
    TECH_ORBIT_ITEMS.forEach((item) => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x6d4aff,
        emissiveIntensity: 0.8,
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.set(...item.position);
      group.add(mesh);
      nodeMeshes.push(mesh);
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const pLight1 = new THREE.PointLight(0x7c5cff, 12, 16);
    pLight1.position.set(3, 3, 4);
    scene.add(pLight1);
    const pLight2 = new THREE.PointLight(0x3b82f6, 10, 16);
    pLight2.position.set(-3, -2, 3);
    scene.add(pLight2);

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
      group.rotation.y = t * 0.18 + mouseX * 0.6;
      group.rotation.x = -mouseY * 0.4;
      coreMesh.rotation.y = -t * 0.3;
      cageMesh.rotation.z = t * 0.25;

      nodeMeshes.forEach((m, idx) => {
        const isSelected = TECH_ORBIT_ITEMS[idx].id === hoveredRef.current;
        const targetScale = isSelected ? 1.85 : 1.0;
        m.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      nodeGeo.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="technology"
      className="relative min-h-[90vh] py-28 md:py-36 px-6 sm:px-12 bg-[#070709] text-white overflow-hidden flex flex-col justify-between"
    >
      {/* Top Minimal Header */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] flex items-end justify-between">
        <div>
          <p className="font-mono-tabular text-xs tracking-[0.24em] text-[#8B70FF] uppercase mb-3">
            06 — INTERACTIVE STACK
          </p>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-[-0.03em]">
            TECHNOLOGY
          </h2>
        </div>
        <span className="font-mono-tabular text-xs text-zinc-400 hidden sm:inline">
          HOVER OR SELECT NODE
        </span>
      </div>

      {/* Central 3D Object Surrounded by Floating Spatial Technology Labels */}
      <div className="relative mx-auto w-full max-w-[1440px] my-10 h-[480px] sm:h-[560px] flex items-center justify-center">
        {/* Three.js Canvas */}
        <div
          ref={mountRef}
          onMouseEnter={() => setCursor('glow', '3D CORE')}
          onMouseLeave={resetCursor}
          className="absolute inset-0 z-0"
        />

        {/* Floating Spatial Labels Placed Around the Central 3D Object */}
        <div className="relative z-10 w-full h-full grid grid-cols-2 sm:grid-cols-4 place-items-center pointer-events-none">
          {TECH_ORBIT_ITEMS.map((item) => {
            const isHovered = activeTech.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTech(item)}
                onMouseEnter={() => {
                  setActiveTech(item);
                  setCursor('button', 'INSPECT');
                }}
                onMouseLeave={resetCursor}
                className={`pointer-events-auto px-5 py-2.5 font-display text-lg sm:text-2xl font-extrabold tracking-tight border transition-all duration-300 ${
                  isHovered
                    ? 'bg-white text-black border-white scale-110 -translate-y-1.5 shadow-[0_0_40px_rgba(124,92,255,0.75)]'
                    : 'bg-black/50 text-white/80 border-white/15 backdrop-blur-md hover:border-white/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Minimal Active Description Readout */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] border-t border-white/15 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-mono-tabular text-xs text-[#8B70FF] uppercase tracking-widest">
            {activeTech.label}
          </span>
          <span aria-hidden="true" className="text-zinc-600">
            —
          </span>
          <p className="text-sm sm:text-base text-zinc-200">{activeTech.caption}</p>
        </div>
        <span className="font-mono-tabular text-xs text-zinc-500">60 FPS GPU NATIVE</span>
      </div>
    </section>
  );
};
