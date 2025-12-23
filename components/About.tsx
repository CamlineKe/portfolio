import React from 'react';
import { motion } from 'framer-motion';
import { SocialLink } from '../types';
import styles from '../styles/About.module.css';

interface Education {
  level: string;
  degree: string;
  year: string;
  school: string;
}

const About: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'linkedin',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: 'twitter',
    },
  ];

  const educationHistory: Education[] = [
    {
      level: 'University',
      degree: 'BSc Computer Science',
      year: '2021 - 2025',
      school: 'Chuka University',
    },
    {
      level: 'Secondary',
      degree: 'Kenya Certificate of Secondary Education',
      year: '2017 - 2020',
      school: 'Nyambaria High School',
    },
    {
      level: 'Primary',
      degree: 'Kenya Certificate of Primary Education',
      year: '2007 - 2016',
      school: 'Omokirondo Primary',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

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
      case 'twitter':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
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
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 className={styles.title} variants={itemVariants}>
            My <span className={styles.highlight}>Background</span>
          </motion.h2>

          <div className={styles.gridContainer}>
            {/* Left Column */}
            <motion.div className={styles.leftColumn} variants={itemVariants}>
              <div className={styles.sectionBlock}>
                <h3 className={styles.subtitle}>About Me</h3>
                <p className={styles.text}>
                  I'm a MERN Stack Developer focused on Next.js and TypeScript, dedicated to building performant, scalable web applications. My strength lies in systematic problem-solving. I excel at tracing issues to their root and delivering clean, maintainable solutions.
                </p>
                <p className={styles.text}>
                  I believe great software balances speed, usability, and structure. Whether architecting server‑side rendered interfaces or building secure APIs, I write intentional, type‑safe code designed to scale.
                </p>
                <p className={styles.text}>
                  Beyond my core stack, I actively explore new technologies and innovative solutions, including diving into how AI works and how it can be leveraged to build better, smarter applications. When I'm not coding, you might find me contributing to open‑source projects, experimenting with developer tools, or unwinding with a challenging puzzle or outdoor activity.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <h3 className={styles.subtitle}>What's Next?</h3>
                <p className={styles.text}>
                  I'm currently looking for opportunities to bring high-impact projects to life. Whether you're building a new product, scaling an existing platform, or simply want to brainstorm a challenging tech problem, I'd love to connect.
                </p>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div className={styles.rightColumn} variants={itemVariants}>
              <h3 className={styles.subtitle}>Education Background</h3>
              <div className={styles.educationList}>
                {educationHistory.map((edu, index) => (
                  <motion.div
                    key={index}
                    className={styles.educationCard}
                    whileHover={{ scale: 1.02 }}
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
                  whileHover={{ scale: 1.1, y: -2 }}
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

