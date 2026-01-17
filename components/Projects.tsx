import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import styles from '../styles/Projects.module.css';

const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'Cortex (Project Management)',
      description: 'Advanced project management platform with team collaboration, task tracking, and analytics. Built with Next.js and TypeScript for enterprise-level performance.',
      image: '/images/project4.jpg',
      technologies: ['Next.js', 'TypeScript', 'React', 'MongoDB'],
      liveDemo: 'https://taskflow-zeta-dusky.vercel.app/',
      sourceCode: 'https://github.com/CamlineKe/portfolio',
    },
    {
      id: 2,
      title: 'SaaS Landing Page',
      description: 'Real-time messaging application with group chats, file sharing, and emoji reactions. Powered by Socket.io and React for instant communication.',
      image: '/images/project3.jpg',
      technologies: ['React', 'Socket.io', 'Node.js', 'TypeScript'],
      liveDemo: 'https://saas-landing-page-mu-bay.vercel.app/',
      sourceCode: 'https://github.com/CamlineKe/saas-landing-page',
    },
    
    {
      id: 3,
      title: 'Fitness Tracker',
      description: 'A comprehensive fitness tracking application built with React and Node.js. Features workout logging, progress tracking, and social sharing capabilities.',
      image: '/images/project1.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      liveDemo: 'https://fitness-app-dusky-six.vercel.app/',
      sourceCode: 'https://github.com/CamlineKe/fitnessApp',
    },
    {
      id: 4,
      title: 'Todo App',
      description: 'A modern task management application with real-time updates and collaborative features. Built using Next.js and Socket.io for seamless user experience.',
      image: '/images/project2.jpg',
      technologies: ['Next.js', 'TypeScript', 'Socket.io', 'MongoDB'],
      liveDemo: 'https://todo-app-demo.com',
      sourceCode: 'https://github.com/camline/todo-app',
    },
    
  ];

  const technologies = ['all', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Socket.io', 'MongoDB'];

  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(project => project.technologies.includes(selectedFilter));

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

  return (
    <section className={styles.projects} id="projects">
      <div className="container">
        <motion.div
          className={styles.projectsContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
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
            <AnimatePresence mode="wait">
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
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.demoButton}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Live Demo
                      </motion.a>
                      <motion.a
                        href={project.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.codeButton}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Source Code
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
