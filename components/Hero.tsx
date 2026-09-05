import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { scrollToSection } from '../utils/helpers';
import { useCanHover } from '../hooks/useCanHover';
import { hoverScale } from '../utils/motion';
import styles from '../styles/Hero.module.css';
import ParticleNetwork from './ParticleNetwork';

const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const canHover = useCanHover();
  const enableHoverMotion = canHover && !prefersReducedMotion;

  // Track scroll progress through the hero section (0 = top, 1 = fully scrolled past)
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Map first 100vh of scroll to 0-1 progress
      const heroHeight = window.innerHeight;
      const rawProgress = (latest * document.documentElement.scrollHeight) / heroHeight;
      setScrollProgress(Math.min(Math.max(rawProgress, 0), 1));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Parallax: content fades and lifts as user scrolls
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.networkWrapper} aria-hidden="true">
        <ParticleNetwork scrollProgress={scrollProgress} />
      </div>

      <div className={`container ${styles.heroContainer}`}>
        <motion.div
          className={styles.heroContent}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.7, ease: 'easeOut' }}
          style={
            prefersReducedMotion
              ? undefined
              : { opacity: contentOpacity, y: contentY }
          }
        >
          <span className={styles.name}>MOSES MAINA</span>
          <span className={styles.role}>Systems-Driven Software Engineer</span>

          <h1 className={styles.headline}>
            Building <span className={styles.headlineAccent}>reliable software</span> for
            complex business problems.
          </h1>

          <motion.button
            className={styles.ctaButton}
            onClick={() => scrollToSection('projects')}
            whileHover={hoverScale(enableHoverMotion, 1.03)}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
          >
            View Projects
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={prefersReducedMotion ? { opacity: 0.6 } : { opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
};

export default Hero;
