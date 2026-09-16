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
          <p className={styles.name}>Moses Maina</p>
          <span className={styles.role}>Systems-Driven Software Engineer</span>

          <h1 className={styles.headline}>
            Bridging{' '}
            <span className={styles.headlineAccent}>technology and business</span>{' '}
            through reliable systems.
          </h1>

          <p className={styles.proof}>
            Flagship rental platform backed by{' '}
            <a href="#projects" className={styles.proofLink}>
              263 automated tests
            </a>
            .
          </p>

          <div className={styles.ctaRow}>
            <motion.a
              href="#contact"
              className={styles.ctaPrimary}
              whileHover={hoverLift(enableHoverMotion, -2, 1.03)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            >
              Start a conversation
            </motion.a>
            <motion.a
              href="#projects"
              className={styles.ctaSecondary}
              whileHover={hoverLift(enableHoverMotion, -2, 1.02)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            >
              View projects
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
