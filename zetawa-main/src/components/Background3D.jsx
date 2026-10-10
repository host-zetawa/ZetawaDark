import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

const Background3D = () => {
  const containerRef = useRef(null);
  const location = useLocation();
  const [hasWebGL, setHasWebGL] = useState(true);

  // Check if current route is admin
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

    // Determine initial dimensions strictly from container
    const getContainerSize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 500;
      return { width: w, height: h };
    };

    const initialSize = getContainerSize();

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      initialSize.width / initialSize.height,
      0.5,
      100
    );
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(initialSize.width, initialSize.height);
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
    canvas.style.zIndex = '0';

    // Disposables registry for complete cleanup
    const disposables = [];
    const registerDisposable = (item) => {
      if (item && typeof item.dispose === 'function') disposables.push(item);
      return item;
    };

    // Helper: generate soft circular point texture (prevents square confetti)
    const createCircleTexture = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, 64, 64);
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      const tex = new THREE.CanvasTexture(c);
      return tex;
    };

    const circleTexture = registerDisposable(createCircleTexture());

    // Layout helper for responsive scaling and positioning
    const calcLayout = (w, h) => {
      const isNarrow = w < 480;
      const isMedium = w < 840;
      const isShort = h < 520;
      
      let scale = 0.95;
      if (isNarrow) scale = 0.52;
      else if (isMedium || isShort) scale = 0.65;
      
      let posX = (isMedium || isShort) ? 0 : 2.0;
      let posY = isShort ? 0 : (isMedium ? 0.2 : 0);
      
      return { scale, posX, posY };
    };

    const initialLayout = calcLayout(initialSize.width, initialSize.height);

    // --------------------------------------------------------------------------
    // 3D Objects: Logo-Echo Wireframe Icosahedron & Orbiting Rings
    // --------------------------------------------------------------------------
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const isMobile = initialSize.width < 768;

    mainGroup.position.set(initialLayout.posX, initialLayout.posY, 0);
    mainGroup.scale.set(initialLayout.scale, initialLayout.scale, initialLayout.scale);

    // 1. Wireframe icosahedron (Brand Maroon #6B2D3A)
    const icoGeom = registerDisposable(new THREE.IcosahedronGeometry(1.5, 1));
    const icoMat = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0x6b2d3a,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.25 : 0.5,
      blending: THREE.NormalBlending
    }));
    const icoMesh = new THREE.Mesh(icoGeom, icoMat);
    mainGroup.add(icoMesh);

    // Inner geometric nucleus (Orange #F28C28)
    const innerGeom = registerDisposable(new THREE.IcosahedronGeometry(0.95, 0));
    const innerMat = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0xf28c28,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.3 : 0.6,
      blending: THREE.NormalBlending
    }));
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    mainGroup.add(innerMesh);

    // Glowing vertices points (round dots)
    const vertexPointsMat = registerDisposable(new THREE.PointsMaterial({
      color: 0xf28c28,
      size: isMobile ? 0.05 : 0.07,
      transparent: true,
      opacity: 0.75,
      map: circleTexture,
      alphaTest: 0.01,
      sizeAttenuation: true,
      blending: THREE.NormalBlending
    }));
    const vertexPoints = new THREE.Points(icoGeom, vertexPointsMat);
    mainGroup.add(vertexPoints);

    // 2. Thin orbiting rings with small satellite dots
    // Tube radius thin (0.005 to 0.008), tilted obliquely so they never render edge-on
    const rings = [];

    // Ring A (Indigo #3B4BC8) - thin tube 0.007, tilted at 45 deg
    const ringGeomA = registerDisposable(new THREE.TorusGeometry(2.2, 0.007, 16, 120));
    const ringMatA = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0x3b4bc8,
      transparent: true,
      opacity: 0.35,
      blending: THREE.NormalBlending
    }));
    const ringMeshA = new THREE.Mesh(ringGeomA, ringMatA);
    ringMeshA.rotation.x = Math.PI / 4;
    ringMeshA.rotation.y = Math.PI / 6;
    mainGroup.add(ringMeshA);
    rings.push({ mesh: ringMeshA, baseRotX: Math.PI / 4, speedZ: 0.003 });

    // Ring B (Orange #F28C28) - thin tube 0.006, tilted at -35 deg
    const ringGeomB = registerDisposable(new THREE.TorusGeometry(2.5, 0.006, 16, 120));
    const ringMatB = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0xf28c28,
      transparent: true,
      opacity: 0.35,
      blending: THREE.NormalBlending
    }));
    const ringMeshB = new THREE.Mesh(ringGeomB, ringMatB);
    ringMeshB.rotation.x = -Math.PI / 3.5;
    ringMeshB.rotation.z = Math.PI / 5;
    mainGroup.add(ringMeshB);
    rings.push({ mesh: ringMeshB, baseRotX: -Math.PI / 3.5, speedY: 0.0025 });

    // Ring C (Coral #E5484D) - thin tube 0.005, tilted at 40 deg
    const ringGeomC = registerDisposable(new THREE.TorusGeometry(2.8, 0.005, 16, 120));
    const ringMatC = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0xe5484d,
      transparent: true,
      opacity: 0.28,
      blending: THREE.NormalBlending
    }));
    const ringMeshC = new THREE.Mesh(ringGeomC, ringMatC);
    ringMeshC.rotation.x = Math.PI / 3;
    ringMeshC.rotation.y = -Math.PI / 7;
    mainGroup.add(ringMeshC);
    rings.push({ mesh: ringMeshC, baseRotX: Math.PI / 3, speedZ: -0.002 });

    // Orbiting Satellite Dots - small radius 0.055
    const dotGeom = registerDisposable(new THREE.SphereGeometry(0.055, 16, 16));
    const dotMatOrange = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0xf28c28,
      transparent: true,
      opacity: 0.8,
      blending: THREE.NormalBlending
    }));
    const dotMatIndigo = registerDisposable(new THREE.MeshBasicMaterial({
      color: 0x3b4bc8,
      transparent: true,
      opacity: 0.8,
      blending: THREE.NormalBlending
    }));

    const satelliteA = new THREE.Mesh(dotGeom, dotMatOrange);
    const satelliteB = new THREE.Mesh(dotGeom, dotMatIndigo);
    mainGroup.add(satelliteA);
    mainGroup.add(satelliteB);

    // 3. Ambient round particle field (260 on desktop, 100 on mobile/small)
    const particleCount = isMobile ? 100 : 260;
    const particleCoords = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0xf28c28), // Orange
      new THREE.Color(0x3b4bc8), // Indigo
      new THREE.Color(0x6b2d3a), // Maroon
      new THREE.Color(0xe5484d), // Coral
    ];

    for (let i = 0; i < particleCount; i++) {
      particleCoords[i * 3] = (Math.random() - 0.5) * 14;
      particleCoords[i * 3 + 1] = (Math.random() - 0.5) * 9;
      particleCoords[i * 3 + 2] = (Math.random() - 0.5) * 6 - 0.5;

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
      opacity: isMobile ? 0.35 : 0.45,
      map: circleTexture,
      alphaTest: 0.01,
      sizeAttenuation: true,
      blending: THREE.NormalBlending
    }));

    const particleField = new THREE.Points(particleGeom, particleMat);
    scene.add(particleField);

    // --------------------------------------------------------------------------
    // Mouse Parallax, Intersection & Resize Listeners
    // --------------------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handlePointerMove = (e) => {
      if (window.matchMedia && !window.matchMedia('(hover: hover)').matches) return;
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // IntersectionObserver to pause rendering when scrolled out of view
    let isIntersecting = true;
    let intersectionObserver = null;
    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(([entry]) => {
        isIntersecting = entry.isIntersecting;
      }, { threshold: 0.02 });
      intersectionObserver.observe(container);
    }

    const updateDimensions = () => {
      const { width, height } = getContainerSize();
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const layout = calcLayout(width, height);
      mainGroup.position.x = layout.posX;
      mainGroup.position.y = layout.posY;
      mainGroup.scale.set(layout.scale, layout.scale, layout.scale);
    };

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateDimensions();
      });
      resizeObserver.observe(container);
    }
    window.addEventListener('resize', updateDimensions);

    // Reduced-motion initial static render
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
      return () => {
        if (resizeObserver) resizeObserver.disconnect();
        if (intersectionObserver) intersectionObserver.disconnect();
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('resize', updateDimensions);
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

      if (!isTabVisible || !isIntersecting) return;

      const elapsedTime = clock.getElapsedTime();

      // Gentle subtle camera parallax (confined so objects never fly off)
      targetCameraX = mouseX * 0.25;
      targetCameraY = -mouseY * 0.2;
      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Rotate primary wireframe geometries smoothly
      icoMesh.rotation.x += 0.0025;
      icoMesh.rotation.y += 0.004;
      innerMesh.rotation.x -= 0.004;
      innerMesh.rotation.y -= 0.003;

      // Orbiting rings: gentle rotation without flipping edge-on
      rings.forEach((r) => {
        if (r.speedZ) r.mesh.rotation.z += r.speedZ;
        if (r.speedY) r.mesh.rotation.y += r.speedY;
      });

      // Orbiting satellite dots: constrained smooth ellipses
      const angleA = elapsedTime * 0.7;
      satelliteA.position.set(
        Math.cos(angleA) * 2.2,
        Math.sin(angleA) * 2.2 * Math.sin(Math.PI / 4),
        Math.sin(angleA) * 2.2 * Math.cos(Math.PI / 4) * 0.6
      );

      const angleB = -elapsedTime * 0.55;
      satelliteB.position.set(
        Math.cos(angleB) * 2.5 * Math.cos(-Math.PI / 3.5),
        Math.sin(angleB) * 2.5,
        Math.cos(angleB) * 2.5 * Math.sin(-Math.PI / 3.5) * 0.5
      );

      // Gentle particle field drift
      particleField.rotation.y = elapsedTime * 0.01;
      particleField.rotation.x = Math.sin(elapsedTime * 0.008) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      if (intersectionObserver) intersectionObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', updateDimensions);
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
        position: 'absolute',
        inset: 0,
        zIndex: 0,
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
          pointerEvents: 'none',
          zIndex: 0
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
