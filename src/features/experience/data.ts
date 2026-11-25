import type { ExperienceItem } from './types';

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'expTile1',
    role: 'AIML Engineer',
    company: 'Teceze ltd',
    tileDuration: 'March 2026 - Present',
    modalDuration: 'March 2026 - Present',
    status: 'Current',
    iconClass: 'fas fa-tasks',
    details: [
      'Automated workflows improving efficiency and AI-driven project visibility',
      'Collaborated with engineers supporting technical execution and ML integration',
      'Managed stakeholders ensuring timely delivery of AI-focused initiatives',
      'Translated technical concepts into impactful AI/ML business presentations',
    ],
    techs: [],
  },
  {
    id: 'expTile2',
    role: 'Data Science Intern',
    company: 'V3 Analytics',
    tileDuration: 'Jul 2024 - Aug 2024',
    modalDuration: '2024 (6 Months)',
    iconClass: 'fas fa-chart-line',
    details: [
      'Analyzed real-world datasets to extract meaningful insights',
      'Applied predictive modeling techniques',
      'Presented findings effectively to stakeholders',
    ],
    techs: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'scikit-learn'],
  },
  {
    id: 'expTile3',
    role: 'Django Framework Intern',
    company: 'RV Tech Learn',
    tileDuration: 'Feb 2024 - Mar 2024',
    modalDuration: '2024 (3 Months)',
    iconClass: 'fab fa-python',
    details: [
      'Created APIs and streamlined user authentication',
      'Spearheaded database integration efforts',
      'Collaborated on emerging technology exploration',
    ],
    techs: ['Django', 'Bootstrap', 'SQLite'],
  },
];
