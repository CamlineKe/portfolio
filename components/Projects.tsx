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
        "Full-stack project management platform with interactive drag-and-drop Kanban boards powered by @dnd-kit. Implements tiered Redis caching (2-10 min TTL) eliminating redundant DB queries for board data, projects, and task lists. Architected with Next.js 14, Node.js/Express, MongoDB with compound indexing for O(log n) query performance. Aggregates dashboard stats via MongoDB pipelines, minimizing database round-trips. Delivers instant drag-and-drop feedback with zero page reloads. Features JWT auth with Passport.js, email verification via SMTP, and server-side data fetching with TanStack Query.",
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
        "AI-powered fitness platform enabling users to log workouts, nutrition, and mental health check-ins while receiving personalized ML-generated recommendations via 3 RandomForest models. Architected as decoupled microservices with React frontend, Node.js API gateway, and Python Flask AI service. Achieved 70% cache hit rates through multi-layer LRU caching and reduced AI latency by 60% via batch API parallelization. Integrated Google Fit and Fitbit OAuth2 for device synchronization. Real-time gamification with Socket.IO WebSocket rooms and atomic streak calculations. Delivered sub-500ms p95 response times under concurrent load with zero service degradation.",
      image: "/images/project1.jpg",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Python",
        "Flask",
        "Express",
        "Socket.io",
        "Vite"
      ],
      liveDemo: "https://drive.google.com/file/d/1OSUo07irLjerI88OrYMRGNLAUqE5C_68/view?usp=drive_link",
      sourceCode: "https://github.com/CamlineKe/fitnessApp",
    },
    {
      id: 3,
      title: "Whatsapp Product Verification System",
      description:
        "WhatsApp-based product authentication system enabling instant product verification via Meta Business API. Brands generate millions of unique codes with QR URLs, track batch performance through a React admin dashboard, and monitor real-time verification analytics. Eliminated fraudulent duplicate activations using PostgreSQL row-level locking (FOR UPDATE), JWT authentication, and rate-limited verification flows. Achieved 24ms p95 response times under 200+ concurrent user load testing with zero failed requests.",
      image: "/images/wpv.jpg",
      technologies: ["React","PostgreSQL","Node.js","TypeScript", "Tailwind CSS"],
      liveDemo: "https://drive.google.com/file/d/1BdUkJHmL-Ukdo0jpJoPSkKfXYp_lkJei/view?usp=drive_link",
      sourceCode: "https://github.com/CamlineKe/whatsapp-product-verification",
    },
    {
      id: 4,
      title: "Task Management Platform",
      description:
        "Full-stack task management platform with intelligent workflow enforcement and real-time analytics. Vue 3 SPA with Pinia state management paired with Laravel 13 REST API featuring strict status transition rules and 8 strategic database indexes for optimized query performance. Containerized with multi-stage Docker builds (~80MB), deployed on Aiven MySQL, Render, and Vercel. 100% PHPUnit test coverage with edge case validation.",
      image: "/images/project3.jpg",
      technologies: ["Vue", "Laravel", "MySQL", "TypeScript", "Docker"],
      liveDemo: "https://task-management-psi-jade.vercel.app/",
      sourceCode: "https://github.com/CamlineKe/Task_Management",
    },
  ];

  const technologies = ['all', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Socket.io', 'MongoDB', 'Vue', 'Laravel', 'MySQL'];

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
