import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useCanHover } from '../hooks/useCanHover';
import { useCountUp } from '../hooks/useScrollAnimation';
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

  const workingPrinciples = [
    {
      title: 'Understand first',
      description:
        'Clarify the real problem, users, and constraints before committing to a solution.',
    },
    {
      title: 'Design for change',
      description:
        'Use clear boundaries and deliberate tradeoffs so the product remains easier to extend.',
    },
    {
      title: 'Own delivery',
      description:
        'Communicate decisions clearly and carry work from architecture through production.',
    },
  ];

  const educationHistory: Education[] = [
    {
      level: 'University',
      degree: 'BSc Computer Science',
      year: '2021 - 2025',
      school: 'Chuka University',
    },
  ];

  const evidence = [
    {
      value: '2',
      label: 'Confidential client systems delivered and currently in use',
    },
    {
      value: '263',
      label: 'Passing RMS backend tests across 67 suites',
    },
    {
      value: '3',
      label: 'Completed certifications in AI, cloud tooling, and cybersecurity',
    },
  ];

  const countUpRef = useCountUp();
  const containerVariants = createContainerVariants(Boolean(prefersReducedMotion), 0.18);
  const itemVariants = createItemVariants(Boolean(prefersReducedMotion), 24, 0.55);

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
          <motion.p className={styles.eyebrow} variants={itemVariants}>
            About
          </motion.p>
          <motion.h2 className={styles.title} variants={itemVariants}>
            How I Think About <span className={styles.highlight}>Engineering</span>
          </motion.h2>

          <div className={styles.gridContainer}>
            <motion.div className={styles.leftColumn} variants={itemVariants}>
              {/* Portrait moved from Hero */}
              <div className={styles.portraitBlock}>
                <div className={styles.portraitFrame}>
                  <Image
                    src="/images/avatar.png"
                    alt="Portrait of Moses Maina"
                    width={520}
                    height={520}
                    sizes="(max-width: 899px) 200px, 240px"
                    className={styles.avatar}
                    priority
                  />
                </div>
                <div className={styles.portraitInfo}>
                  <span className={styles.portraitName}>Moses Maina</span>
                  <span className={styles.portraitRole}>Systems-Driven Software Engineer</span>
                  <p className={styles.portraitBio}>
                    I design secure, maintainable systems and take products from idea to
                    production.
                  </p>
                  <motion.a
                    href="/CV/Moses_Maina_Software_Engineer_Resume.pdf"
                    download
                    className={styles.downloadCv}
                    whileHover={hoverLift(enableHoverMotion, -2, 1)}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  >
                    Download CV
                  </motion.a>
                </div>
              </div>

              <div className={styles.sectionBlock}>
                <p className={styles.lead}>
                  I&apos;m a systems-driven software engineer who turns complex workflows
                  and business problems into dependable web products.
                </p>
                <p className={styles.text}>
                  I work across the stack, choosing technology around real constraints,
                  maintainability, security, and the people who will operate the
                  product.
                </p>
              </div>

              <div
                className={styles.principles}
                role="list"
                aria-label="Working principles"
              >
                {workingPrinciples.map((principle, index) => (
                  <div
                    className={styles.principle}
                    key={principle.title}
                    role="listitem"
                  >
                    <span className={styles.principleNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className={styles.principleTitle}>{principle.title}</h3>
                      <p className={styles.principleDescription}>
                        {principle.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className={styles.rightColumn} variants={itemVariants}>
              <h3 className={styles.subtitle}>Education</h3>
              <div className={styles.educationList}>
                {educationHistory.map((edu) => (
                  <motion.div
                    key={`${edu.degree}-${edu.school}`}
                    className={styles.educationCard}
                    whileHover={hoverLift(enableHoverMotion, -3, 1)}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 300 }
                    }
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

          <motion.div
            className={styles.evidenceSection}
            variants={itemVariants}
            ref={countUpRef}
          >
            <div className={styles.evidenceHeader}>
              <h3 className={styles.evidenceTitle}>Evidence in practice</h3>
              <p className={styles.evidenceIntro}>
                A few concrete signals behind how I build and deliver.
              </p>
            </div>
            <div className={styles.evidenceGrid}>
              {evidence.map((item) => (
                <div className={styles.evidenceItem} key={item.label}>
                  <strong data-count={item.value}>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
