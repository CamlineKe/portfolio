// Type definitions for the portfolio project

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveDemo: string;
  sourceCode: string;
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

