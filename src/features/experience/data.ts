import type { ExperienceItem } from './types';

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'expTile1',
    role: 'AIML Engineer',
    company: 'Teceze ltd',
    tileDuration: 'March 2026 - Present',
    modalDuration: 'March 2026 - Present',
    status: 'Current',
    iconClass: 'fas fa-robot',
    details: [
      'Developed a RAG-based assistant for site engineers to retrieve information from Standard Operating Procedures (SOPs) and technical manuals',
      'Integrated Large Language Models (LLMs) into application workflows with prompt engineering, contextual grounding, and response validation',
      'Experimented with Model Context Protocol (MCP) integrations and tool-driven workflows',
      'Built internal workflow automation platforms, including LMS user registration and assessment management integration',
      'Developed Python backend services, REST API integrations, and database-driven applications',
    ],
    techs: ['Python', 'RAG', 'LLMs', 'MCP', 'REST APIs', 'Prompt Engineering'],
  },
  {
    id: 'expTile2',
    role: 'Data Science Intern',
    company: 'V3 Analytics',
    tileDuration: 'Jul 2024 - Aug 2024',
    modalDuration: '2024 (6 Months)',
    iconClass: 'fas fa-chart-line',
    details: [
      'Performed industrial data preprocessing and analysis using Python, Pandas, and NumPy',
      'Built predictive models using scikit-learn and visualized findings with Matplotlib and Seaborn',
      'Developed Power BI dashboards using Power Query and DAX for business KPI analysis',
    ],
    techs: [
      'Python',
      'Pandas',
      'NumPy',
      'scikit-learn',
      'Matplotlib',
      'Seaborn',
      'Power BI',
      'DAX',
    ],
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
