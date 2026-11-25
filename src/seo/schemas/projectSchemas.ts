import { SITE_CONFIG } from '../config/siteConfig';

interface ProjectSchemaInput {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  codeUrl: string;
  demoUrl: string;
}

/**
 * Build a schema.org/SoftwareSourceCode (or CreativeWork) schema for a project.
 * https://schema.org/SoftwareSourceCode
 */
function buildProjectSchema(project: ProjectSchemaInput) {
  const hasRealCodeUrl = project.codeUrl !== '#';
  const hasRealDemoUrl = project.demoUrl !== '#' && project.demoUrl !== project.codeUrl;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.description,
    programmingLanguage: project.techStack,
    author: {
      '@id': `${SITE_CONFIG.baseUrl}/#person`,
    },
    url: hasRealCodeUrl ? project.codeUrl : SITE_CONFIG.baseUrl,
    codeRepository: hasRealCodeUrl ? project.codeUrl : undefined,
    runtimePlatform: 'Web',
  };

  if (hasRealDemoUrl) {
    schema['sameAs'] = project.demoUrl;
  }

  return schema;
}

/** All six portfolio projects as structured data */
export function buildProjectsSchema() {
  const projects: ProjectSchemaInput[] = [
    {
      id: 'market-mind-ai',
      title: 'Market Mind AI',
      description:
        'Intelligent Stock Market Assistant with multimodal AI tools, LLM-driven RAG pipelines, and CNN-based diagnostic analysis.',
      techStack: ['React.js', 'MongoDB', 'NLP', 'LSTM', 'Machine Learning'],
      codeUrl: 'https://github.com/Kawinkawin/Market-Mind.AI',
      demoUrl: 'https://github.com/Kawinkawin/Market-Mind.AI',
    },
    {
      id: 'arogyam-ai',
      title: 'Arogyam.ai',
      description:
        'Personalized Healthcare AI Advisor with role-based access, real-time multilingual chat, and ML-powered consultation support.',
      techStack: ['Python', 'Flask', 'MySQL', 'Google Cloud', 'Docker'],
      codeUrl: 'https://github.com/Kawinkawin/Arogyam.ai',
      demoUrl: '#',
    },
    {
      id: 'dream-pdf',
      title: 'Dream-PDF',
      description:
        'AI-driven PDF application using BERT for sentiment analysis and RVC model for voice generation. Cross-platform with Flutter and React.',
      techStack: ['ReactJS', 'ExpressJS', 'Python', 'Flask', 'Flutter'],
      codeUrl: '#',
      demoUrl: '#',
    },
    {
      id: 'ai-speech-therapy-game',
      title: 'AI Speech Therapy Game',
      description:
        'Interactive AI-powered game for speech therapy with personalized exercises, real-time feedback, and gamified progress tracking across platforms.',
      techStack: ['AI/ML', 'Speech Recognition', 'Unity', 'Node.js', 'MongoDB'],
      codeUrl: 'https://github.com/Kawinkawin/AI-Speech-Therapy-Game',
      demoUrl: 'https://github.com/Kawinkawin/AI-Speech-Therapy-Game',
    },
    {
      id: 'surveillance-vit',
      title: 'Surveillance System using Vision Transformers',
      description:
        'Intelligent surveillance system leveraging Vision Transformers (ViT) for real-time object detection and activity monitoring in video streams.',
      techStack: ['Python', 'PyTorch', 'Vision Transformers', 'OpenCV', 'Computer Vision'],
      codeUrl: 'https://github.com/Kawinkawin/Surveillance-Using-Vision-Transformers',
      demoUrl: 'https://github.com/Kawinkawin/Surveillance-Using-Vision-Transformers',
    },
    {
      id: 'text-summarizer',
      title: 'Text-Summarizer',
      description:
        'Web-based text summarization application using the T5 Transformer model. Features a Flask backend and Streamlit frontend.',
      techStack: ['Python', 'Flask', 'T5 Transformer', 'PyTorch', 'Streamlit'],
      codeUrl: '#',
      demoUrl: '#',
    },
  ];

  return projects.map(buildProjectSchema);
}
