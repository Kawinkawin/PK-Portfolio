import type { SkillCategory } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    iconClass: 'fas fa-code',
    layout: 'tags',
    items: [
      { name: 'Python', iconClass: 'fab fa-python' },
      { name: 'C++', iconClass: 'fas fa-code' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    iconClass: 'fas fa-database',
    layout: 'tags',
    items: [
      { name: 'MongoDB', iconClass: 'fas fa-leaf' },
      { name: 'MySQL', iconClass: 'fas fa-table' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Tools',
    iconClass: 'fas fa-layer-group',
    layout: 'tags',
    items: [
      { name: 'React.js', iconClass: 'fab fa-react' },
      { name: 'Flask', iconClass: 'fab fa-python' },
      { name: 'Docker', iconClass: 'fab fa-docker' },
    ],
  },
  {
    id: 'competencies',
    title: 'Core Competencies',
    iconClass: 'fas fa-brain',
    layout: 'tags',
    items: [
      { name: 'Machine Learning', iconClass: 'fas fa-robot' },
      { name: 'Deep Learning', iconClass: 'fas fa-network-wired' },
      { name: 'NLP', iconClass: 'fas fa-language' },
      { name: 'AWS Cloud', iconClass: 'fas fa-cloud' },
      { name: 'Gen-AI', iconClass: 'fas fa-brain' },
      { name: 'Data Structures', iconClass: 'fas fa-code-branch' },
      { name: 'OOPS', iconClass: 'fas fa-cube' },
      { name: 'Data Science', iconClass: 'fas fa-chart-bar' },
    ],
  },
  {
    id: 'dev-tools',
    title: 'Development Tools',
    iconClass: 'fas fa-tools',
    layout: 'tools',
    items: [
      { name: 'VS Code', iconClass: 'fas fa-code' },
      { name: 'GitHub', iconClass: 'fab fa-github' },
      { name: 'n8n', iconClass: 'fas fa-diagram-project' },
      { name: 'Power BI', iconClass: 'fas fa-chart-pie' },
      { name: 'Tableau', iconClass: 'fas fa-chart-area' },
      { name: 'Jupyter', iconClass: 'fas fa-book' },
    ],
  },
];
