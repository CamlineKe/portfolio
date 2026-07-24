import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const canHover = useCanHover();
  const enableHoverMotion = canHover && !prefersReducedMotion;

  const categories = useMemo(() => {
    const uniqueCategories = new Set(projects.map((project) => project.category));
    return ['all', ...Array.from(uniqueCategories)];
  }, []);

  const filteredProjects =
    selectedFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedFilter);

  useEffect(() => {
    if (!privateProject) {
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPrivateProject(null);
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) {
        return;
      }

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      lastTriggerRef.current?.focus();
    };
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

  const handlePrivateRepositoryClick = (
    project: Project,
    trigger: HTMLButtonElement
  ) => {
    lastTriggerRef.current = trigger;
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
          <motion.p className={styles.eyebrow} variants={itemVariants}>
            Selected work
          </motion.p>
          <motion.h2 className={styles.title} variants={itemVariants}>
            Featured Projects
          </motion.h2>
          <motion.p className={styles.intro} variants={itemVariants}>
            Production websites, client systems, and product platforms designed
            around real operational, security, and performance constraints.
          </motion.p>

          <motion.div className={styles.filterContainer} variants={itemVariants}>
            <div
              className={styles.filterButtons}
              role="group"
              aria-label="Filter projects by category"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  type="button"
                  className={`${styles.filterButton} ${
                    selectedFilter === category ? styles.active : ''
                  }`}
                  onClick={() => setSelectedFilter(category)}
                  whileHover={hoverScale(enableHoverMotion, 1.02)}
                  whileTap={
                    prefersReducedMotion ? undefined : { scale: 0.98 }
                  }
                  aria-pressed={selectedFilter === category}
                >
                  {category === 'all' ? 'All Projects' : category}
                </motion.button>
              ))}
            </div>
            <p className={styles.resultsSummary} aria-live="polite">
              Showing {filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>
          </motion.div>

          <motion.div
            className={styles.projectsGrid}
            layout={!prefersReducedMotion}
          >
            <AnimatePresence mode="sync">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  className={`${styles.projectCard} ${project.featured ? styles.featuredProject : ''}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout={!prefersReducedMotion}
                  whileHover={hoverLift(enableHoverMotion, -4, 1)}
                >
                  <div className={styles.projectImage}>
                    <Image
                      src={project.image}
                      alt={`${project.title} interface preview`}
                      fill
                      sizes={
                        project.featured
                          ? '(max-width: 375px) calc(100vw - 1.5rem), (max-width: 899px) calc(100vw - 3rem), (max-width: 1304px) calc(55vw - 2.2rem), 682px'
                          : '(max-width: 375px) calc(100vw - 1.5rem), (max-width: 655px) calc(100vw - 2rem), (max-width: 1025px) calc(50vw - 2rem), (max-width: 1304px) calc(33.333vw - 2.667rem), 392px'
                      }
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
                      {project.demos.map((demo, index) => (
                        <motion.a
                          key={`${project.id}-${getDemoLabel(demo)}`}
                          href={demo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.actionButton} ${
                            index === 0
                              ? styles.primaryAction
                              : styles.secondaryAction
                          }`}
                          whileHover={hoverScale(enableHoverMotion, 1.02)}
                          whileTap={
                            prefersReducedMotion ? undefined : { scale: 0.98 }
                          }
                          aria-label={`${getDemoLabel(demo)} for ${project.title} (opens in a new tab)`}
                        >
                          {getDemoLabel(demo)}
                        </motion.a>
                      ))}
                      {project.repository.visibility === 'public' ? (
                        <motion.a
                          href={project.repository.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.actionButton} ${styles.secondaryAction}`}
                          whileHover={hoverScale(enableHoverMotion, 1.02)}
                          whileTap={
                            prefersReducedMotion ? undefined : { scale: 0.98 }
                          }
                          aria-label={`Source code for ${project.title} (opens in a new tab)`}
                        >
                          Source Code
                        </motion.a>
                      ) : (
                        <motion.button
                          type="button"
                          className={`${styles.actionButton} ${styles.secondaryAction}`}
                          whileHover={hoverScale(enableHoverMotion, 1.02)}
                          whileTap={
                            prefersReducedMotion ? undefined : { scale: 0.98 }
                          }
                          onClick={(event) =>
                            handlePrivateRepositoryClick(
                              project,
                              event.currentTarget
                            )
                          }
                        >
                          Repository Details
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {privateProject && (
          <motion.div
            className={styles.modalOverlay}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
            onClick={() => setPrivateProject(null)}
          >
            <motion.div
              ref={modalRef}
              className={styles.modal}
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 18, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 8, scale: 0.98 }
              }
              transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="private-repo-title"
              aria-describedby="private-repo-description"
              tabIndex={-1}
            >
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.modalClose}
                onClick={() => setPrivateProject(null)}
                aria-label="Close repository details"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="m6 6 12 12M18 6 6 18"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <h3 id="private-repo-title" className={styles.modalTitle}>
                Repository details
              </h3>
              <div id="private-repo-description">
                <p className={styles.modalText}>
                  The source code for {privateProject.title} is private.
                </p>
                <p className={styles.modalText}>
                  {privateProject.repository.visibility === 'private'
                    ? (privateProject.repository.reason ??
                      'It was built for a client and cannot be shared publicly.')
                    : 'It was built for a client and cannot be shared publicly.'}
                </p>
              </div>

              <div className={styles.modalActions}>
                {privateProject.demos.map((demo, index) => (
                  <motion.a
                    key={`${privateProject.id}-${getDemoLabel(demo)}`}
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.actionButton} ${
                      index === 0
                        ? styles.primaryAction
                        : styles.secondaryAction
                    }`}
                    whileHover={hoverScale(enableHoverMotion, 1.02)}
                    whileTap={
                      prefersReducedMotion ? undefined : { scale: 0.98 }
                    }
                    aria-label={`${getDemoLabel(demo)} for ${privateProject.title} (opens in a new tab)`}
                  >
                    {getDemoLabel(demo)}
                  </motion.a>
                ))}
                <motion.button
                  type="button"
                  className={`${styles.actionButton} ${styles.secondaryAction}`}
                  whileHover={hoverScale(enableHoverMotion, 1.02)}
                  whileTap={
                    prefersReducedMotion ? undefined : { scale: 0.98 }
                  }
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
