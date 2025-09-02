import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { scrollToSection } from '../utils/helpers';
import styles from '../styles/Hero.module.css';

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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className={styles.avatarContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/images/avatar.jpg"
              alt="Camline's Avatar"
              width={200}
              height={200}
              className={styles.avatar}
              priority
            />
          </motion.div>
          
          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Moses Maina
          </motion.h1>
          
          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            MERN Fullstack Developer | Next.js & TypeScript Expert
          </motion.p>
          
          <motion.div
            className={styles.buttonContainer}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
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
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            className={styles.scrollArrow}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg
              width="24"
              height="24"
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

