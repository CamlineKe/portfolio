// Type definitions for the portfolio project

export interface ProjectRepositoryPublic {
  visibility: 'public';
  url: string;
}

export interface ProjectRepositoryPrivate {
  visibility: 'private';
  reason?: string;
}

export type ProjectRepository = ProjectRepositoryPublic | ProjectRepositoryPrivate;

export interface ProjectDemoLive {
  type: 'live';
  url: string;
}

export interface ProjectDemoVideo {
  type: 'video';
  url: string;
}

export type ProjectDemo = ProjectDemoLive | ProjectDemoVideo;

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demo: ProjectDemo;
  repository: ProjectRepository;
}

export interface Skill {
  name: string;
  percentage: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: any;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export type Theme = 'light' | 'dark';
