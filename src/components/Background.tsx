import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { VISUAL_ASSETS } from '../data/studioData';

export const Background: React.FC = () => {
  const lightRef = useRef<HTMLDivElement>(null);
  const canvasHolderRef = useRef<HTMLDivElement>(null);

  // Layer 7: Mouse-reactive lighting
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${currentX - 320}px, ${currentY - 320}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Layer 4 & 5: Persistent ultra-lightweight ambient WebGL particles & slow wireframe geometry
  useEffect(() => {
    const holder = canvasHolderRef.current;
    if (!holder) return;

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(1);
    holder.innerHTML = '';
    holder.appendChild(renderer.domElement);

    // Subtle floating dust particles
    const count = 90;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 18;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x8b70ff,
      size: 0.03,
      transparent: true,
      opacity: 0.3,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // Slow ambient WebGL icosahedron silhouette in deep background
    const wireGeo = new THREE.IcosahedronGeometry(3.8, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x6d4aff,
      wireframe: true,
      transparent: true,
      opacity: 0.035,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.015;
      wireMesh.rotation.y = -t * 0.02;
      wireMesh.rotation.x = t * 0.01;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      pGeo.dispose();
      pMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Layer 1 & 2: Subtle atmospheric abstract texture at very low opacity */}
      <img
        src={VISUAL_ASSETS.heroArchitecture}
        alt=""
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover opacity-[0.04] scale-105 blur-2xl"
      />

      {/* Layer 3 & 8: Slow-moving volumetric ambient light sources */}
      <div className="absolute -top-48 -left-48 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(109,74,255,0.08)_0%,transparent_70%)] blur-3xl animate-pulse" />
      <div className="absolute -bottom-48 -right-48 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] blur-3xl" />

      {/* Layer 4 & 5: Persistent ambient WebGL shapes & particles */}
      <div ref={canvasHolderRef} className="absolute inset-0" />

      {/* Layer 7: Mouse-reactive volumetric spotlight */}
      <div
        ref={lightRef}
        className="fixed top-0 left-0 w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.07)_0%,rgba(59,130,246,0.02)_45%,transparent_70%)] will-change-transform"
      />

      {/* Layer 6: Film grain overlay */}
      <div className="nova-grain absolute inset-0" />
    </div>
  );
};
