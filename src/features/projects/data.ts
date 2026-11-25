import type { ProjectItem } from './types';

export const PROJECTS: ProjectItem[] = [
  {
    id: 'market-mind-ai',
    title: 'Market Mind AI',
    description:
      'Intelligent Stock Market Assistant with multimodal AI tools, LLM-driven RAG pipelines, and CNN-based diagnostic analysis.',
    iconClass: 'fas fa-chart-line',
    variant: 'default',
    demoUrl: 'https://github.com/Kawinkawin/Market-Mind.AI',
    codeUrl: 'https://github.com/Kawinkawin/Market-Mind.AI',
    techStack: ['React.js', 'MongoDB', 'NLP', 'LSTM', 'ML'],
  },
  {
    id: 'arogyam-ai',
    title: 'Arogyam.ai',
    description:
      'Personalized Healthcare AI Advisor with role-based access, real-time multilingual chat, and ML-powered consultation support.',
    iconClass: 'fas fa-heartbeat',
    variant: 'healthcare',
    demoUrl: '#',
    codeUrl: 'https://github.com/Kawinkawin/Arogyam.ai',
    techStack: ['Python', 'Flask', 'MySQL', 'Google Cloud', 'Docker'],
  },
  {
    id: 'dream-pdf',
    title: 'Dream-PDF',
    description:
      'AI-driven PDF app using BERT for sentiment analysis and RVC model for voice generation. Cross-platform with Flutter and React.',
    iconClass: 'fas fa-file-pdf',
    variant: 'pdf',
    demoUrl: '#',
    codeUrl: '#',
    techStack: ['ReactJS', 'ExpressJS', 'Python', 'Flask', 'Flutter'],
  },
  {
    id: 'ai-speech-therapy-game',
    title: 'AI Speech Therapy Game',
    description:
      'Interactive AI-powered game for speech therapy with personalized exercises, real-time feedback, and gamified progress tracking across platforms.',
    iconClass: 'fas fa-gamepad',
    variant: 'speech',
    demoUrl: 'https://github.com/Kawinkawin/AI-Speech-Therapy-Game',
    codeUrl: 'https://github.com/Kawinkawin/AI-Speech-Therapy-Game',
    techStack: ['AI/ML', 'Speech Recognition', 'Unity', 'Node.js', 'MongoDB'],
  },
  {
    id: 'surveillance-vit',
    title: 'Surveillance System using Vision Transformers',
    description:
      'Intelligent surveillance system leveraging Vision Transformers (ViT) for real-time object detection and activity monitoring in video streams, improving contextual understanding over traditional CNN models.',
    iconClass: 'fas fa-video',
    variant: 'vision',
    demoUrl: 'https://github.com/Kawinkawin/Surveillance-Using-Vision-Transformers',
    codeUrl: 'https://github.com/Kawinkawin/Surveillance-Using-Vision-Transformers',
    techStack: ['Python', 'PyTorch', 'ViT', 'OpenCV', 'Computer Vision'],
  },
  {
    id: 'text-summarizer',
    title: 'Text-Summarizer',
    description:
      'A web-based application that uses T5 Transformer to summarize lengthy text. It features a Flask backend and a Streamlit frontend for seamless interaction.',
    iconClass: 'fas fa-file-alt',
    variant: 'text-summarizer',
    demoUrl: '#',
    codeUrl: '#',
    techStack: ['Python 3.x', 'Flask', 'T5', 'PyTorch', 'Streamlit'],
  },
];
