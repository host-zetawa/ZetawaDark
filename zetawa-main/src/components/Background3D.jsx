import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

const Background3D = () => {
  const containerRef = useRef(null);
  const location = useLocation();
  const [hasWebGL, setHasWebGL] = useState(true);

  // Check if current route is admin or dense dashboard
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) return;

    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // WebGL support test
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    let animationFrameId = null;
    let isTabVisible = true;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);
    const canvas = renderer.domElement;
    canvas.className = 'three-background-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';

    // Disposables registry for complete cleanup
    const disposables = [];
    const registerDisposable = (item) => {
      if (item && typeof item.dispose === 'function') disposables.push(item);
      return item;
    };

    // --------------------------------------------------------------------------
    // 3D Objects: Logo-Echo Wireframe Icosahedron & Orbiting Rings
    // --------------------------------------------------------------------------
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const isMobile = window.innerWidth < 768;

    // Responsive initial position
    // Desktop: object right (x: 2.1). Mobile: centered (x: 0)
    const targetBaseX = isMobile ? 0 : 2.1;
    const targetScale = isMobile ? 0.72 : 1.0;
    mainGroup.position.set(targetBaseX, isMobile ? 0.2 : 0, 0);
    mainGroup.scale.set(targetScale, targetScale, targetScale);

    // 1. Wireframe icosahedron (Brand Maroon #6B2D3A & Orange vertices)
    const icoGeom = registerDisposable(new THREE.IcosahedronGeometry(1.65, 1));
    const icoMat = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0x6b2d3a,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.35 : 0.65,
      blending: THREE.NormalBlending
    }));
    const icoMesh = new THREE.Mesh(icoGeom, icoMat);
    mainGroup.add(icoMesh);

    // Inner geometric nucleus (Orange #F28C28)
    const innerGeom = registerDisposable(new THREE.IcosahedronGeometry(1.05, 0));
    const innerMat = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0xf28c28,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.45 : 0.8,
      blending: THREE.NormalBlending
    }));
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    mainGroup.add(innerMesh);

    // Glowing vertices points
    const pointsMat = registerDisposable(new THREE.PointsMaterial({
      color: 0xf28c28,
      size: isMobile ? 0.06 : 0.08,
      transparent: true,
      opacity: isMobile ? 0.6 : 0.9,
      blending: THREE.NormalBlending
    }));
    const vertexPoints = new THREE.Points(icoGeom, pointsMat);
    mainGroup.add(vertexPoints);

    // 2. Thin orbiting rings with small satellite dots
    const rings = [];

    // Ring A (Indigo #3B4BC8)
    const ringGeomA = registerDisposable(new THREE.TorusGeometry(2.35, 0.014, 16, 100));
    const ringMatA = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0x3b4bc8,
      transparent: true,
      opacity: isMobile ? 0.35 : 0.65,
      blending: THREE.NormalBlending
    }));
    const ringMeshA = new THREE.Mesh(ringGeomA, ringMatA);
    ringMeshA.rotation.x = Math.PI / 3;
    ringMeshA.rotation.y = Math.PI / 6;
    mainGroup.add(ringMeshA);
    rings.push({ mesh: ringMeshA, speedX: 0.003, speedY: 0.005 });

    // Ring B (Orange #F28C28)
    const ringGeomB = registerDisposable(new THREE.TorusGeometry(2.7, 0.012, 16, 100));
    const ringMatB = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0xf28c28,
      transparent: true,
      opacity: isMobile ? 0.35 : 0.65,
      blending: THREE.NormalBlending
    }));
    const ringMeshB = new THREE.Mesh(ringGeomB, ringMatB);
    ringMeshB.rotation.x = -Math.PI / 4;
    ringMeshB.rotation.z = Math.PI / 5;
    mainGroup.add(ringMeshB);
    rings.push({ mesh: ringMeshB, speedX: -0.004, speedZ: 0.003 });

    // Ring C (Coral #E5484D)
    const ringGeomC = registerDisposable(new THREE.TorusGeometry(3.05, 0.01, 16, 100));
    const ringMatC = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0xe5484d,
      transparent: true,
      opacity: isMobile ? 0.25 : 0.5,
      blending: THREE.NormalBlending
    }));
    const ringMeshC = new THREE.Mesh(ringGeomC, ringMatC);
    ringMeshC.rotation.y = Math.PI / 2.5;
    mainGroup.add(ringMeshC);
    rings.push({ mesh: ringMeshC, speedY: 0.002, speedZ: -0.004 });

    // Satellite Dots on Ring A & B
    const dotGeom = registerDisposable(new THREE.SphereGeometry(0.05, 12, 12));
    const dotMatOrange = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0xf28c28,
      blending: THREE.NormalBlending
    }));
    const dotMatIndigo = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0x3b4bc8,
      blending: THREE.NormalBlending
    }));

    const satelliteA = new THREE.Mesh(dotGeom, dotMatOrange);
    const satelliteB = new THREE.Mesh(dotGeom, dotMatIndigo);
    mainGroup.add(satelliteA);
    mainGroup.add(satelliteB);

    // 3. Ambient star/particle field
    const particleCount = isMobile ? 140 : 420;
    const particleCoords = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0xf28c28), // Orange
      new THREE.Color(0x3b4bc8), // Indigo
      new THREE.Color(0x6b2d3a), // Maroon
      new THREE.Color(0xe5484d), // Coral
    ];

    for (let i = 0; i < particleCount; i++) {
      particleCoords[i * 3] = (Math.random() - 0.5) * 18;
      particleCoords[i * 3 + 1] = (Math.random() - 0.5) * 14;
      particleCoords[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    const particleGeom = registerDisposable(new THREE.BufferGeometry());
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = registerDisposable(new THREE.PointsMaterial({
      size: isMobile ? 0.045 : 0.065,
      vertexColors: true,
      transparent: true,
      opacity: isMobile ? 0.55 : 0.85,
      blending: THREE.NormalBlending
    }));
    const particleField = new THREE.Points(particleGeom, particleMat);
    scene.add(particleField);

    // --------------------------------------------------------------------------
    // Mouse & Touch Parallax + Smooth Easing
    // --------------------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;
    let scrollYOffset = 0;

    const handlePointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      mouseX = (clientX / window.innerWidth - 0.5) * 2;
      mouseY = (clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollYOffset = (window.scrollY || window.pageYOffset || 0) * 0.0015;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle tab visibility (pause when backgrounded to preserve CPU/GPU)
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Handle Resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const currentlyMobile = width < 768;
      mainGroup.position.x = currentlyMobile ? 0 : 2.1;
      mainGroup.scale.set(
        currentlyMobile ? 0.72 : 1.0,
        currentlyMobile ? 0.72 : 1.0,
        currentlyMobile ? 0.72 : 1.0
      );
    };
    window.addEventListener('resize', handleResize);

    // Initial render for reduced-motion users
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('touchmove', handlePointerMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        disposables.forEach((item) => item.dispose());
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        renderer.dispose();
      };
    }

    // --------------------------------------------------------------------------
    // Animation Loop
    // --------------------------------------------------------------------------
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax easing
      targetCameraX = mouseX * 0.45;
      targetCameraY = -mouseY * 0.35 - scrollYOffset * 0.35;
      camera.position.x += (targetCameraX - camera.position.x) * 0.045;
      camera.position.y += (targetCameraY - camera.position.y) * 0.045;
      camera.lookAt(0, 0, 0);

      // Rotate primary wireframe geometries
      icoMesh.rotation.x += 0.003;
      icoMesh.rotation.y += 0.005;
      innerMesh.rotation.x -= 0.006;
      innerMesh.rotation.y -= 0.004;

      // Orbiting rings
      rings.forEach((r) => {
        if (r.speedX) r.mesh.rotation.x += r.speedX;
        if (r.speedY) r.mesh.rotation.y += r.speedY;
        if (r.speedZ) r.mesh.rotation.z += r.speedZ;
      });

      // Orbiting satellite dots
      const angleA = elapsedTime * 0.8;
      satelliteA.position.set(
        Math.cos(angleA) * 2.35,
        Math.sin(angleA) * 2.35 * Math.sin(Math.PI / 3),
        Math.sin(angleA) * 2.35 * Math.cos(Math.PI / 3)
      );

      const angleB = -elapsedTime * 0.65;
      satelliteB.position.set(
        Math.cos(angleB) * 2.7 * Math.cos(-Math.PI / 4),
        Math.sin(angleB) * 2.7,
        Math.cos(angleB) * 2.7 * Math.sin(-Math.PI / 4)
      );

      // Slow particle field drift
      particleField.rotation.y = elapsedTime * 0.015;
      particleField.rotation.x = Math.sin(elapsedTime * 0.01) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      disposables.forEach((item) => item.dispose());
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      renderer.dispose();
    };
  }, [isAdminRoute]);

  if (isAdminRoute) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {/* 3D WebGL Canvas Holder */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Static Fallback Gradient if WebGL fails */}
      {!hasWebGL && (
        <div
          className="three-fallback-gradient"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 80% 30%, rgba(242, 140, 40, 0.12) 0%, transparent 60%), radial-gradient(circle at 20% 70%, rgba(59, 75, 200, 0.1) 0%, transparent 60%)'
          }}
        />
      )}
    </div>
  );
};

export default Background3D;
