import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { scrollToSection } from '../utils/helpers';
import { useCanHover } from '../hooks/useCanHover';
import { hoverScale } from '../utils/motion';
import styles from '../styles/Hero.module.css';
import ParticleBackground from './ParticleBackground';

const expertise = [
  'Custom software',
  'API integrations',
  'Production systems',
];

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
        <div className={styles.particlesWrapper} aria-hidden="true">
          <ParticleBackground />
        </div>

        <motion.div
          className={styles.heroContent}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, ease: 'easeOut' }}
        >
          <div className={styles.portraitColumn}>
            <motion.div
              className={styles.portraitFrame}
              whileHover={enableHoverMotion ? { y: -2 } : undefined}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Image
                src="/images/avatar.png"
                alt="Portrait of Moses Maina"
                width={520}
                height={520}
                sizes="(max-width: 899px) 256px, (max-width: 1200px) 32vw, 368px"
                className={styles.avatar}
                priority
              />
            </motion.div>
          </div>

          <div className={styles.heroCopy}>
            <div className={styles.identity}>
              <span className={styles.name}>Moses Maina</span>
              <span className={styles.identityDivider} aria-hidden="true" />
              <span className={styles.role}>Systems-Driven Software Engineer</span>
            </div>

            <h1 className={styles.headline}>
              Building <span>reliable software</span> for complex business problems.
            </h1>

            <p className={styles.bio}>
              I design secure, maintainable systems and take products from idea to
              production.
            </p>

            <div className={styles.buttonContainer}>
              <motion.button
                className={`btn ${styles.primaryButton}`}
                onClick={handleViewProjects}
                whileHover={hoverScale(enableHoverMotion, 1.02)}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                View Projects
              </motion.button>

              <motion.a
                href="/CV/Moses_Maina_Software_Engineer_Resume.pdf"
                download
                className={styles.secondaryButton}
                whileHover={hoverScale(enableHoverMotion, 1.02)}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                Download CV
              </motion.a>
            </div>

            <ul className={styles.expertiseList} aria-label="Selected expertise">
              {expertise.map((item) => (
                <li key={item} className={styles.expertiseItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
