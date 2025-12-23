import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { scrollToSection } from '../utils/helpers';
import styles from '../styles/Hero.module.css';
import ParticleBackground from './ParticleBackground';
import Typewriter from 'typewriter-effect';

const Hero: React.FC = () => {
  const handleViewProjects = () => {
    scrollToSection('projects');
  };

  const handleDownloadCV = () => {
    // Open CV in new tab
    window.open('/CV/Camline_CV.pdf', '_blank');
  };

  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.heroContainer}`}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ParticleBackground />

          <motion.div
            className={styles.avatarContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <Image
              src="/images/avatar.jpg"
              alt="Moses Maina"
              width={200}
              height={200}
              className={styles.avatar}
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className={styles.name}>Moses Maina</h1>
          </motion.div>

          <motion.div
            className={styles.typewriterWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span>I am </span>
            <div className={styles.typewriterText}>
              <Typewriter
                options={{
                  strings: [
                    'a Full Stack Developer',
                    'an AI-Assisted Problem Solver',
                    'Turning Ideas Into Code',
                    'a Context Engineer'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </div>
          </motion.div>

          <motion.p
            className={styles.bio}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            I&apos;m a Computer Science graduate, MERN + Next.js and Flask developer who builds efficient, modern, and impactful solutions. I turn concepts into reality through clean code, seamless UI, and forward-thinking innovation.
          </motion.p>

          <motion.div
            className={styles.buttonContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.button
              className={`btn ${styles.primaryButton}`}
              onClick={handleViewProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.button>

            <motion.button
              className={`btn btn-outline ${styles.secondaryButton}`}
              onClick={handleDownloadCV}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            className={styles.scrollArrow}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
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
              <path d="M7 13l3 3 7-7" />
              <path d="M7 6l3 3 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

