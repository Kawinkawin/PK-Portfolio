export type ProjectVariant =
  'default' | 'healthcare' | 'pdf' | 'speech' | 'vision' | 'text-summarizer';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  iconClass: string;
  variant: ProjectVariant;
  demoUrl: string;
  codeUrl: string;
  techStack: string[];
}
