import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
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
    title: 'Frontend Engineering',
    technologies: [
      { name: 'React 19', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Vue', icon: 'vue' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'TanStack Query', icon: 'tanstack-query' },
      { name: 'React Router', icon: 'react-router' },
      { name: 'Vite', icon: 'vite' },
    ],
  },
  {
    id: 'cloud-devops-quality',
    title: 'Cloud, DevOps & Quality',
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
      { name: 'Vitest', icon: 'vitest' },
    ],
  },
  {
    id: 'languages-foundations',
    title: 'Languages & Foundations',
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
    title: 'Integrations & Security',
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
  const [activeTechnologyCategory, setActiveTechnologyCategory] = useState(
    technologyCategories[0].id,
  );
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = createContainerVariants(Boolean(prefersReducedMotion), 0.1);
  const itemVariants = createItemVariants(Boolean(prefersReducedMotion), 20, 0.5);

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
            <p className={styles.technologiesIntro}>
              Open a category to explore the tools I use across the product
              lifecycle.
            </p>

            <motion.div
              className={styles.technologyAccordion}
              variants={containerVariants}
            >
              {technologyCategories.map((category) => {
                const isOpen = activeTechnologyCategory === category.id;
                const triggerId = `technology-${category.id}-trigger`;
                const panelId = `technology-${category.id}-panel`;
                const previewTechnologies = category.technologies
                  .slice(0, 3)
                  .map((technology) => technology.name)
                  .join(', ');
                const remainingTechnologyCount = Math.max(
                  category.technologies.length - 3,
                  0,
                );

                return (
                  <motion.article
                    key={category.id}
                    className={`${styles.accordionItem} ${
                      isOpen ? styles.accordionItemActive : ''
                    }`}
                    variants={itemVariants}
                  >
                    <h4 className={styles.accordionHeading}>
                      <button
                        id={triggerId}
                        type="button"
                        className={`${styles.accordionTrigger} ${
                          isOpen ? styles.accordionTriggerActive : ''
                        }`}
                        aria-expanded={isOpen}
                        aria-disabled={isOpen}
                        aria-controls={panelId}
                        onClick={() => {
                          if (!isOpen) {
                            setActiveTechnologyCategory(category.id);
                          }
                        }}
                      >
                        <span className={styles.accordionLabel}>
                          <span className={styles.accordionTitle}>
                            {category.title}
                          </span>
                          <span className={styles.accordionPreview}>
                            {previewTechnologies}
                            {remainingTechnologyCount > 0
                              ? ` +${remainingTechnologyCount}`
                              : ''}
                          </span>
                        </span>

                        <span className={styles.accordionMeta}>
                          <span className={styles.technologyCount}>
                            {category.technologies.length} tools
                          </span>
                          <svg
                            className={styles.accordionChevron}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="m5 7.5 5 5 5-5"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </h4>

                    <motion.div
                      id={panelId}
                      className={styles.accordionPanel}
                      role="region"
                      aria-labelledby={triggerId}
                      aria-hidden={!isOpen}
                      initial={false}
                      animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.22,
                        ease: 'easeOut',
                      }}
                    >
                      <div className={styles.accordionPanelInner}>
                        <div
                          className={styles.technologyGrid}
                          role="list"
                          aria-label={`${category.title} technologies`}
                        >
                          {category.technologies.map((technology) => (
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
                      </div>
                    </motion.div>
                  </motion.article>
                );
              })}
            </motion.div>
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
