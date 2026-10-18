import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type SculptureMode = 'chrome' | 'glass' | 'wireframe';

interface HeroSceneProps {
  mode?: SculptureMode;
}

export const HeroScene: React.FC<HeroSceneProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, isMobile ? 6.8 : 5.6);

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
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Calm, Minimalist Sculptural Group (positioned softly to the right on desktop)
    const group = new THREE.Group();
    group.position.x = isMobile ? 0 : 1.15;
    scene.add(group);

    // Smooth Brushed Satin Sphere / Torus Form (No chaotic vertex distortion)
    const torusGeo = new THREE.TorusGeometry(1.15, 0.36, 64, 160);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x181822),
      metalness: 0.88,
      roughness: 0.18,
      clearcoat: 0.9,
      clearcoatRoughness: 0.12,
      iridescence: 0.35,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.rotation.x = 0.55;
    torusMesh.rotation.y = -0.35;
    group.add(torusMesh);

    // Single Quiet Orbit Ring
    const ringGeo = new THREE.TorusGeometry(1.78, 0.006, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b70ff,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    group.add(ringMesh);

    // Soft Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x7c5cff, 5, 12);
    rimLight.position.set(-3, 2, 3);
    scene.add(rimLight);

    // Subtle Mouse Parallax State
    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const mobileNow = w < 768;
      camera.aspect = w / h;
      camera.position.z = mobileNow ? 6.8 : 5.6;
      group.position.x = mobileNow ? 0 : 1.15;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Very gentle, calm interpolation
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.035;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.035;

      if (!prefersReducedMotion) {
        // Slow, serene rotation and subtle float
        torusMesh.rotation.z = elapsed * 0.12;
        torusMesh.rotation.y = -0.35 + smoothMouseX * 0.22;
        torusMesh.rotation.x = 0.55 - smoothMouseY * 0.18;

        ringMesh.rotation.z = -elapsed * 0.08;
        group.position.y = Math.sin(elapsed * 0.8) * 0.06;
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      torusGeo.dispose();
      torusMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};
