import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'TaskFlow — Enterprise Project Management',
    description:
      'Full-stack project management platform with interactive drag-and-drop Kanban boards powered by @dnd-kit. Implements tiered Redis caching (2-10 min TTL) eliminating redundant DB queries for board data, projects, and task lists. Architected with Next.js 14, Node.js/Express, MongoDB with compound indexing for O(log n) query performance. Aggregates dashboard stats via MongoDB pipelines, minimizing database round-trips. Delivers instant drag-and-drop feedback with zero page reloads. Features JWT auth with Passport.js, email verification via SMTP, and server-side data fetching with TanStack Query.',
    image: '/images/project4.jpg',
    technologies: [
      'Next.js',
      'TypeScript',
      'MongoDB',
      'JWT',
      'Node.js',
      'Material-UI',
      'Express',
    ],
    demo: {
      type: 'live',
      url: 'https://taskflow-zeta-dusky.vercel.app/',
    },
    repository: {
      visibility: 'public',
      url: 'https://github.com/CamlineKe/TaskFLow',
    },
  },
  {
    id: 2,
    title: 'Fitness Tracker — Personalized Wellness Platform',
    description:
      'AI-powered fitness platform enabling users to log workouts, nutrition, and mental health check-ins while receiving personalized ML-generated recommendations via 3 RandomForest models. Architected as decoupled microservices with React frontend, Node.js API gateway, and Python Flask AI service. Achieved 70% cache hit rates through multi-layer LRU caching and reduced AI latency by 60% via batch API parallelization. Integrated Google Fit and Fitbit OAuth2 for device synchronization. Real-time gamification with Socket.IO WebSocket rooms and atomic streak calculations. Delivered sub-500ms p95 response times under concurrent load with zero service degradation.',
    image: '/images/project1.jpg',
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'Python',
      'Flask',
      'Express',
      'Socket.io',
      'Vite',
    ],
    demo: {
      type: 'video',
      url: 'https://drive.google.com/file/d/1X5lo3IBWAwOMf14NYUZI8D0OR4TGH0tR/view?usp=drive_link',
    },
    repository: {
      visibility: 'public',
      url: 'https://github.com/CamlineKe/fitnessApp',
    },
  },
  {
    id: 3,
    title: 'Whatsapp Product Verification System',
    description:
      'WhatsApp-based product authentication system enabling instant product verification via Meta Business API. Brands generate millions of unique codes with QR URLs, track batch performance through a React admin dashboard, and monitor real-time verification analytics. Eliminated fraudulent duplicate activations using PostgreSQL row-level locking (FOR UPDATE), JWT authentication, and rate-limited verification flows. Achieved 24ms p95 response times under 200+ concurrent user load testing with zero failed requests.',
    image: '/images/wpv.jpg',
    technologies: ['React', 'PostgreSQL', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    demo: {
      type: 'video',
      url: 'https://drive.google.com/file/d/1BdUkJHmL-Ukdo0jpJoPSkKfXYp_lkJei/view?usp=drive_link',
    },
    repository: {
      visibility: 'private',
      reason: 'Client project repository is private and not publicly shareable.',
    },
  },
  {
    id: 4,
    title: 'Task Management Platform',
    description:
      'Full-stack task management platform with intelligent workflow enforcement and real-time analytics. Vue 3 SPA with Pinia state management paired with Laravel 13 REST API featuring strict status transition rules and 8 strategic database indexes for optimized query performance. Containerized with multi-stage Docker builds (~80MB), deployed on Aiven MySQL, Render, and Vercel. 100% PHPUnit test coverage with edge case validation.',
    image: '/images/project3.jpg',
    technologies: ['Vue', 'Laravel', 'MySQL', 'TypeScript', 'Docker'],
    demo: {
      type: 'live',
      url: 'https://task-management-psi-jade.vercel.app/',
    },
    repository: {
      visibility: 'public',
      url: 'https://github.com/CamlineKe/Task_Management',
    },
  },
  {
    id: 5,
    title: 'RMS Admin Portal',
    description:
      'Platform administration portal for RMS enabling system admins to onboard landlords, provision optional starter properties/units, suspend/reactivate accounts, inspect read-only landlord dashboards, and generate PDF/Excel operational reports. Optimized platform analytics with Redis-cached aggregate reports, materialized PostgreSQL landlord summaries, paginated landlord search, and async BullMQ export jobs so expensive reporting workloads stay off the request path. Hardened admin operations with RS256 JWT auth, refresh-token revocation on suspension, audit logging, credential delivery via SMS/email queues, and report status polling with bounded retries.',
    image: '/images/rms_admin.jpg',
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'TanStack Query',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'BullMQ',
      'Zod',
      'JWT RS256',
    ],
    demo: {
      type: 'video',
      url: 'https://drive.google.com/file/d/1cnPHvzoPsThOcqoznf_PIPpyVNfJaRIV/view?usp=drive_link',
    },
    repository: {
      visibility: 'private',
      reason: 'Client project repository is private and not publicly shareable.',
    },
  },
  {
    id: 6,
    title: 'RMS Landlord Dashboard',
    description:
      'Multi-property landlord dashboard for managing properties, variable-rent units, tenants, caretakers, arrears, complaints, statements, and reconciliation reports. The backend uses landlord-scoped Prisma queries, indexed payment lookups, transactional property/unit creation, Redis dashboard caching, server-side pagination, and parallel aggregate queries to support operational views without leaking data across landlords. Financial workflows include rent-cycle charges, payment allocations, instalment tracking, arrears summaries, complaint oversight, and async statement/reconciliation exports.',
    image: '/images/rms_landlord.jpg',
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'TanStack Query',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'BullMQ',
      'Zod',
      'JWT RS256',
    ],
    demo: {
      type: 'video',
      url: 'https://drive.google.com/file/d/1cnPHvzoPsLhOcqoznf_QIPpyVNfJaRIV/view?usp=drive_link',
    },
    repository: {
      visibility: 'private',
      reason: 'Client project repository is private and not publicly shareable.',
    },
  },
  {
    id: 7,
    title: 'RMS Tenant Portal',
    description:
      'Mobile-first tenant portal for rent payments, M-Pesa STK Push initiation, payment status tracking, Lipa Mdogo Mdogo instalment plans, complaint submission, media uploads, and account management. The payment flow validates full/partial/instalment amounts server-side, blocks duplicate pending payments, supports primary/alternative/override payment phones, and reconciles Daraja callbacks atomically using PostgreSQL advisory locks and Serializable transactions. Tenant dashboards and instalment views are Redis-cached, while complaints support Cloudinary uploads, status timelines, and caretaker notifications through queued SMS.',
    image: '/images/rms_tenant.jpg',
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'TanStack Query',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'BullMQ',
      'Zod',
      'JWT RS256',
      'Cloudinary',
    ],
    demo: {
      type: 'video',
      url: 'https://drive.google.com/file/d/1cnPHvzoPsThOcqoznf_QIPpyVTfJaRIV/view?usp=drive_link',
    },
    repository: {
      visibility: 'private',
      reason: 'Client project repository is private and not publicly shareable.',
    },
  },
  {
    id: 8,
    title: 'RMS Caretaker Portal',
    description:
      'Focused caretaker operations portal for assigned-property workflows: overdue tenant tracking, SMS reminders, complaint assignment, complaint status updates, media review, and activity history. Backend access is automatically scoped to caretaker-property assignments, with cached dashboard/overdue views, paginated complaint tables, status transition validation, and Redis-enforced 24-hour reminder cooldowns. Overdue visibility is based on unpaid rent-cycle records rather than only last-payment heuristics, improving follow-up accuracy for caretakers handling daily property operations.',
    image: '/images/rms_caretaker.jpg',
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'TanStack Query',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'BullMQ',
      'Zod',
      'JWT RS256',
      "Africa's Talking",
    ],
    demo: {
      type: 'video',
      url: 'https://drive.google.com/file/d/1cnPKvzoPsThOcqoznf_QIPpyVNfJaRIV/view?usp=drive_link',
    },
    repository: {
      visibility: 'private',
      reason: 'Client project repository is private and not publicly shareable.',
    },
  },
];
