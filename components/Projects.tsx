import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Project, ProjectDemo } from '../types';
import { useCanHover } from '../hooks/useCanHover';
import { projects } from '../data/projects';
import { ProjectRank, packProjects } from '../utils/projectLayout';
import {
  cardLayoutTransition,
  createCardVariants,
  createContainerVariants,
  createItemVariants,
  hoverLift,
  sectionViewport,
} from '../utils/motion';
import styles from '../styles/Projects.module.css';

const PROJECT_CATEGORY_ORDER: Project['category'][] = [
  'Custom Software',
  'SaaS',
  'AI & Data',
  'Web Applications',
];

const RMS_PROJECT_ID = 1;
const RMS_OTHER_ROLES_LABEL = 'Other role demos';

const splitRmsDemos = (demos: ProjectDemo[]) => {
  const [primaryDemo, ...otherRoleDemos] = demos;
  return { primaryDemo, otherRoleDemos };
};

const isRmsProject = (project: Project) =>
  project.id === RMS_PROJECT_ID && project.demos.length > 1;

const getProjectCardClassName = (rank: ProjectRank) => {
  if (rank === 'flagship') {
    return `${styles.projectCard} ${styles.featuredProject}`;
  }

  if (rank === 'wide') {
    return `${styles.projectCard} ${styles.wideProject}`;
  }

  return styles.projectCard;
};

const getProjectImageSizes = (rank: ProjectRank) => {
  if (rank === 'flagship') {
    return '(max-width: 375px) calc(100vw - 1.5rem), (max-width: 899px) calc(100vw - 3rem), (max-width: 1304px) calc(55vw - 2.2rem), 682px';
  }

  if (rank === 'wide') {
    return '(max-width: 375px) calc(100vw - 1.5rem), (max-width: 655px) calc(100vw - 2rem), (max-width: 1024px) calc(100vw - 3rem), (max-width: 1304px) calc(66.666vw - 2.2rem), 800px';
  }

  return '(max-width: 375px) calc(100vw - 1.5rem), (max-width: 655px) calc(100vw - 2rem), (max-width: 1025px) calc(50vw - 2rem), (max-width: 1304px) calc(33.333vw - 2.667rem), 392px';
};

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
    const present = new Set(projects.map((project) => project.category));
    return [
      'all',
      ...PROJECT_CATEGORY_ORDER.filter((category) => present.has(category)),
    ];
  }, []);

  const filteredProjects = useMemo(
    () =>
      selectedFilter === 'all'
        ? projects
        : projects.filter((project) => project.category === selectedFilter),
    [selectedFilter]
  );
  const packedProjects = useMemo(
    () => packProjects(filteredProjects),
    [filteredProjects]
  );

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
  const enableCardLayout = !prefersReducedMotion;
  const layoutTransition = prefersReducedMotion
    ? { duration: 0 }
    : cardLayoutTransition;

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

  const renderRepositoryAction = (project: Project) => {
    if (project.repository.visibility === 'public') {
      return (
        <motion.a
          href={project.repository.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.actionButton} ${styles.secondaryAction}`}
          whileHover={hoverLift(enableHoverMotion, -2, 1)}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          aria-label={`Source code for ${project.title} (opens in a new tab)`}
        >
          Source Code
        </motion.a>
      );
    }

    return (
      <motion.button
        type="button"
        className={`${styles.actionButton} ${styles.secondaryAction}`}
        whileHover={hoverLift(enableHoverMotion, -2, 1)}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        onClick={(event) =>
          handlePrivateRepositoryClick(project, event.currentTarget)
        }
      >
        Repository Details
      </motion.button>
    );
  };

  const renderDemoLink = (
    project: Project,
    demo: ProjectDemo,
    label: string,
    isPrimary: boolean
  ) => (
    <motion.a
      key={`${project.id}-${label}`}
      href={demo.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.actionButton} ${
        isPrimary ? styles.primaryAction : styles.secondaryAction
      }`}
      whileHover={hoverLift(enableHoverMotion, -2, isPrimary ? 1.03 : 1)}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      aria-label={`${label} for ${project.title} (opens in a new tab)`}
    >
      {label}
    </motion.a>
  );

  const renderRmsDemoActions = (project: Project) => {
    const { primaryDemo, otherRoleDemos } = splitRmsDemos(project.demos);
    const primaryLabel = getDemoLabel(primaryDemo);

    return (
      <>
        {renderDemoLink(project, primaryDemo, primaryLabel, true)}
        <div
          className={styles.otherRoleDemosGroup}
          role="group"
          aria-label={`Other role demos for ${project.title}`}
        >
          <p className={styles.otherRoleDemosLabel}>{RMS_OTHER_ROLES_LABEL}</p>
          {otherRoleDemos.map((demo) =>
            renderDemoLink(project, demo, getDemoLabel(demo), false)
          )}
        </div>
      </>
    );
  };

  const renderProjectActions = (project: Project) => {
    if (isRmsProject(project)) {
      return (
        <>
          {renderRmsDemoActions(project)}
          {renderRepositoryAction(project)}
        </>
      );
    }

    return (
      <>
        {project.demos.map((demo, index) =>
          renderDemoLink(
            project,
            demo,
            getDemoLabel(demo),
            index === 0
          )
        )}
        {renderRepositoryAction(project)}
      </>
    );
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
          <motion.p className={styles.intro} variants={itemVariants}>
            Production websites, client systems, and product platforms designed
            around real operational, security, and performance constraints.
          </motion.p>

          <motion.div className={styles.filterContainer} variants={itemVariants}>
            <div className={styles.filterScrollWrap}>
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
                    whileHover={hoverLift(enableHoverMotion, -2, 1)}
                    whileTap={
                      prefersReducedMotion ? undefined : { scale: 0.98 }
                    }
                    aria-pressed={selectedFilter === category}
                  >
                    {category === 'all' ? 'All Projects' : category}
                  </motion.button>
                ))}
              </div>
            </div>
            <p className={styles.resultsSummary} aria-live="polite">
              Showing {filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>
          </motion.div>

          <div className={styles.projectsGrid}>
            <AnimatePresence mode="sync">
              {packedProjects.map(({ project, rank }) => (
                <motion.article
                  key={project.id}
                  className={getProjectCardClassName(rank)}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout={enableCardLayout}
                  transition={layoutTransition}
                  whileHover={hoverLift(enableHoverMotion, -4, 1)}
                >
                  <motion.div
                    className={styles.projectImage}
                    layout={enableCardLayout}
                    transition={layoutTransition}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} interface preview`}
                      fill
                      sizes={getProjectImageSizes(rank)}
                      className={styles.image}
                      priority={rank === 'flagship'}
                      style={{
                        objectPosition: project.imagePosition ?? '50% 50%',
                      }}
                    />
                  </motion.div>

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

                    <div
                      className={`${styles.projectActions} ${
                        isRmsProject(project) ? styles.projectActionsStacked : ''
                      }`}
                    >
                      {renderProjectActions(project)}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
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

              <div
                className={`${styles.modalActions} ${
                  isRmsProject(privateProject) ? styles.projectActionsStacked : ''
                }`}
              >
                {isRmsProject(privateProject)
                  ? renderRmsDemoActions(privateProject)
                  : privateProject.demos.map((demo, index) =>
                      renderDemoLink(
                        privateProject,
                        demo,
                        getDemoLabel(demo),
                        index === 0
                      )
                    )}
                <motion.button
                  type="button"
                  className={`${styles.actionButton} ${styles.secondaryAction}`}
                  whileHover={hoverLift(enableHoverMotion, -2, 1)}
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
