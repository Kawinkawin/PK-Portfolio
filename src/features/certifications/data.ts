import type { CertificationItem } from './types';

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-dsa',
    number: '01',
    year: '2022',
    organization: 'Udemy',
    title: 'Mastering Data Structures & Algorithms in C/C++',
    description:
      'Comprehensive mastery of DSA concepts including trees, graphs, dynamic programming, and algorithmic complexity analysis.',
    iconClass: 'fas fa-code',
    tags: ['C++', 'Algorithms', 'Competitive Programming'],
  },
  {
    id: 'cert-sql',
    number: '02',
    year: '2023',
    organization: 'HackerRank',
    title: 'Structured Query Language (SQL)',
    description:
      'Advanced SQL proficiency including complex queries, database optimization, and efficient data manipulation techniques.',
    iconClass: 'fas fa-database',
    tags: ['MySQL', 'PostgreSQL', 'Query Optimization'],
  },
  {
    id: 'cert-aws',
    number: '03',
    year: '2024',
    organization: 'Amazon',
    title: 'AWS Cloud Practitioner',
    description:
      'Validated cloud fluency and foundational AWS knowledge including core services, security, architecture, and pricing.',
    iconClass: 'fab fa-aws',
    tags: ['EC2', 'S3', 'Cloud Security'],
  },
  {
    id: 'cert-ibm-data',
    number: '04',
    year: '2025',
    organization: 'IBM SkillsBuild',
    title: 'Data Fundamentals',
    description:
      'Foundation in data concepts, data lifecycle, and essential data analysis techniques for modern data-driven decision making.',
    iconClass: 'fas fa-database',
    tags: ['Data Analysis', 'IBM Watson', 'Visualization'],
  },
  {
    id: 'cert-nptel-cloud',
    number: '05',
    year: '2025',
    organization: 'NPTEL (IIT Kanpur)',
    title: 'Cloud Computing & Distributed Systems',
    description:
      'In-depth understanding of cloud architectures, distributed computing paradigms, and scalable system design principles.',
    iconClass: 'fas fa-cloud',
    tags: ['AWS', 'Distributed Systems', 'Scalability'],
  },
  {
    id: 'cert-iitk-trading',
    number: '06',
    year: '2025',
    organization: 'IIT Kanpur',
    title: 'Advanced Algorithmic Trading & Portfolio Management',
    description:
      'Comprehensive certification covering quantitative trading strategies, portfolio optimization, and risk management techniques using Python and financial modeling.',
    iconClass: 'fas fa-university',
    tags: ['Quantitative Finance', 'Python', 'Risk Management'],
  },
  {
    id: 'cert-databricks-genai',
    number: '07',
    year: '2025',
    organization: 'Databricks',
    title: 'Academy Accreditation - Generative AI Fundamentals',
    description: 'Issued in January 2025 (Expires Jan 2027).',
    iconClass: 'fas fa-brain',
    tags: ['Artificial Intelligence', 'Generative AI', 'LLMs'],
    credentialUrl:
      'https://credentials.databricks.com/2ea568a7-29c1-4a96-8929-6155b860268f#acc.6yjnYCUb',
  },
  {
    id: 'cert-hp-ai',
    number: '08',
    year: '2026',
    organization: 'HP LIFE',
    title: 'AI for Business Professionals',
    description: 'Earned in February 2026.',
    iconClass: 'fas fa-briefcase',
    tags: ['AI Strategy', 'Business Automation', 'Digital Transformation'],
    credentialUrl: 'https://www.life-global.org/certificate/a0256290-3b3a-4665-b37b-24b0979dc609',
  },
  {
    id: 'cert-ibm-python',
    number: '09',
    year: '2026',
    organization: 'IBM',
    title: 'Python for Data Science',
    description: 'Earned in March 2026.',
    iconClass: 'fab fa-python',
    tags: ['Data Analysis', 'Data Modeling', 'Python'],
    credentialUrl: 'https://www.credly.com/badges/8fe5f87b-83d9-4106-8b1b-c876b91b6517/public_url',
  },
];
