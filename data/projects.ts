import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Rental Management System',
    description:
      'A multi-tenant PropertyTech platform connecting administrators, landlords, tenants, and caretakers through secure role-specific applications. It supports property operations, M-Pesa rent payments, instalment plans, maintenance workflows, reporting, and operational analytics.',
    highlight:
      'Backed by 263 passing backend tests across 67 suites, with reliable payment reconciliation using idempotent callbacks, PostgreSQL advisory locks, and serializable transactions.',
    image: '/images/rms.png',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'BullMQ',
      'M-Pesa Daraja API',
    ],
    category: 'SaaS',
    featured: true,
    status: 'Flagship Project · Currently Building',
    demos: [
      {
        label: 'Admin Demo',
        type: 'video',
        url: 'https://drive.google.com/file/d/1ticT-hGU5UEKn0lE6Kk-SMG9WyVzSUgz/view?usp=drive_link',
      },
      {
        label: 'Landlord Demo',
        type: 'video',
        url: 'https://drive.google.com/file/d/1_Rk0lafI2vaubzWKSy1uujTF4xK4Ln4V/view?usp=drive_link',
      },
      {
        label: 'Tenant Demo',
        type: 'video',
        url: 'https://drive.google.com/file/d/18SvSt1d1ITM-ZQnVqhtN4toPGaJYvdi8/view?usp=drive_link',
      },
      {
        label: 'Caretaker Demo',
        type: 'video',
        url: 'https://drive.google.com/file/d/13TqH-tzW1pVzIgYbnbSNHq0cpHk8yOjW/view?usp=drive_link',
      },
    ],
    repository: {
      visibility: 'private',
      reason: 'This project is currently under active development and its repository is private.',
    },
  },
  {
    id: 2,
    title: 'WhatsApp Product Verification',
    description:
      'An anti-counterfeiting platform that helps brands and consumers verify products through WhatsApp. PostgreSQL row-level locking prevents duplicate activations, while HMAC webhook validation, audit trails, and rate limiting secure the verification workflow.',
    highlight:
      'Achieved sub-24ms p95 response times with zero failed requests during load testing at 200 concurrent users.',
    image: '/images/wpv.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WhatsApp Cloud API'],
    category: 'Custom Software',
    demos: [
      {
        type: 'video',
        url: 'https://drive.google.com/file/d/1kN6E4lQUvSvTXl7VgjtQydb0BUZK9OMs/view?usp=sharing',
      },
    ],
    repository: {
      visibility: 'private',
      reason: 'Client project repository is private and not publicly shareable.',
    },
  },
  {
    id: 3,
    title: 'TaskFlow — Project Management Platform',
    description:
      'A project management platform for organizing team workflows, tracking progress, and managing tasks through interactive Kanban boards. Tiered Redis caching, MongoDB aggregation pipelines, and targeted query optimization keep project views responsive.',
    highlight:
      'Engineered for sub-50ms API response times while handling boards with more than 1,000 tasks.',
    image: '/images/project4.jpg',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'TanStack Query'],
    category: 'SaaS',
    demos: [
      {
        type: 'live',
        url: 'https://taskflow-zeta-dusky.vercel.app/',
      },
    ],
    repository: {
      visibility: 'public',
      url: 'https://github.com/CamlineKe/TaskFLow',
    },
  },
  {
    id: 4,
    title: 'AI-Powered Fitness & Wellness Platform',
    description:
      'A health tracking platform combining workout, nutrition, and mental wellness data to deliver personalized recommendations. Three Random Forest models, confidence-scored predictions, and rule-based fallbacks support reliable recommendations.',
    highlight:
      'Reduced recommendation latency by approximately 350ms by batching and parallelizing three recommendation streams.',
    image: '/images/project1.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Python', 'Flask', 'scikit-learn', 'Socket.IO'],
    category: 'AI & Data',
    demos: [
      {
        type: 'video',
        url: 'https://drive.google.com/file/d/1X5lo3IBWAwOMf14NYUZI8D0OR4TGH0tR/view?usp=drive_link',
      },
    ],
    repository: {
      visibility: 'public',
      url: 'https://github.com/CamlineKe/fitnessApp',
    },
  },
  {
    id: 5,
    title: 'Task Management Platform',
    description:
      'A full-stack task management platform with enforced workflow transitions and real-time analytics. A Vue 3 interface connects to a Laravel REST API backed by indexed MySQL queries and containerized deployment.',
    image: '/images/project3.jpg',
    technologies: ['Vue', 'Laravel', 'MySQL', 'TypeScript', 'Docker'],
    category: 'Web Applications',
    demos: [
      {
        type: 'live',
        url: 'https://task-management-psi-jade.vercel.app/',
      },
    ],
    repository: {
      visibility: 'public',
      url: 'https://github.com/CamlineKe/Task_Management',
    },
  },
];
