import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SocialLink } from '../types';
import { useCanHover } from '../hooks/useCanHover';
import {
  createContainerVariants,
  createItemVariants,
  hoverLift,
  sectionViewport,
} from '../utils/motion';
import styles from '../styles/About.module.css';

interface Education {
  level: string;
  degree: string;
  year: string;
  school: string;
}

const About: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const canHover = useCanHover();
  const enableHoverMotion = canHover && !prefersReducedMotion;

  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/CamlineKe',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/moses-ongware/',
      icon: 'linkedin',
    },
    {
      name: 'X',
      url: 'https://x.com/camline_moses',
      icon: 'x',
    },
  ];

  const educationHistory: Education[] = [
    {
      level: 'University',
      degree: 'BSc Computer Science',
      year: '2021 - 2025',
      school: 'Chuka University',
    }

  ];

  const containerVariants = createContainerVariants(Boolean(prefersReducedMotion), 0.18);
  const itemVariants = createItemVariants(Boolean(prefersReducedMotion), 24, 0.55);

  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      case 'x':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25h6.826l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className={styles.about} id="about">
      <div className="container">
        <motion.div
          className={styles.aboutContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <motion.h2 className={styles.title} variants={itemVariants}>
            About <span className={styles.highlight}>Me</span>
          </motion.h2>

          <div className={styles.gridContainer}>
            {/* Left Column */}
            <motion.div className={styles.leftColumn} variants={itemVariants}>
              <div className={styles.sectionBlock}>
                <p className={styles.text}>
                  I’m a systems-driven software engineer who turns complex ideas,
                  business processes, and operational challenges into reliable custom
                  software. I work across the stack, but I choose technologies based on
                  the problem, constraints, and long-term product needs.
                </p>
                <p className={styles.text}>
                  My approach begins with understanding the real problem before writing
                  code. I use systems thinking, clear abstractions, and deliberate
                  tradeoffs to build software that is secure, maintainable, performant,
                  and designed to evolve.
                </p>
                <p className={styles.text}>
                  I take ownership from architecture through production, communicate
                  decisions clearly, and collaborate with empathy and openness. I use AI
                  as a thinking partner to challenge assumptions, explore alternatives,
                  and improve delivery without outsourcing engineering judgment.
                </p>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div className={styles.rightColumn} variants={itemVariants}>
              <h3 className={styles.subtitle}>Education</h3>
              <div className={styles.educationList}>
                {educationHistory.map((edu, index) => (
                  <motion.div
                    key={index}
                    className={styles.educationCard}
                    whileHover={hoverLift(enableHoverMotion, -4, 1.02)}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className={styles.educationHeader}>
                      <span className={styles.yearBadge}>{edu.year}</span>
                    </div>
                    <h4 className={styles.degree}>{edu.degree}</h4>
                    <p className={styles.school}>{edu.school}</p>
                    <span className={styles.levelTag}>{edu.level}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div className={styles.socialSection} variants={itemVariants}>
            <h3 className={styles.socialTitle}>Connect With Me</h3>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  whileHover={hoverLift(enableHoverMotion, -2, 1.08)}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Visit ${social.name} profile`}
                >
                  <div className={styles.socialIcon}>
                    {renderSocialIcon(social.icon)}
                  </div>
                  <span className={styles.socialName}>{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
