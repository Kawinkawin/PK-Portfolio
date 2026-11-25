export type ProjectVariant =
  'default' | 'healthcare' | 'pdf' | 'speech' | 'vision' | 'text-summarizer';

export interface ProjectCaseStudy {
  positioning: string;
  problem: string;
  solution: string;
  architectureSteps: string[];
  implementation: string[];
  challenges: string;
  limitations: string;
  futureImprovements: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconClass: string;
  variant: ProjectVariant;
  demoUrl: string;
  codeUrl: string;
  techStack: string[];
  featured?: boolean;
  caseStudy?: ProjectCaseStudy;
}
