import { Project } from '../types';

export type ProjectRank = 'flagship' | 'wide' | 'standard';

export interface PackedProject {
  project: Project;
  rank: ProjectRank;
}

export function packProjects(projects: Project[]): PackedProject[] {
  const featured = projects.find((project) => project.featured);
  const rest = featured
    ? projects.filter((project) => project.id !== featured.id)
    : projects;

  const packed: PackedProject[] = [];

  if (featured) {
    packed.push({ project: featured, rank: 'flagship' });
  }

  const remaining = rest.length;
  if (remaining === 0) {
    return packed;
  }

  if (remaining === 1 || remaining === 3) {
    for (const project of rest) {
      packed.push({ project, rank: 'standard' });
    }
    return packed;
  }

  packed.push({ project: rest[0], rank: 'wide' });
  for (const project of rest.slice(1)) {
    packed.push({ project, rank: 'standard' });
  }

  return packed;
}
