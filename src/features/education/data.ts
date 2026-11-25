import type { EducationItem } from './types';

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: 'btech-ai-ds',
    degree: 'B.Tech AI & Data Science',
    institution: 'Sri Eshwar College of Engineering, Coimbatore',
    label: 'Duration',
    period: '2022 - 2026',
    iconClass: 'fas fa-graduation-cap',
    featured: true,
  },
  {
    id: 'higher-secondary',
    degree: 'Higher Secondary (CBSE)',
    institution: 'The Velammal International School, Ponneri',
    label: 'Year',
    period: '2020 - 2022',
    iconClass: 'fas fa-school',
  },
  {
    id: 'secondary',
    degree: 'Secondary (ICSE)',
    institution: 'BMD Jain School, Vellore',
    label: 'Year',
    period: '2019 - 2020',
    iconClass: 'fas fa-book',
  },
];
