import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

const CONNECTION_DISTANCE = 3.2;
const BASE_EDGE_OPACITY = 0.07;
const GLOBAL_SCENE_OPACITY = 0.62;
const HUB_ATTRACTION_RADIUS = 4;
const HUB_MIN_DISTANCE = 0.5;
const CURSOR_REPEL_RADIUS = 1.5;
const CURSOR_ATTRACT_RADIUS = 4;
const BOUND_X = 7;
const BOUND_Y = 5;
const BOUND_Z = 3;

const HUB_POSITIONS = [
  [-4.5, 2.5, -1],
  [-2.25, -2.25, 0.75],
  [0, 0.5, -0.5],
  [2.25, 2.25, 0.75],
  [4.5, -2.5, -1],
] as const;
const HUB_COUNT = HUB_POSITIONS.length;

interface ThemeColors {
  accent: THREE.Color;
  spark: THREE.Color;
}

function readThemeColors(): ThemeColors {
  const styles = getComputedStyle(document.documentElement);
  const accent = styles.getPropertyValue('--color-accent').trim() || '#3b82f6';
  const spark = styles.getPropertyValue('--color-spark').trim() || '#f59e0b';
  return {
    accent: new THREE.Color(accent),
    spark: new THREE.Color(spark),
  };
}

interface ParticleData {
  positions: Float32Array;
  velocities: Float32Array;
  colors: Float32Array;
  opacities: Float32Array;
  sizes: Float32Array;
  count: number;
  hubCount: number;
}

function createParticleData(count: number, themeColors: ThemeColors): ParticleData {
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const opacities = new Float32Array(count);
  const sizes = new Float32Array(count);
  const hubCount = Math.min(HUB_COUNT, count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const isHub = i < hubCount;

    if (isHub) {
      const [x, y, z] = HUB_POSITIONS[i];
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
    } else {
      positions[i3] = (Math.random() - 0.5) * 14;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 6;
    }

    const velocityScale = isHub ? 0.001 : 0.003;
    velocities[i3] = (Math.random() - 0.5) * velocityScale;
    velocities[i3 + 1] = (Math.random() - 0.5) * velocityScale;
    velocities[i3 + 2] =
      (Math.random() - 0.5) * (isHub ? 0.001 : 0.002);

    const isAmber = !isHub && i % 12 === 0;
    const color = isAmber ? themeColors.spark : themeColors.accent;
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    opacities[i] = isHub
      ? 0.45 + Math.random() * 0.15
      : 0.18 + Math.random() * 0.12;
    sizes[i] = isHub
      ? 3 + Math.random() * 1.5
      : 1.2 + Math.random() * 0.6;
  }

  return {
    positions,
    velocities,
    colors,
    opacities,
    sizes,
    count,
    hubCount,
  };
}

interface NetworkSceneProps {
  isActive: boolean;
  themeColors: ThemeColors;
}

function NetworkScene({ isActive, themeColors }: NetworkSceneProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const linePositionsRef = useRef<Float32Array | null>(null);
  const { size, viewport, invalidate } = useThree();

  const particleCount = size.width < 768 ? 22 : 42;
  const maxLineVertices = (particleCount * (particleCount - 1)) / 2 * 2;

  const data = useMemo(
    () => createParticleData(particleCount, themeColors),
    [particleCount, themeColors]
  );

  const particleMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          uGlobalOpacity: { value: GLOBAL_SCENE_OPACITY },
        },
        vertexShader: `
          attribute float aOpacity;
          attribute float aSize;
          attribute vec3 aColor;
          varying float vOpacity;
          varying vec3 vColor;
          uniform float uPixelRatio;

          void main() {
            vOpacity = aOpacity;
            vColor = aColor;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * uPixelRatio * (4.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying float vOpacity;
          varying vec3 vColor;
          uniform float uGlobalOpacity;

          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = smoothstep(0.5, 0.15, dist) * vOpacity * uGlobalOpacity;
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: themeColors.accent,
        transparent: true,
        opacity: BASE_EDGE_OPACITY,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [themeColors]
  );

  useEffect(() => {
    lineMaterial.color.copy(themeColors.accent);
  }, [lineMaterial, themeColors]);

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    if (size.width >= 768) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isActive, size.width]);

  useFrame(() => {
    if (!isActive || !pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    particleMaterial.uniforms.uGlobalOpacity.value = GLOBAL_SCENE_OPACITY;
    if (lineMaterial.opacity !== undefined) {
      lineMaterial.opacity = BASE_EDGE_OPACITY;
    }

    const mouseWorldX = mouseRef.current.x * viewport.width * 0.5;
    const mouseWorldY = mouseRef.current.y * viewport.height * 0.5;

    const hubMinDistanceSq = HUB_MIN_DISTANCE * HUB_MIN_DISTANCE;
    const hubAttractionRadiusSq =
      HUB_ATTRACTION_RADIUS * HUB_ATTRACTION_RADIUS;
    const cursorAttractionRadiusSq =
      CURSOR_ATTRACT_RADIUS * CURSOR_ATTRACT_RADIUS;
    const connectionDistanceSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

    for (let i = 0; i < data.count; i++) {
      const i3 = i * 3;

      positions[i3] += data.velocities[i3];
      positions[i3 + 1] += data.velocities[i3 + 1];
      positions[i3 + 2] += data.velocities[i3 + 2];

      if (i >= data.hubCount) {
        let nearestHubIndex = -1;
        let nearestHubDistanceSq = Number.POSITIVE_INFINITY;

        for (let hubIndex = 0; hubIndex < data.hubCount; hubIndex++) {
          const hubIndex3 = hubIndex * 3;
          const dx = positions[hubIndex3] - positions[i3];
          const dy = positions[hubIndex3 + 1] - positions[i3 + 1];
          const dz = positions[hubIndex3 + 2] - positions[i3 + 2];
          const distanceSq = dx * dx + dy * dy + dz * dz;

          if (distanceSq < nearestHubDistanceSq) {
            nearestHubDistanceSq = distanceSq;
            nearestHubIndex = hubIndex;
          }
        }

        if (
          nearestHubIndex >= 0 &&
          nearestHubDistanceSq > hubMinDistanceSq &&
          nearestHubDistanceSq < hubAttractionRadiusSq
        ) {
          const hubIndex3 = nearestHubIndex * 3;
          const distance = Math.sqrt(nearestHubDistanceSq);
          const pull = 0.0003 * (1 - distance / HUB_ATTRACTION_RADIUS);

          positions[i3] +=
            ((positions[hubIndex3] - positions[i3]) / distance) * pull;
          positions[i3 + 1] +=
            ((positions[hubIndex3 + 1] - positions[i3 + 1]) / distance) * pull;
          positions[i3 + 2] +=
            ((positions[hubIndex3 + 2] - positions[i3 + 2]) / distance) * pull;
        }
      }

      if (size.width >= 768) {
        const dx = positions[i3] - mouseWorldX;
        const dy = positions[i3 + 1] - mouseWorldY;
        const distSq = dx * dx + dy * dy;
        if (distSq < cursorAttractionRadiusSq && distSq > 0.01) {
          const dist = Math.sqrt(distSq);

          if (dist < CURSOR_REPEL_RADIUS) {
            const force = (1 - dist / CURSOR_REPEL_RADIUS) * 0.03;
            positions[i3] += (dx / dist) * force;
            positions[i3 + 1] += (dy / dist) * force;
          } else {
            const force = 0.005;
            positions[i3] -= (dx / dist) * force;
            positions[i3 + 1] -= (dy / dist) * force;
          }
        }
      }

      if (Math.abs(positions[i3]) > BOUND_X) data.velocities[i3] *= -1;
      if (Math.abs(positions[i3 + 1]) > BOUND_Y) data.velocities[i3 + 1] *= -1;
      if (Math.abs(positions[i3 + 2]) > BOUND_Z) data.velocities[i3 + 2] *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    if (linesRef.current) {
      if (!linePositionsRef.current) {
        linePositionsRef.current = new Float32Array(maxLineVertices * 3);
      }

      const linePositions = linePositionsRef.current;
      let vertexCount = 0;

      for (let i = 0; i < data.count; i++) {
        for (let j = i + 1; j < data.count; j++) {
          const i3 = i * 3;
          const j3 = j * 3;
          const dx = positions[i3] - positions[j3];
          const dy = positions[i3 + 1] - positions[j3 + 1];
          const dz = positions[i3 + 2] - positions[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connectionDistanceSq) {
            linePositions[vertexCount++] = positions[i3];
            linePositions[vertexCount++] = positions[i3 + 1];
            linePositions[vertexCount++] = positions[i3 + 2];
            linePositions[vertexCount++] = positions[j3];
            linePositions[vertexCount++] = positions[j3 + 1];
            linePositions[vertexCount++] = positions[j3 + 2];
          }
        }
      }

      const lineGeometry = linesRef.current.geometry as THREE.BufferGeometry;
      let positionAttribute = lineGeometry.getAttribute(
        'position'
      ) as THREE.BufferAttribute | undefined;

      if (!positionAttribute) {
        positionAttribute = new THREE.BufferAttribute(linePositions, 3);
        lineGeometry.setAttribute('position', positionAttribute);
      } else {
        (positionAttribute.array as Float32Array).set(
          linePositions.subarray(0, vertexCount)
        );
        positionAttribute.needsUpdate = true;
      }

      lineGeometry.setDrawRange(0, vertexCount);
    }

    invalidate();
  });

  return (
    <>
      <points ref={pointsRef} material={particleMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aOpacity"
            args={[data.opacities, 1]}
          />
          <bufferAttribute
            attach="attributes-aSize"
            args={[data.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-aColor"
            args={[data.colors, 3]}
          />
        </bufferGeometry>
      </points>
      <lineSegments ref={linesRef} material={lineMaterial}>
        <bufferGeometry />
      </lineSegments>
    </>
  );
}

const ParticleNetwork: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const [visible, setVisible] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [themeColors, setThemeColors] = useState<ThemeColors>(() =>
    typeof document === 'undefined'
      ? { accent: new THREE.Color('#3b82f6'), spark: new THREE.Color('#f59e0b') }
      : readThemeColors()
  );

  const isActive = !reducedMotion && heroInView && tabVisible;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    const syncThemeColors = () => setThemeColors(readThemeColors());

    syncThemeColors();
    const observer = new MutationObserver(syncThemeColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const handleCreated = useCallback((state: { gl: THREE.WebGLRenderer }) => {
    state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, []);

  if (!visible || reducedMotion) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 2]}
      frameloop={isActive ? 'always' : 'demand'}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
      onCreated={handleCreated}
    >
      <NetworkScene isActive={isActive} themeColors={themeColors} />
    </Canvas>
  );
};

export default ParticleNetwork;
