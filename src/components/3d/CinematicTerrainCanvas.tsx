'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function CinematicTerrainCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const testCanvas = document.createElement('canvas');
        return !!(testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'));
      } catch {
        return false;
      }
    }
    return true;
  });

  useEffect(() => {
    if (!webGLSupported) return;
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#071126', 0.016);

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 300);
    camera.position.set(0, 4, 26);
    camera.lookAt(0, 3, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Cinematic Sunset meets Deep Marine Ambience)
    const ambientLight = new THREE.AmbientLight('#0d2540', 2.0);
    scene.add(ambientLight);

    // Golden Sunset Directional Light (low horizon angle with realistic warm cast)
    const sunLight = new THREE.DirectionalLight('#ff9a52', 4.2);
    sunLight.position.set(22, 8, -20);
    scene.add(sunLight);

    // High-Altitude Cyan/Teal Atmospheric Fill
    const tealFill = new THREE.DirectionalLight('#22d3ee', 1.8);
    tealFill.position.set(-25, 18, 12);
    scene.add(tealFill);

    // Warm Sunset Rim Light on Ridges and Waves
    const rimLight = new THREE.DirectionalLight('#fb923c', 2.2);
    rimLight.position.set(0, -2, -15);
    scene.add(rimLight);

    // Secondary Warm Ember Horizon Light
    const amberLight = new THREE.PointLight('#f97316', 4.5, 75);
    amberLight.position.set(2, 3, -8);
    scene.add(amberLight);

    // 3. Coastal Mountains & Sea Cliffs Geometry
    // Mountain Plane with multi-octave ridge deformation and fjord slopes
    const mountainGeo = new THREE.PlaneGeometry(140, 70, 80, 50);
    const mPos = mountainGeo.attributes.position;
    for (let i = 0; i < mPos.count; i++) {
      const u = mPos.getX(i);
      const v = mPos.getY(i);
      const distFromCenter = Math.abs(u) / 70;
      
      // Ridge waves
      const ridge1 = Math.sin(u * 0.11) * Math.cos(v * 0.13) * 5.2;
      const ridge2 = Math.sin(u * 0.24 + 1.1) * Math.cos(v * 0.22) * 2.6;
      const ridge3 = Math.sin(u * 0.55) * 1.2;
      const cliffLift = Math.pow(distFromCenter, 1.35) * 14 + (v + 35) * 0.22;
      mPos.setZ(i, Math.max(0, ridge1 + ridge2 + ridge3 + cliffLift));
    }
    mountainGeo.computeVertexNormals();

    const mountainMat = new THREE.MeshStandardMaterial({
      color: '#0e1e3c',
      roughness: 0.85,
      metalness: 0.15,
      flatShading: true
    });

    const mountains = new THREE.Mesh(mountainGeo, mountainMat);
    mountains.rotation.x = -Math.PI / 2.32;
    mountains.position.set(0, -3.2, -30);
    scene.add(mountains);

    // 3b. Offshore Islands & Coastal Pinnacles
    const islandGeo = new THREE.ConeGeometry(5.5, 7.5, 7);
    const islandMat = new THREE.MeshStandardMaterial({
      color: '#091830',
      roughness: 0.8,
      metalness: 0.2,
      flatShading: true
    });

    const island1 = new THREE.Mesh(islandGeo, islandMat);
    island1.position.set(-18, -3.0, -10);
    island1.rotation.y = 0.5;
    scene.add(island1);

    const island2 = new THREE.Mesh(islandGeo, islandMat);
    island2.scale.set(0.65, 0.7, 0.65);
    island2.position.set(20, -3.2, -14);
    island2.rotation.y = -0.8;
    scene.add(island2);

    const island3 = new THREE.Mesh(islandGeo, islandMat);
    island3.scale.set(0.45, 0.55, 0.45);
    island3.position.set(25, -3.4, -9);
    scene.add(island3);

    // 4. Undulating Ocean Surface with Subtle Foam Reflection
    const waterGeo = new THREE.PlaneGeometry(160, 100, 70, 50);
    const waterMat = new THREE.MeshStandardMaterial({
      color: '#071f3a',
      roughness: 0.18,
      metalness: 0.82,
      flatShading: true
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(0, -4.5, 6);
    scene.add(water);

    const initialWaterZ: number[] = [];
    const wPos = waterGeo.attributes.position;
    for (let i = 0; i < wPos.count; i++) {
      initialWaterZ.push(wPos.getZ(i));
    }

    // 5. Volumetric Cloud Clusters (Low-poly Drifting Puffs with Golden Edge Lighting)
    const cloudGroup = new THREE.Group();
    const cloudGeo = new THREE.DodecahedronGeometry(2.0, 1);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: '#f8fafc',
      roughness: 0.92,
      metalness: 0.08,
      transparent: true,
      opacity: 0.46,
      flatShading: true
    });

    const clouds: THREE.Mesh[] = [];
    const cloudCount = 18;
    for (let i = 0; i < cloudCount; i++) {
      const mesh = new THREE.Mesh(cloudGeo, cloudMat);
      const scale = 1.2 + Math.random() * 2.4;
      mesh.scale.set(scale * 1.9, scale * 0.75, scale * 1.3);
      mesh.position.set(
        (Math.random() - 0.5) * 85,
        5.5 + Math.random() * 10,
        -16 + (Math.random() - 0.5) * 22
      );
      cloudGroup.add(mesh);
      clouds.push(mesh);
    }
    scene.add(cloudGroup);

    // 6. Interactive Mouse Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2;
      mouseY = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Render Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.05 : 1.0;

      // Animate ocean waves
      const positions = waterGeo.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const u = positions.getX(i);
        const v = positions.getY(i);
        const wave =
          Math.sin(u * 0.18 + elapsedTime * 1.2 * speed) * 0.35 +
          Math.cos(v * 0.22 + elapsedTime * 0.9 * speed) * 0.25;
        positions.setZ(i, initialWaterZ[i] + wave);
      }
      positions.needsUpdate = true;

      // Drift clouds slowly
      clouds.forEach((cloud) => {
        cloud.position.x += 0.015 * speed;
        if (cloud.position.x > 45) {
          cloud.position.x = -45;
        }
      });

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      if (!prefersReducedMotion) {
        camera.position.x = targetX * 3.5;
        camera.position.y = 4 - targetY * 1.8;
        camera.lookAt(targetX * 0.8, 2.8, -10);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      mountainGeo.dispose();
      mountainMat.dispose();
      islandGeo.dispose();
      islandMat.dispose();
      waterGeo.dispose();
      waterMat.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [webGLSupported]);

  if (!webGLSupported) {
    return <LayeredAtmosphericFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    />
  );
}

// Fallback for devices without WebGL or low-spec hardware
export function LayeredAtmosphericFallback() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Sunset Radiance Gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 65% 35%, rgba(249,115,22,0.45) 0%, rgba(13,148,136,0.2) 45%, rgba(4,8,20,0.9) 75%)'
        }}
      />
      {/* Mountain Silhouettes */}
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#040814] via-[#09152e] to-transparent opacity-90" />
      <div className="absolute inset-0 topo-grid-pattern opacity-25" />
    </div>
  );
}
