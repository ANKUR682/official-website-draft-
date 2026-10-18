import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3D, Layers, Sparkles } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

type ArtifactFinish = 'obsidian' | 'cobalt' | 'wireframe';

export const FeaturedProject3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [finish, setFinish] = useState<ArtifactFinish>('obsidian');
  const [exploded, setExploded] = useState(false);
  const finishRef = useRef<ArtifactFinish>(finish);
  const explodedRef = useRef<boolean>(exploded);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    finishRef.current = finish;
  }, [finish]);

  useEffect(() => {
    explodedRef.current = exploded;
  }, [exploded]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 6.2);

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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Multi-Part Spatial Artifact (ARC Optical Core)
    const artifactGroup = new THREE.Group();
    scene.add(artifactGroup);

    const sharedMat = new THREE.MeshPhysicalMaterial({
      color: 0x161622,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      iridescence: 0.8,
    });

    // Center Torus Knot Core
    const knotGeo = new THREE.TorusKnotGeometry(0.88, 0.24, 140, 24);
    const knotMesh = new THREE.Mesh(knotGeo, sharedMat);
    artifactGroup.add(knotMesh);

    // Outer Precision Shell Rings (Expand outward when exploded is true)
    const topRingGeo = new THREE.CylinderGeometry(1.65, 1.65, 0.18, 64, 1, true);
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: 0x6d4aff,
      metalness: 0.85,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const topRing = new THREE.Mesh(topRingGeo, ringMat);
    topRing.position.y = 0.65;
    artifactGroup.add(topRing);

    const bottomRing = new THREE.Mesh(topRingGeo, ringMat);
    bottomRing.position.y = -0.65;
    artifactGroup.add(bottomRing);

    // Orbiting Satellite Nodes
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.16, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.9,
      metalness: 0.8,
      roughness: 0.2,
    });

    for (let i = 0; i < 6; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      satellites.push(sat);
      artifactGroup.add(sat);
    }

    // Three-Point Studio Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x7c5cff, 9, 14);
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x3b82f6, 6, 12);
    fillLight.position.set(3, -3, 3);
    scene.add(fillLight);

    // Pointer Drag Rotation State
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = 0.4;
    let rotX = 0.2;
    let velX = 0;
    let velY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      velY = dx * 0.008;
      velX = dy * 0.008;
      rotY += velY;
      rotX = Math.max(-1.2, Math.min(1.2, rotX + velX));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

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

      // Update Material Finish
      if (finishRef.current === 'wireframe') {
        sharedMat.wireframe = true;
        sharedMat.color.setHex(0x8b70ff);
        ringMat.wireframe = true;
      } else if (finishRef.current === 'cobalt') {
        sharedMat.wireframe = false;
        sharedMat.color.setHex(0x1d4ed8);
        ringMat.wireframe = false;
      } else {
        sharedMat.wireframe = false;
        sharedMat.color.setHex(0x161622);
        ringMat.wireframe = false;
      }

      // Inertia + auto-rotation
      if (!isDragging) {
        velX *= 0.94;
        velY *= 0.94;
        rotY += 0.0045 + velY;
        rotX += velX;
      }

      artifactGroup.rotation.y = rotY;
      artifactGroup.rotation.x = rotX;

      // Exploded Assembly Interpolation
      const targetRingOffset = explodedRef.current ? 1.35 : 0.65;
      topRing.position.y += (targetRingOffset - topRing.position.y) * 0.08;
      bottomRing.position.y += (-targetRingOffset - bottomRing.position.y) * 0.08;
      topRing.rotation.y = -t * 0.4;
      bottomRing.rotation.y = t * 0.4;

      const satRadius = explodedRef.current ? 2.45 : 1.75;
      satellites.forEach((sat, idx) => {
        const angle = (idx / satellites.length) * Math.PI * 2 + t * 0.5;
        sat.position.x = Math.cos(angle) * satRadius;
        sat.position.z = Math.sin(angle) * satRadius;
        sat.position.y = Math.sin(t * 1.5 + idx) * 0.25;
        sat.rotation.x = t;
        sat.rotation.y = t;
      });

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      domElem.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      knotGeo.dispose();
      topRingGeo.dispose();
      satGeo.dispose();
      sharedMat.dispose();
      ringMat.dispose();
      satMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative py-28 md:py-36 px-6 sm:px-12 bg-[#090910] border-b border-white/10 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative & Controls */}
          <div className="lg:col-span-5 space-y-8 z-10">
            <div className="flex items-center gap-3 font-mono-tabular text-xs tracking-[0.2em] text-[#8B70FF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FEATURED 3D LAB SHOWCASE</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] leading-[0.96] text-white">
              A DIGITAL WORLD, BUILT FROM SCRATCH.
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Every surface, reflection, and physics constraint is engineered in real time. Grab and rotate the spatial optical core to inspect our WebGL material pipeline.
            </p>

            {/* Interactive Controls Panel */}
            <div className="space-y-4 pt-2">
              <div>
                <p className="font-mono-tabular text-[11px] uppercase tracking-widest text-zinc-400 mb-2.5">
                  MATERIAL FINISH
                </p>
                <div className="inline-flex items-center gap-1.5 p-1 bg-[#070709] border border-white/10">
                  {(['obsidian', 'cobalt', 'wireframe'] as ArtifactFinish[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFinish(item)}
                      onMouseEnter={() => setCursor('button')}
                      onMouseLeave={resetCursor}
                      className={`px-3.5 py-2 text-xs font-mono-tabular uppercase tracking-wider transition-colors whitespace-nowrap ${
                        finish === item
                          ? 'bg-[#6D4AFF] text-white'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setExploded(!exploded)}
                  onMouseEnter={() => setCursor('button')}
                  onMouseLeave={resetCursor}
                  className={`inline-flex items-center gap-2.5 px-5 py-3 text-xs font-mono-tabular uppercase tracking-wider border transition-colors whitespace-nowrap ${
                    exploded
                      ? 'bg-white text-black border-white font-semibold'
                      : 'bg-white/5 text-white border-white/15 hover:border-[#7C5CFF]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>{exploded ? 'COLLAPSE ASSEMBLY' : 'EXPLODED VIEW'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Interactive 360° 3D Viewport */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[540px] w-full bg-[#060609] border border-white/10 overflow-hidden cursor-grab active:cursor-grabbing">
            <div
              ref={mountRef}
              onMouseEnter={() => setCursor('glow', 'DRAG 3D')}
              onMouseLeave={resetCursor}
              className="w-full h-full"
            />

            {/* Floating Non-Obtrusive Viewport HUD */}
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 bg-black/50 backdrop-blur-md border border-white/10 text-xs font-mono-tabular text-zinc-300">
              <span className="inline-flex items-center gap-2">
                <Rotate3D className="w-4 h-4 text-[#7C5CFF]" />
                <span>CLICK &amp; DRAG TO ORBIT 360°</span>
              </span>
              <span className="text-zinc-400">REAL-TIME PBR SHADER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
