import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Stagger-reveal children of a container when it enters the viewport.
 * Each direct child fades in and slides up.
 */
export function useStaggerReveal(
  selector: string,
  options?: { y?: number; stagger?: number; duration?: number; start?: string }
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const elements = container.querySelectorAll(selector);
    if (!elements.length) return;

    gsap.set(elements, { opacity: 0, y: options?.y ?? 24 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: options?.start ?? 'top 82%',
      once: true,
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.55,
          stagger: options?.stagger ?? 0.1,
          ease: 'power3.out',
        });
      },
    });

    return () => trigger.kill();
  }, [selector, options?.y, options?.stagger, options?.duration, options?.start]);

  return containerRef;
}

/**
 * Parallax: shift an element on the Y axis as the user scrolls through it.
 */
export function useParallax(amount: number = 30) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const tween = gsap.to(el, {
      y: amount,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [amount]);

  return ref;
}

/**
 * Count-up animation: animate a number from 0 to its value when in view.
 */
export function useCountUp() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const elements = container.querySelectorAll('[data-count]');
    if (!elements.length) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        elements.forEach((el) => {
          const target = parseInt(el.getAttribute('data-count') || '0', 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 0.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toString();
            },
          });
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return containerRef;
}
