import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <motion.div
          className={styles.footerContent}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.footerText}>
            <p className={styles.copyright}>
              © {currentYear} Camline. All rights reserved.
            </p>
            <p className={styles.builtWith}>
              Built with Next.js & TypeScript by Camline.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

