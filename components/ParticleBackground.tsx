import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useReducedMotion } from 'framer-motion';
import { useCanHover } from '../hooks/useCanHover';

const ParticleBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  const canHover = useCanHover();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const update = () => setIsSmallScreen(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);

    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  const particleOptions = useMemo(() => {
    if (prefersReducedMotion) {
      return null;
    }

    const particleCount = isSmallScreen ? 32 : 62;
    const particleSpeed = isSmallScreen ? 0.55 : 0.8;
    const fpsLimit = isSmallScreen ? 45 : 60;
    const hoverEnabled = canHover && !isSmallScreen;

    return {
      fullScreen: { enable: false },
      background: {
        color: { value: 'transparent' },
      },
      fpsLimit,
      interactivity: {
        events: {
          onClick: { enable: false, mode: 'push' },
          onHover: { enable: hoverEnabled, mode: 'grab' },
          resize: { enable: true },
        },
        modes: {
          push: { quantity: 2 },
          grab: {
            distance: 150,
            links: { opacity: 0.35 },
          },
        },
      },
      particles: {
        color: {
          value: ['#94a3b8', '#64748b'],
        },
        links: {
          color: '#94a3b8',
          distance: 140,
          enable: true,
          opacity: 0.22,
          width: 1,
        },
        move: {
          direction: 'none' as const,
          enable: true,
          outModes: {
            default: 'bounce' as const,
          },
          random: false,
          speed: particleSpeed,
          straight: false,
        },
        number: {
          density: { enable: true },
          value: particleCount,
        },
        opacity: {
          value: 0.45,
          animation: {
            enable: true,
            speed: 0.4,
            sync: false,
          },
        },
        shape: { type: 'circle' as const },
        size: {
          value: { min: 1.5, max: 4 },
        },
      },
      detectRetina: true,
    };
  }, [canHover, isSmallScreen, prefersReducedMotion]);

  if (!particleOptions) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0"
      options={particleOptions}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

export default ParticleBackground;
