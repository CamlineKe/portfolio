import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { projects } from '../data/projects';
import styles from '../styles/Projects.module.css';

const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [privateProject, setPrivateProject] = useState<Project | null>(null);

  const technologies = useMemo(() => {
    const uniqueTechnologies = new Set(projects.flatMap((project) => project.technologies));
    return ['all', ...Array.from(uniqueTechnologies)];
  }, []);

  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(project => project.technologies.includes(selectedFilter));

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleRepositoryClick = (project: Project) => {
    if (project.repository.visibility === 'public') {
      window.open(project.repository.url, '_blank', 'noopener,noreferrer');
      return;
    }

    setPrivateProject(project);
  };

  const getDemoLabel = (project: Project) => {
    return project.demo.type === 'video' ? 'Video Demo' : 'Live Demo';
  };

  return (
    <section className={styles.projects} id="projects">
      <div className="container">
        <motion.div
          className={styles.projectsContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 className={styles.title} variants={itemVariants}>
            Featured Projects
          </motion.h2>

          <motion.div className={styles.filterContainer} variants={itemVariants}>
            <div className={styles.filterButtons}>
              {technologies.map((tech) => (
                <motion.button
                  key={tech}
                  className={`${styles.filterButton} ${selectedFilter === tech ? styles.active : ''
                    }`}
                  onClick={() => setSelectedFilter(tech)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech === 'all' ? 'All Projects' : tech}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div className={styles.projectsGrid} layout>
            <AnimatePresence mode="sync">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className={styles.projectCard}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
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
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>

                    <div className={styles.techBadges}>
                      {project.technologies.map((tech) => (
                        <span key={tech} className={styles.techBadge}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className={styles.projectActions}>
                      <motion.a
                        href={project.demo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.demoButton}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {getDemoLabel(project)}
                      </motion.a>
                      <motion.button
                        type="button"
                        className={styles.codeButton}
                        whileHover={{ scale: 1.02 }}
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
              transition={{ duration: 0.2 }}
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
                <motion.a
                  href={privateProject.demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.demoButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {getDemoLabel(privateProject)}
                </motion.a>
                <motion.button
                  type="button"
                  className={styles.codeButton}
                  whileHover={{ scale: 1.02 }}
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
