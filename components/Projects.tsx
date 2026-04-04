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
      title: "TaskFlow — Enterprise Project Management",
      description:
        "Full-stack project management platform featuring JWT-authenticated user access, interactive Kanban workflow with drag-and-drop task management, and real-time team collaboration. Implements secure email verification, password recovery, priority-based task assignment, and visual progress analytics. Deployed with automated CI/CD pipelines.",
      image: "/images/project4.jpg",
      technologies: [
        "Next.js",
        "TypeScript",
        "MongoDB",
        "JWT",
        "Node.js",
        "Material-UI",
        "Express",
      ],
      liveDemo: "https://taskflow-zeta-dusky.vercel.app/",
      sourceCode: "https://github.com/CamlineKe/TaskFLow",
    },
    {
      id: 2,
      title: "Fitness Tracker — Personalized Wellness Platform",
      description:
        "Full-stack wellness platform with secure JWT authentication, real-time Socket.IO integration, and MongoDB-optimized data persistence. Implements Flask/scikit-learn ML recommendation engine with confidence scoring for personalized fitness, nutrition, and stress management. Features Google Fit & Fitbit API integration for automatic health data synchronization. Built with React/Vite frontend, Node.js/Express backend, and deployed via Vercel & Render with comprehensive CI/CD pipelines.",
      image: "/images/project1.jpg",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Python",
        "Flask",
        "Express",
        "Socket.io",
        "Vite",
        "PostgreSQL",
      ],
      liveDemo: "https://drive.google.com/file/d/1faXK3lD3dghm01WamZfxO6ZezgGi0vtC/view?usp=drive_link",
      sourceCode: "https://github.com/CamlineKe/fitnessApp",
    },
    {
      id: 3,
      title: "Whatsapp Product Verification System",
      description:
        "WhatsApp-based product authentication system that lets customers verify product authenticity by sending a code via WhatsApp. Brands can generate millions of unique codes in batches, print QR stickers, and monitor verifications in real-time through an admin dashboard. The system automatically detects counterfeit attempts, blocks reused codes, and maintains complete audit trails. Built with row-level database locking to prevent fraud, rate limiting to stop abuse, and sub-second response times even under heavy load.",
      image: "/images/wpv.jpg",
      technologies: ["React","PostgreSQL","Node.js","TypeScript", "Tailwind CSS"],
      liveDemo: "https://drive.google.com/file/d/1k8IMdTW8HkxCL6cUuAIUIV_9_cCGeBal/view?usp=drive_link",
      sourceCode: "https://github.com/CamlineKe/whatsapp-product-verification",
    },
    {
      id: 4,
      title: "SaaS Landing Page",
      description:
        "A high-performance SaaS landing page built with Next.js 15, Tailwind CSS v4, and shadcn/ui, featuring dark/light mode, interactive animations, and full responsiveness..",
      image: "/images/project3.jpg",
      technologies: ["Next.js", "TypeScript"],
      liveDemo: "https://saas-landing-page-mu-bay.vercel.app/",
      sourceCode: "https://github.com/CamlineKe/saas-landing-page",
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
