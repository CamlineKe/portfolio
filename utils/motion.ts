import { Variants } from 'framer-motion';

export const sectionViewport = { once: true, amount: 0.12 };

export const createContainerVariants = (
  reducedMotion: boolean,
  staggerChildren = 0.14
): Variants => ({
  hidden: { opacity: 0 },
  visible: reducedMotion
    ? { opacity: 1, transition: { duration: 0.2 } }
    : {
      opacity: 1,
      transition: { staggerChildren },
    },
});

export const createItemVariants = (
  reducedMotion: boolean,
  y = 24,
  duration = 0.5
): Variants => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reducedMotion ? 0.2 : duration },
  },
});

const layoutEase = [0.16, 1, 0.3, 1] as const;

export const createCardVariants = (reducedMotion: boolean): Variants => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reducedMotion ? 0 : 0.35, ease: layoutEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: reducedMotion ? 0 : 0.35, ease: layoutEase },
  },
});

export const cardLayoutTransition = {
  duration: 0.35,
  ease: layoutEase,
};

export const hoverLift = (enabled: boolean, y = -6, scale = 1.02) =>
  enabled ? { y, scale, transition: { duration: 0.2 } } : undefined;

export const hoverScale = (enabled: boolean, scale = 1.04) =>
  enabled ? { scale } : undefined;
