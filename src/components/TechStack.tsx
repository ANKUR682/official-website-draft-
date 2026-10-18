import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TECH_STACK, TechNode } from '../data/studioData';
import { useCursor } from '../context/CursorContext';

export const TechStack: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<TechNode>(TECH_STACK[2]); // Default Three.js
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const cloudGroup = new THREE.Group();
    scene.add(cloudGroup);

    // Create 3D Nodes and Synaptic Connecting Lines
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeGeo = new THREE.IcosahedronGeometry(0.24, 2);

    const linePositions: number[] = [];
    TECH_STACK.forEach((tech, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(tech.accent),
        emissive: new THREE.Color(tech.accent),
        emissiveIntensity: 0.55,
        metalness: 0.7,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.set(...tech.position);
      cloudGroup.add(mesh);
      nodeMeshes.push(mesh);

      // Connect each node to the next two nodes for a 3D constellation lattice
      const nextA = TECH_STACK[(i + 1) % TECH_STACK.length];
      const nextB = TECH_STACK[(i + 3) % TECH_STACK.length];
      linePositions.push(...tech.position, ...nextA.position);
      linePositions.push(...tech.position, ...nextB.position);
    });

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x7c5cff,
      transparent: true,
      opacity: 0.26,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    cloudGroup.add(lines);

    // Central Wireframe Sphere
    const sphereGeo = new THREE.SphereGeometry(1.85, 20, 20);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const centerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    cloudGroup.add(centerSphere);

    const ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);
    const pointLight = new THREE.PointLight(0x7c5cff, 6, 15);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    let targetX = 0;
    let targetY = 0;
    let smoothX = 0;
    let smoothY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (e.clientY < rect.top - 200 || e.clientY > rect.bottom + 200) return;
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      smoothX += (targetX - smoothX) * 0.06;
      smoothY += (targetY - smoothY) * 0.06;

      cloudGroup.rotation.y = t * 0.16 + smoothX * 0.65;
      cloudGroup.rotation.x = Math.sin(t * 0.3) * 0.15 - smoothY * 0.45;

      nodeMeshes.forEach((mesh, idx) => {
        const basePos = TECH_STACK[idx].position;
        mesh.position.y = basePos[1] + Math.sin(t * 1.4 + idx) * 0.1;
      });

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      nodeGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="tech"
      className="relative py-28 md:py-40 px-6 sm:px-12 bg-[#070709] border-b border-white/10 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Heading & Interactive Floating Tag Cloud */}
          <div className="lg:col-span-6 space-y-8 z-10">
            <div>
              <p className="font-mono-tabular text-xs tracking-[0.22em] text-[#8B70FF] uppercase mb-4">
                06. ENGINEERING STACK
              </p>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] leading-[0.95] text-white">
                BUILT WITH THE RIGHT TOOLS.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
              We pair low-level GPU graphics APIs with battle-tested full-stack frameworks. Select any technology node to inspect how it powers our production builds.
            </p>

            {/* Interactive Floating Spatial Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {TECH_STACK.map((tech) => {
                const isSelected = selectedTech.id === tech.id;
                return (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => setSelectedTech(tech)}
                    onMouseEnter={() => {
                      setSelectedTech(tech);
                      setCursor('button');
                    }}
                    onMouseLeave={resetCursor}
                    className={`group relative px-5 py-3 border text-sm font-mono-tabular transition-all duration-300 whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#6D4AFF] border-[#9D85FF] text-white -translate-y-1 shadow-[0_10px_25px_rgba(109,74,255,0.35)]'
                        : 'bg-[#0C0C14] border-white/10 text-zinc-300 hover:border-white/35 hover:text-white'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: tech.accent }}
                      />
                      <span>{tech.name}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Node Detail Readout */}
            <div className="bg-[#0C0C14] border border-white/10 p-6 sm:p-8">
              <div className="flex items-center justify-between font-mono-tabular text-xs text-zinc-400 mb-2">
                <span className="uppercase tracking-widest text-[#8B70FF]">
                  {selectedTech.category}
                </span>
                <span>PRODUCTION STANDARD</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                {selectedTech.name}
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {selectedTech.description}
              </p>
            </div>
          </div>

          {/* Right 3D Constellation Viewport */}
          <div className="lg:col-span-6 relative h-[400px] sm:h-[520px] w-full bg-[#090912] border border-white/10">
            <div
              ref={mountRef}
              onMouseEnter={() => setCursor('glow', '3D CLOUD')}
              onMouseLeave={resetCursor}
              className="w-full h-full"
            />
            <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-center justify-between font-mono-tabular text-[11px] text-zinc-400">
              <span>INTERACTIVE 3D CONSTELLATION</span>
              <span>MOVE CURSOR TO TILT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
