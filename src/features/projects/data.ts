import type { ProjectItem } from './types';

export const PROJECTS: ProjectItem[] = [
  {
    id: 'enterprise-rag-assistant',
    title: 'Enterprise RAG Assistant',
    category: 'RAG Systems',
    featured: true,
    description:
      'Enterprise Knowledge Assistant using Retrieval-Augmented Generation for site engineers querying SOPs and technical manuals.',
    iconClass: 'fas fa-book-open',
    variant: 'default',
    demoUrl: '#',
    codeUrl: '#',
    techStack: ['Python', 'RAG', 'LLMs', 'Embeddings', 'Vector Search', 'Prompt Engineering'],
    caseStudy: {
      positioning: 'Enterprise Knowledge Assistant using Retrieval-Augmented Generation',
      problem:
        'Site engineers need fast, accurate access to Standard Operating Procedures (SOPs) and technical manuals. Manually searching through large operational documents is time-consuming and error-prone.',
      solution:
        'Developed a RAG-based application that enables site engineers to ask natural-language questions and receive contextually grounded answers backed by relevant technical documentation.',
      architectureSteps: [
        'Technical Documentation & SOPs',
        'Document Processing & Text Chunking',
        'Embedding Generation & Vector Search',
        'User Query → Similarity Retrieval',
        'Context Construction & Prompt Engineering',
        'LLM Generation & Response Validation',
        'Grounded Answer / Out-of-Scope Fallback',
      ],
      implementation: [
        'Document ingestion pipeline with text chunking and embedding generation for semantic retrieval.',
        'Context construction and prompt engineering to ground LLM responses strictly in retrieved documentation.',
        'Response validation, out-of-scope query detection, and fallback mechanisms to reduce unsupported answers.',
      ],
      challenges:
        'Balancing chunk size and retrieval overlap so technical procedures retain their step-by-step context without exceeding prompt context limits.',
      limitations:
        'Internal enterprise deployment; public repository and live demo are not available.',
      futureImprovements:
        'Automated retrieval evaluation benchmarks, hybrid keyword + vector search, and citation highlighting.',
    },
  },
  {
    id: 'mcp-plane-integration',
    title: 'MCP-Based Plane Integration',
    category: 'MCP Integration',
    featured: true,
    description:
      'Experimental AI-powered project management integration using the Model Context Protocol (MCP) and Python MCP SDK.',
    iconClass: 'fas fa-cubes',
    variant: 'default',
    demoUrl: '#',
    codeUrl: '#',
    techStack: ['Python', 'Model Context Protocol', 'Python MCP SDK', 'Asyncio', 'REST APIs'],
    caseStudy: {
      positioning:
        'Experimental AI-Powered Project Management Integration using Model Context Protocol',
      problem:
        'Interacting with self-hosted project management environments (Plane) across multiple endpoints requires manual navigation or custom one-off scripts.',
      solution:
        'Experimented with building an MCP harness in Python that exposes Plane REST API operations as structured MCP tools for AI applications.',
      architectureSteps: [
        'User → AI Application / MCP Client',
        'MCP Server (Python MCP SDK)',
        'Registered Tools & Asyncio Handlers',
        'Plane REST API → Self-Hosted Plane Instance',
        'Structured Tool Response → AI Application',
      ],
      implementation: [
        'Built an experimental MCP server using the Python MCP SDK and asynchronous Python (Asyncio).',
        'Registered structured tools wrapping Plane REST API endpoints with error handling for API failures.',
        'Tested MCP client-server tool invocation for AI-assisted project management workflows.',
      ],
      challenges:
        'Designing clean tool schemas and handling asynchronous REST API errors gracefully within MCP tool responses.',
      limitations:
        'Experimental implementation only — not claimed as production-ready or a fully autonomous agent.',
      futureImprovements:
        'Expanded tool coverage, stricter input/output validation, and automated integration tests.',
    },
  },
  {
    id: 'lms-automation-portal',
    title: 'LMS Automation & Assessment Portal',
    category: 'Backend Development',
    featured: true,
    description:
      'Internal workflow automation platform for candidate registration, LMS user creation, assessment assignment, and result retrieval.',
    iconClass: 'fas fa-cogs',
    variant: 'default',
    demoUrl: '#',
    codeUrl: '#',
    techStack: ['Python', 'REST APIs', 'SQL', 'Workflow Automation', 'Backend'],
    caseStudy: {
      positioning: 'Automated LMS Integration and Candidate Assessment Management Platform',
      problem:
        'Manual candidate registration, LMS account creation, assessment allocation, and result tracking involve repetitive administrative steps.',
      solution:
        'Developed an internal portal that collects candidate information and automates registration, assessment assignment, and result retrieval via LMS REST APIs.',
      architectureSteps: [
        'Candidate Form Collection',
        'Python Backend Validation & Database Storage',
        'LMS REST API Integration (User Creation)',
        'Automated Assessment Assignment',
        'Result Retrieval & Evaluation Display',
      ],
      implementation: [
        'Candidate form collection and profile management backed by relational database storage.',
        'Automated LMS user creation and assessment allocation through REST API integration.',
        'Result retrieval and structured evaluation display for internal reviewers.',
      ],
      challenges:
        'Synchronizing local candidate records with external LMS API state and handling partial failures during multi-step registration.',
      limitations: 'Internal organizational tool; source code and live URL are private.',
      futureImprovements: 'Retry queues for failed API calls and role-based audit logging.',
    },
  },
  {
    id: 'arogyam-ai',
    title: 'Arogyam.ai',
    category: 'Generative AI',
    featured: true,
    description:
      'AI-enabled doctor–patient consultation platform built with Python, Flask, MySQL, Hugging Face Transformers, and RBAC.',
    iconClass: 'fas fa-heartbeat',
    variant: 'healthcare',
    demoUrl: '#',
    codeUrl: 'https://github.com/Kawinkawin/Arogyam.ai',
    techStack: [
      'Python',
      'Flask',
      'MySQL',
      'Hugging Face Transformers',
      'Google Cloud Translation',
      'Docker',
      'RBAC',
    ],
    caseStudy: {
      positioning: 'AI-Enabled Doctor–Patient Consultation Platform',
      problem:
        'Patients and doctors need structured consultation workflows, multilingual communication, and context-aware assistance without losing human clinical oversight.',
      solution:
        'Built a Flask and MySQL healthcare application with Role-Based Access Control (RBAC), appointment scheduling, multilingual translation, and specialty-aware AI assistance.',
      architectureSteps: [
        'Doctor / Patient Registration (RBAC)',
        'Consultation & Patient History Context',
        'Hugging Face Transformers AI Assistance',
        'Google Cloud Translation API (Multilingual)',
        'Pharmacy & Follow-Up Reminder Workflows',
      ],
      implementation: [
        'Implemented doctor and patient registration with Role-Based Access Control (RBAC).',
        'Integrated Hugging Face Transformers for specialty-aware AI assistance alongside patient history context.',
        'Added Google Cloud Translation API for multilingual support, appointment scheduling, and Docker containerization.',
      ],
      challenges:
        'Ensuring AI-generated healthcare information remains strictly assistive with clear human-in-the-loop doctor oversight.',
      limitations:
        'AI outputs are informational only and require clinical verification; full HIPAA-grade encryption and audit trails are future improvements.',
      futureImprovements:
        'End-to-end field-level encryption, comprehensive audit logging, and clinician feedback loops.',
    },
  },
  {
    id: 'market-mind-ai',
    title: 'Market Mind AI',
    category: 'Machine Learning',
    description:
      'Intelligent stock market assistant combining LLM-driven RAG pipelines, LSTM forecasting, and CNN-based diagnostic analysis.',
    iconClass: 'fas fa-chart-line',
    variant: 'default',
    demoUrl: 'https://github.com/Kawinkawin/Market-Mind.AI',
    codeUrl: 'https://github.com/Kawinkawin/Market-Mind.AI',
    techStack: ['React.js', 'MongoDB', 'NLP', 'LSTM', 'Machine Learning'],
  },
  {
    id: 'ai-speech-therapy-game',
    title: 'AI Speech Therapy Game',
    category: 'Machine Learning',
    description:
      'Interactive AI-powered speech therapy game with personalized exercises, real-time feedback, and gamified progress tracking.',
    iconClass: 'fas fa-gamepad',
    variant: 'speech',
    demoUrl: 'https://github.com/Kawinkawin/AI-Speech-Therapy-Game',
    codeUrl: 'https://github.com/Kawinkawin/AI-Speech-Therapy-Game',
    techStack: ['AI/ML', 'Speech Recognition', 'Unity', 'Node.js', 'MongoDB'],
  },
  {
    id: 'surveillance-vit',
    title: 'Surveillance System using Vision Transformers',
    category: 'Computer Vision',
    description:
      'Real-time object detection and activity monitoring in video streams using Vision Transformers (ViT) and PyTorch.',
    iconClass: 'fas fa-video',
    variant: 'vision',
    demoUrl: 'https://github.com/Kawinkawin/Surveillance-Using-Vision-Transformers',
    codeUrl: 'https://github.com/Kawinkawin/Surveillance-Using-Vision-Transformers',
    techStack: ['Python', 'PyTorch', 'ViT', 'OpenCV', 'Computer Vision'],
  },
  {
    id: 'dream-pdf',
    title: 'Dream-PDF',
    category: 'Generative AI',
    description:
      'AI-driven PDF application using BERT for sentiment analysis and RVC model for voice generation across Flutter and React.',
    iconClass: 'fas fa-file-pdf',
    variant: 'pdf',
    demoUrl: '#',
    codeUrl: '#',
    techStack: ['ReactJS', 'ExpressJS', 'Python', 'Flask', 'Flutter'],
  },
  {
    id: 'text-summarizer',
    title: 'Text-Summarizer',
    category: 'Generative AI',
    description:
      'Web-based text summarization application powered by the T5 Transformer model with a Flask backend and Streamlit frontend.',
    iconClass: 'fas fa-file-alt',
    variant: 'text-summarizer',
    demoUrl: '#',
    codeUrl: '#',
    techStack: ['Python 3.x', 'Flask', 'T5', 'PyTorch', 'Streamlit'],
  },
];
