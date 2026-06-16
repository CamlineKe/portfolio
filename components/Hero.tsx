import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { scrollToSection } from '../utils/helpers';
import { useCanHover } from '../hooks/useCanHover';
import styles from '../styles/Hero.module.css';
import ParticleBackground from './ParticleBackground';
import Typewriter from 'typewriter-effect';
import { hoverScale } from '../utils/motion';

const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const canHover = useCanHover();
  const enableHoverMotion = canHover && !prefersReducedMotion;

  const handleViewProjects = () => {
    scrollToSection('projects');
  };

  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.particlesWrapper}>
          <ParticleBackground />
        </div>
        <motion.div
          className={styles.heroContent}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className={styles.avatarContainer}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.2,
              type: 'spring',
              stiffness: 100,
            }}
            whileHover={enableHoverMotion ? { scale: 1.05 } : undefined}
          >
            <Image
              src="/images/avatar.png"
              alt="Moses Maina"
              width={200}
              height={200}
              className={styles.avatar}
              priority
            />
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.8, delay: prefersReducedMotion ? 0 : 0.3 }}
          >
            <h1 className={styles.name}>Moses Maina</h1>
          </motion.div>

          <motion.div
            className={styles.typewriterWrapper}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.8, delay: prefersReducedMotion ? 0 : 0.5 }}
          >
            <span>I am </span>
            <div className={styles.typewriterText}>
              {prefersReducedMotion ? (
                <span>a Systems-Driven Software Engineer</span>
              ) : (
                <Typewriter
                  options={{
                    strings: [
                      'a Systems-Driven Software Engineer',
                      'building reliable custom software',
                      'turning complex problems into clear solutions',
                      'engineering products from idea to production',
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                    cursor: '_',
                    cursorClassName: styles.typewriterCursor,
                  }}
                />
              )}
            </div>
          </motion.div>

          <motion.p
            className={styles.bio}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.8, delay: prefersReducedMotion ? 0 : 0.7 }}
          >
            I design and build reliable custom software that turns complex business
            problems into secure, maintainable, and production-ready systems.
          </motion.p>

          <motion.div
            className={styles.buttonContainer}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.8, delay: prefersReducedMotion ? 0 : 0.9 }}
          >
            <motion.button
              className={`btn ${styles.primaryButton}`}
              onClick={handleViewProjects}
              whileHover={hoverScale(enableHoverMotion, 1.05)}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.button>

            <motion.a
              href="/CV/Moses_Maina_CV.pdf"
              download
              className={`${styles.glassButton}`}
              whileHover={hoverScale(enableHoverMotion, 1.05)}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          className={styles.scrollIndicator}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 1, delay: prefersReducedMotion ? 0 : 1.5 }}
          onClick={handleViewProjects}
          aria-label="Scroll to featured projects"
        >
          <motion.div
            className={styles.scrollArrow}
            animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
            transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
