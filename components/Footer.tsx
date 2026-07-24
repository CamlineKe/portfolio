import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { sectionViewport } from '../utils/motion';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = () => {
    document.getElementById('hero')?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <motion.div
          className={styles.footerContent}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
        >
          <div className={styles.footerText}>
            <p className={styles.copyright}>
              © {currentYear} Moses Maina. All rights reserved.
            </p>
            <p className={styles.builtWith}>
              Built with Next.js & TypeScript by Moses Maina.
            </p>
          </div>
          <motion.button
            type="button"
            className={styles.backToTop}
            onClick={scrollToTop}
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            aria-label="Return to the top of the portfolio"
          >
            <span>Back to top</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                d="m6 15 6-6 6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
