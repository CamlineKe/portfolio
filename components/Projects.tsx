import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Project, ProjectDemo } from '../types';
import { useCanHover } from '../hooks/useCanHover';
import { projects } from '../data/projects';
import {
  createCardVariants,
  createContainerVariants,
  createItemVariants,
  hoverLift,
  hoverScale,
  sectionViewport,
} from '../utils/motion';
import styles from '../styles/Projects.module.css';

const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [privateProject, setPrivateProject] = useState<Project | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const canHover = useCanHover();
  const enableHoverMotion = canHover && !prefersReducedMotion;

  const categories = useMemo(() => {
    const uniqueCategories = new Set(projects.map((project) => project.category));
    return ['all', ...Array.from(uniqueCategories)];
  }, []);

  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(project => project.category === selectedFilter);

  useEffect(() => {
    if (!privateProject) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPrivateProject(null);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [privateProject]);

  useEffect(() => {
    if (!privateProject) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [privateProject]);

  const containerVariants = createContainerVariants(Boolean(prefersReducedMotion), 0.18);
  const itemVariants = createItemVariants(Boolean(prefersReducedMotion), 24, 0.55);
  const cardVariants = createCardVariants(Boolean(prefersReducedMotion));

  const handleRepositoryClick = (project: Project) => {
    if (project.repository.visibility === 'public') {
      window.open(project.repository.url, '_blank', 'noopener,noreferrer');
      return;
    }

    setPrivateProject(project);
  };

  const getDemoLabel = (demo: ProjectDemo) => {
    return demo.label ?? (demo.type === 'video' ? 'Video Demo' : 'Live Demo');
  };

  return (
    <section className={styles.projects} id="projects">
      <div className="container">
        <motion.div
          className={styles.projectsContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <motion.h2 className={styles.title} variants={itemVariants}>
            Featured Projects
          </motion.h2>

          <motion.div className={styles.filterContainer} variants={itemVariants}>
            <div className={styles.filterButtons}>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`${styles.filterButton} ${selectedFilter === category ? styles.active : ''
                    }`}
                  onClick={() => setSelectedFilter(category)}
                  whileHover={hoverScale(enableHoverMotion, 1.05)}
                  whileTap={{ scale: 0.95 }}
                >
                  {category === 'all' ? 'All Projects' : category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div className={styles.projectsGrid} layout>
            <AnimatePresence mode="sync">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className={`${styles.projectCard} ${project.featured ? styles.featuredProject : ''}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  whileHover={hoverLift(enableHoverMotion, -10, 1)}
                >
                  <div className={styles.projectImage}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={250}
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.projectContent}>
                    {project.status && (
                      <span className={styles.projectStatus}>{project.status}</span>
                    )}
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    {project.highlight && (
                      <p className={styles.projectHighlight}>{project.highlight}</p>
                    )}

                    <div className={styles.techBadges}>
                      {project.technologies.map((tech) => (
                        <span key={tech} className={styles.techBadge}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className={styles.projectActions}>
                      {project.demos.map((demo) => (
                        <motion.a
                          key={`${project.id}-${getDemoLabel(demo)}`}
                          href={demo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.demoButton}
                          whileHover={hoverScale(enableHoverMotion, 1.02)}
                          whileTap={{ scale: 0.98 }}
                        >
                          {getDemoLabel(demo)}
                        </motion.a>
                      ))}
                      <motion.button
                        type="button"
                        className={styles.codeButton}
                        whileHover={hoverScale(enableHoverMotion, 1.02)}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRepositoryClick(project)}
                      >
                        {project.repository.visibility === 'public' ? 'Source Code' : 'Private Repo'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {privateProject && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPrivateProject(null)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.2 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="private-repo-title"
            >
              <h3 id="private-repo-title" className={styles.modalTitle}>
                Private Repository
              </h3>
              <p className={styles.modalText}>
                This project&apos;s source code is private.
              </p>
              <p className={styles.modalText}>
                {privateProject.repository.visibility === 'private'
                  ? (privateProject.repository.reason ?? 'It was built for a client and cannot be shared publicly.')
                  : 'It was built for a client and cannot be shared publicly.'}
              </p>

              <div className={styles.modalActions}>
                {privateProject.demos.map((demo) => (
                  <motion.a
                    key={`${privateProject.id}-${getDemoLabel(demo)}`}
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.demoButton}
                    whileHover={hoverScale(enableHoverMotion, 1.02)}
                    whileTap={{ scale: 0.98 }}
                  >
                    {getDemoLabel(demo)}
                  </motion.a>
                ))}
                <motion.button
                  type="button"
                  className={styles.codeButton}
                  whileHover={hoverScale(enableHoverMotion, 1.02)}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPrivateProject(null)}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
