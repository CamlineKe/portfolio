import React from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { useCanHover } from '../hooks/useCanHover';
import { hoverLift } from '../utils/motion';
import styles from '../styles/Hero.module.css';

const ParticleNetwork = dynamic(() => import('./ParticleNetwork'), {
  ssr: false,
});

const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const canHover = useCanHover();
  const enableHoverMotion = canHover && !prefersReducedMotion;

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.networkWrapper} aria-hidden="true">
        <ParticleNetwork />
      </div>

      <div className={`container ${styles.heroContainer}`}>
        <motion.div
          className={styles.heroContent}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.7, ease: 'easeOut' }}
        >
          <div className={styles.heroTag}>
            <span className={styles.tagText}>Systems-Driven Software Engineer</span>
          </div>

          <h1 className={styles.headline}>
            Engineering reliable, scalable, and{' '}
            <span className={styles.headlineAccent}>fault-tolerant</span> systems.
          </h1>

          <p className={styles.proof}>
            Full-stack software engineer specializing in resilient financial infrastructure,
            transaction integrity, and high-performance web applications. Evaluated on
            verifiable production proof.
          </p>

          <div className={styles.ctaRow}>
            <motion.a
              href="#projects"
              className={styles.ctaPrimary}
              whileHover={hoverLift(enableHoverMotion, -2, 1.03)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            >
              Inspect Flagship Systems
            </motion.a>
            <motion.a
              href="https://github.com/CamlineKe"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
              whileHover={hoverLift(enableHoverMotion, -2, 1.02)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            >
              GitHub Architecture
            </motion.a>
            <motion.a
              href="/Moses_Maina_Software_Engineer_CV.pdf"
              download
              className={styles.ctaGhost}
              whileHover={hoverLift(enableHoverMotion, -2, 1.02)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            >
              Download CV
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
