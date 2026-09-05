import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

const ACCENT_BLUE = new THREE.Color('#3b82f6');
const AMBER_SPARK = new THREE.Color('#f59e0b');
const EDGE_COLOR = new THREE.Color('#3b82f6');
const CONNECTION_DISTANCE = 3.2;
const BASE_EDGE_OPACITY = 0.13;
const HUB_ATTRACTION_RADIUS = 4;
const HUB_MIN_DISTANCE = 0.5;
const CURSOR_REPEL_RADIUS = 1.5;
const CURSOR_ATTRACT_RADIUS = 4;

const HUB_POSITIONS = [
  [-4.5, 2.5, -1],
  [-2.25, -2.25, 0.75],
  [0, 0.5, -0.5],
  [2.25, 2.25, 0.75],
  [4.5, -2.5, -1],
] as const;
const HUB_COUNT = HUB_POSITIONS.length;

interface ParticleData {
  positions: Float32Array;
  velocities: Float32Array;
  colors: Float32Array;
  opacities: Float32Array;
  sizes: Float32Array;
  count: number;
  hubCount: number;
}

function createParticleData(count: number): ParticleData {
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
      // Distribute regular particles in a bounded volume
      positions[i3] = (Math.random() - 0.5) * 14;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 6;
    }

    // Hub nodes drift more slowly than regular particles
    const velocityScale = isHub ? 0.001 : 0.003;
    velocities[i3] = (Math.random() - 0.5) * velocityScale;
    velocities[i3 + 1] = (Math.random() - 0.5) * velocityScale;
    velocities[i3 + 2] =
      (Math.random() - 0.5) * (isHub ? 0.001 : 0.002);

    // Hubs are blue; 1 in 8 regular particles provides an amber spark
    const isAmber = !isHub && i % 8 === 0;
    const color = isAmber ? AMBER_SPARK : ACCENT_BLUE;
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    opacities[i] = isHub
      ? 0.7 + Math.random() * 0.2
      : 0.3 + Math.random() * 0.2;
    sizes[i] = isHub
      ? 4 + Math.random() * 2
      : 1.5 + Math.random();
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
  scrollProgress: number;
  reducedMotion: boolean;
}

function NetworkScene({ scrollProgress, reducedMotion }: NetworkSceneProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { size, viewport } = useThree();

  const particleCount = size.width < 768 ? 28 : 55;

  const data = useMemo(() => createParticleData(particleCount), [particleCount]);

  // Vertex shader for particles with per-particle opacity and size
  const particleMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          uGlobalOpacity: { value: 1.0 },
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

  // Line material for edges
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: EDGE_COLOR,
        transparent: true,
        opacity: BASE_EDGE_OPACITY,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  // Track mouse in normalized device coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    if (size.width >= 768) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [size.width]);

  useFrame(() => {
    if (!pointsRef.current || reducedMotion) return;

    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    // Scroll-driven dispersion: particles drift apart and fade as scroll progresses
    const dispersal = scrollProgress * 4;
    const globalOpacity = Math.max(0, 1 - scrollProgress * 1.5);
    particleMaterial.uniforms.uGlobalOpacity.value = globalOpacity;
    if (lineMaterial.opacity !== undefined) {
      lineMaterial.opacity = BASE_EDGE_OPACITY * globalOpacity;
    }

    // Mouse influence in world coordinates
    const mouseWorldX = mouseRef.current.x * viewport.width * 0.5;
    const mouseWorldY = mouseRef.current.y * viewport.height * 0.5;

    const boundX = 7 + dispersal;
    const boundY = 5 + dispersal;
    const boundZ = 3 + dispersal * 0.5;
    const hubMinDistanceSq = HUB_MIN_DISTANCE * HUB_MIN_DISTANCE;
    const hubAttractionRadiusSq =
      HUB_ATTRACTION_RADIUS * HUB_ATTRACTION_RADIUS;
    const cursorAttractionRadiusSq =
      CURSOR_ATTRACT_RADIUS * CURSOR_ATTRACT_RADIUS;

    for (let i = 0; i < data.count; i++) {
      const i3 = i * 3;

      // Apply velocity
      positions[i3] += data.velocities[i3];
      positions[i3 + 1] += data.velocities[i3 + 1];
      positions[i3 + 2] += data.velocities[i3 + 2];

      // Pull regular particles toward their nearest hub
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

      // Scroll dispersal push
      if (scrollProgress > 0) {
        positions[i3 + 1] -= scrollProgress * 0.02;
      }

      // Mouse repulsion nearby and attraction at medium range
      if (size.width >= 768) {
        const dx = positions[i3] - mouseWorldX;
        const dy = positions[i3 + 1] - mouseWorldY;
        const distSq = dx * dx + dy * dy;
        if (
          distSq < cursorAttractionRadiusSq &&
          distSq > 0.01
        ) {
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

      // Boundary bounce
      if (Math.abs(positions[i3]) > boundX) data.velocities[i3] *= -1;
      if (Math.abs(positions[i3 + 1]) > boundY) data.velocities[i3 + 1] *= -1;
      if (Math.abs(positions[i3 + 2]) > boundZ) data.velocities[i3 + 2] *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update edges
    if (linesRef.current) {
      const linePositions: number[] = [];

      for (let i = 0; i < data.count; i++) {
        for (let j = i + 1; j < data.count; j++) {
          const i3 = i * 3;
          const j3 = j * 3;
          const dx = positions[i3] - positions[j3];
          const dy = positions[i3 + 1] - positions[j3 + 1];
          const dz = positions[i3 + 2] - positions[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            linePositions.push(
              positions[i3], positions[i3 + 1], positions[i3 + 2],
              positions[j3], positions[j3 + 1], positions[j3 + 2]
            );
          }
        }
      }

      const lineGeometry = linesRef.current.geometry as THREE.BufferGeometry;
      lineGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      lineGeometry.attributes.position.needsUpdate = true;
    }
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

interface ParticleNetworkProps {
  scrollProgress?: number;
}

const ParticleNetwork: React.FC<ParticleNetworkProps> = ({ scrollProgress = 0 }) => {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const reducedMotion = Boolean(prefersReducedMotion);

  // Delay mount slightly so hero text appears first
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCreated = useCallback((state: { gl: THREE.WebGLRenderer }) => {
    state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, []);

  if (!visible) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
      onCreated={handleCreated}
    >
      <NetworkScene
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
      />
    </Canvas>
  );
};

export default ParticleNetwork;
