import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      respectReducedMotion: true,
      prevent: (node) =>
        node === document.body && document.body.style.overflow === 'hidden',
    });

    const unsubscribeScroll = lenis.on('scroll', ScrollTrigger.update);
    let animationFrameId = 0;

    const update = (time: number) => {
      lenis.raf(time);
      animationFrameId = window.requestAnimationFrame(update);
    };

    animationFrameId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      unsubscribeScroll();
      lenis.destroy();
    };
  }, []);
}
