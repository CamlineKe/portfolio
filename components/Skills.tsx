import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  createContainerVariants,
  createItemVariants,
  sectionViewport,
} from '../utils/motion';
import styles from '../styles/Skills.module.css';

interface TechSkill {
  name: string;
  icon: string;
}

interface TechCategory {
  id: string;
  title: string;
  technologies: TechSkill[];
}

const rasterTechnologyIcons = new Set([
  'africas-talking',
  'bullmq',
  'm-pesa',
  'winston',
  'testing-library',
]);

const getTechnologyIconSource = (iconName: string) => {
  const extension = rasterTechnologyIcons.has(iconName) ? 'png' : 'svg';
  return `/icons/technologies/${iconName}.${extension}`;
};

const technologyCategories: TechCategory[] = [
  {
    id: 'backend-apis',
    title: 'Backend & APIs',
    technologies: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'Laravel', icon: 'laravel' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Flask', icon: 'flask' },
      { name: 'Zod', icon: 'zod' },
    ],
  },
  {
    id: 'data-queues-ai',
    title: 'Data, Queues & AI',
    technologies: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Redis', icon: 'redis' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Prisma', icon: 'prisma' },
      { name: 'BullMQ', icon: 'bullmq' },
      { name: 'scikit-learn', icon: 'scikit-learn' },
      { name: 'Socket.IO', icon: 'socket-io' },
    ],
  },
  {
    id: 'frontend-engineering',
    title: 'Frontend',
    technologies: [
      { name: 'React 19', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Vue', icon: 'vue' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'TanStack Query', icon: 'tanstack-query' },
      { name: 'React Router', icon: 'react-router' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Framer Motion', icon: 'framer' },
      { name: 'React Hook Form', icon: 'react-hook-form' },
    ],
  },
  {
    id: 'cloud-devops-quality',
    title: 'Cloud & DevOps',
    technologies: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub Actions', icon: 'github-actions' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Nginx', icon: 'nginx' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Render', icon: 'render' },
      { name: 'Aiven', icon: 'aiven' },
      { name: 'Winston', icon: 'winston' },
      { name: 'k6', icon: 'k6' },
      { name: 'pnpm', icon: 'pnpm' },
      { name: 'Vitest', icon: 'vitest' },
      { name: 'Testing Library', icon: 'testing-library' },
    ],
  },
  {
    id: 'languages-foundations',
    title: 'Languages',
    technologies: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Python', icon: 'python' },
      { name: 'HTML', icon: 'html' },
      { name: 'CSS', icon: 'css' },
    ],
  },
  {
    id: 'integrations-security',
    title: 'Integrations',
    technologies: [
      { name: 'M-Pesa Daraja', icon: 'm-pesa' },
      { name: 'WhatsApp Cloud API', icon: 'whatsapp' },
      { name: "Africa's Talking", icon: 'africas-talking' },
      { name: 'Cloudinary', icon: 'cloudinary' },
      { name: 'JWT RS256', icon: 'jwt-rs256' },
      { name: 'OAuth 2.0', icon: 'oauth' },
      { name: 'Fitbit', icon: 'fitbit' },
    ],
  },
];

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState(technologyCategories[0].id);
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = createContainerVariants(Boolean(prefersReducedMotion), 0.1);
  const itemVariants = createItemVariants(Boolean(prefersReducedMotion), 20, 0.5);

  const activeCategory = technologyCategories.find((c) => c.id === activeTab);

  const renderTechIcon = (iconName: string) => {
    const iconSource = getTechnologyIconSource(iconName);
    return (
      <Image
        className={styles.technologyIconImage}
        src={iconSource}
        alt=""
        width={48}
        height={48}
        loading="lazy"
        unoptimized={iconSource.endsWith('.svg')}
        aria-hidden="true"
      />
    );
  };

  const technicalSkills = [
    'Software Development',
    'Product Management',
    'Prompt Engineering',
    'Context Engineering',
    'Systems Thinking',
    'Computer Networks',
    'System Administration',
  ];

  const softSkills = [
    'Problem Solving',
    'Creative Thinking',
    'Context Thinking',
    'Communication',
    'Teamwork',
    'Time Management',
    'Curious Fast Learner',
  ];

  const mediaSkills = [
    'Image Editing',
    'Photography',
    'Video Editing',
    'Advertising',
    'Event Coverage',
    'Content Creation',
  ];

  return (
    <section className={styles.skills} id="skills">
      <div className="container">
        <motion.div
          className={styles.skillsContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <motion.p className={styles.eyebrow} variants={itemVariants}>
            Capabilities
          </motion.p>
          <motion.h2 className={styles.title} variants={itemVariants}>
            Skills & Technologies
          </motion.h2>
          <motion.p className={styles.intro} variants={itemVariants}>
            A practical toolkit for designing, building, testing, and operating
            dependable digital products.
          </motion.p>

          <motion.div className={styles.sectionBlock} variants={itemVariants}>
            <h3 className={styles.subtitle}>Technologies</h3>

            {/* Horizontal tab bar */}
            <div
              className={styles.tabBar}
              role="tablist"
              aria-label="Technology categories"
            >
              {technologyCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  id={`tab-${category.id}`}
                  aria-selected={activeTab === category.id}
                  aria-controls={`panel-${category.id}`}
                  className={`${styles.tab} ${
                    activeTab === category.id ? styles.tabActive : ''
                  }`}
                  onClick={() => setActiveTab(category.id)}
                >
                  <span className={styles.tabLabel}>{category.title}</span>
                  <span className={styles.tabCount}>
                    {category.technologies.length}
                  </span>
                </button>
              ))}
            </div>

            {/* Tab panel with animated grid */}
            <AnimatePresence mode="wait">
              {activeCategory && (
                <motion.div
                  key={activeCategory.id}
                  id={`panel-${activeCategory.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activeCategory.id}`}
                  className={styles.tabPanel}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 8 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: -4 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.22,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div
                    className={styles.technologyGrid}
                    role="list"
                    aria-label={`${activeCategory.title} technologies`}
                  >
                    {activeCategory.technologies.map((technology) => (
                      <div
                        key={technology.name}
                        className={styles.technologyItem}
                        role="listitem"
                      >
                        <div className={styles.technologyIcon}>
                          {renderTechIcon(technology.icon)}
                        </div>
                        <span className={styles.technologyName}>
                          {technology.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div className={styles.skillsSection} variants={itemVariants}>
            <h3 className={styles.subtitle}>Core Skills</h3>

            <div className={styles.skillsCategories}>
              <div className={styles.categoryColumn}>
                <h4 className={styles.categoryTitle}>Technical Skills</h4>
                <div
                  className={styles.tagCloud}
                  role="list"
                  aria-label="Technical skills"
                >
                  {technicalSkills.map((skill) => (
                    <span key={skill} className={styles.skillTag} role="listitem">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.categoryColumn}>
                <h4 className={styles.categoryTitle}>Soft Skills</h4>
                <div
                  className={styles.tagCloud}
                  role="list"
                  aria-label="Soft skills"
                >
                  {softSkills.map((skill) => (
                    <span key={skill} className={styles.skillTag} role="listitem">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.categoryColumn}>
                <h4 className={styles.categoryTitle}>Media & Creative</h4>
                <div
                  className={styles.tagCloud}
                  role="list"
                  aria-label="Media and creative skills"
                >
                  {mediaSkills.map((skill) => (
                    <span key={skill} className={styles.skillTag} role="listitem">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
