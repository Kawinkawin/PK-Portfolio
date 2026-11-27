/**
 * Cloudflare Pages Middleware — Markdown for Agents (Content Negotiation)
 *
 * - Serves clean, lossless Markdown when `Accept: text/markdown` is requested
 *   (and `text/html` is not preferred over `text/markdown`).
 * - Normal browser HTML requests pass through to `context.next()` unchanged.
 * - Includes `Vary: Accept` and `Link: <url>; rel="alternate"; type="text/html"`
 *   so agents can always request HTML whenever needed.
 */

interface PagesContext {
  request: Request;
  next: () => Promise<Response>;
}

const BASE_URL = 'https://kawinprabhakaran.online';

const MARKDOWN_HOME = `---
title: Kawin Prabhakaran | AI/ML Engineer | Generative AI, RAG & MCP
canonical: ${BASE_URL}/
description: Explore Kawin Prabhakaran's portfolio — an AI/ML Engineer building Generative AI applications, RAG systems, LLM integrations, MCP-based workflows, and Python backend solutions.
author: Kawin Prabhakaran (Kawin P)
image: ${BASE_URL}/assets/image.png
image_alt: Kawin Prabhakaran Portfolio Icon
---

# Hi, I'm Kawin Prabhakaran

**Building Intelligent Systems with Generative AI.**

AI/ML Engineer focused on building practical AI-powered applications, LLM-integrated systems, and intelligent automation workflows. I work across Generative AI, Retrieval-Augmented Generation, MCP-based integrations, and Python backend development.

**Keywords:** AI/ML Engineer | Generative AI | RAG | LLM Engineering | MCP | Python

- [Explore My Projects](${BASE_URL}/#projects)
- [Download Resume](https://drive.google.com/file/d/1KO7HutVhAmtQRTJVL02phgwwNfBS5nxG/view?usp=drive_link)
- [Contact Me](mailto:kawinprabha08@gmail.com)
- [GitHub](https://github.com/Kawinkawin)
- [LinkedIn](https://www.linkedin.com/in/kawin-prahakaran/)

### Key Stats
- **300+** LeetCode Problems
- **180+** CodeChef Solutions
- **6+** Certifications

---

## About Me

I am an **Artificial Intelligence and Data Science graduate** currently working as an **AI/ML Engineer**. My work focuses on developing practical AI applications, integrating Large Language Models into software systems, and building intelligent workflows that solve real-world problems.

I have hands-on experience developing Retrieval-Augmented Generation (RAG) applications, experimenting with Model Context Protocol (MCP) integrations, implementing AI-powered solutions, and building Python-based backend systems. Beyond AI development, I have worked on application integration, workflow automation, database-driven platforms, data analysis, and predictive modelling.

- AI/ML Engineer at Teceze Ltd
- B.Tech AI & DS Graduate (2022–2026)
- RAG, LLM & MCP Integrations
- [Read Full Biography](${BASE_URL}/about)

---

## Professional Experience

### 1. AIML Engineer — Teceze Ltd (March 2026 – Present | Current)
- Developed a RAG-based assistant for site engineers to retrieve information from Standard Operating Procedures (SOPs) and technical manuals.
- Integrated Large Language Models (LLMs) into application workflows with prompt engineering, contextual grounding, and response validation.
- Experimented with Model Context Protocol (MCP) integrations and tool-driven workflows.
- Built internal workflow automation platforms, including LMS user registration and assessment management integration.
- Developed Python backend services, REST API integrations, and database-driven applications.
- **Technologies:** Python, RAG, LLMs, MCP, REST APIs, Prompt Engineering

### 2. Data Science Intern — V3 Analytics (Jul 2024 – Aug 2024 | 2024 (6 Months))
- Performed industrial data preprocessing and analysis using Python, Pandas, and NumPy.
- Built predictive models using scikit-learn and visualized findings with Matplotlib and Seaborn.
- Developed Power BI dashboards using Power Query and DAX for business KPI analysis.
- **Technologies:** Python, Pandas, NumPy, scikit-learn, Matplotlib, Seaborn, Power BI, DAX

### 3. Django Framework Intern — RV Tech Learn (Feb 2024 – Mar 2024 | 2024 (3 Months))
- Created APIs and streamlined user authentication.
- Spearheaded database integration efforts.
- Collaborated on emerging technology exploration.
- **Technologies:** Django, Bootstrap, SQLite

---

## Education

- **B.Tech AI & Data Science** — Sri Eshwar College of Engineering, Coimbatore (2022 – 2026 | Completed)
- **Higher Secondary (CBSE)** — The Velammal International School, Ponneri (2020 – 2022)
- **Secondary (ICSE)** — BMD Jain School, Vellore (2019 – 2020)

---

## Featured Projects

1. **Enterprise RAG Assistant** (*RAG Systems*) — Enterprise Knowledge Assistant using Retrieval-Augmented Generation for site engineers querying SOPs and technical manuals.
   - **Stack:** Python, RAG, LLMs, Embeddings, Vector Search, Prompt Engineering
   - [View Case Study](${BASE_URL}/projects/enterprise-rag-assistant)
2. **MCP-Based Plane Integration** (*MCP Integration*) — Experimental AI-powered project management integration using the Model Context Protocol (MCP) and Python MCP SDK.
   - **Stack:** Python, Model Context Protocol, Python MCP SDK, Asyncio, REST APIs
   - [View Case Study](${BASE_URL}/projects/mcp-plane-integration)
3. **LMS Automation & Assessment Portal** (*Backend Development*) — Internal workflow automation platform for candidate registration, LMS user creation, assessment assignment, and result retrieval.
   - **Stack:** Python, REST APIs, SQL, Workflow Automation, Backend
   - [View Case Study](${BASE_URL}/projects/lms-automation-portal)
4. **Arogyam.ai** (*Generative AI*) — AI-enabled doctor–patient consultation platform built with Python, Flask, MySQL, Hugging Face Transformers, and RBAC.
   - **Stack:** Python, Flask, MySQL, Hugging Face Transformers, Google Cloud Translation, Docker, RBAC
   - [View Case Study](${BASE_URL}/projects/arogyam-ai) | [GitHub](https://github.com/Kawinkawin/Arogyam.ai)
5. **Market Mind AI** (*Machine Learning*) — Intelligent stock market assistant combining LLM-driven RAG pipelines, LSTM forecasting, and CNN-based diagnostic analysis.
   - **Stack:** React.js, MongoDB, NLP, LSTM, Machine Learning
   - [View Case Study](${BASE_URL}/projects/market-mind-ai) | [GitHub](https://github.com/Kawinkawin/Market-Mind.AI)
6. **AI Speech Therapy Game** (*Machine Learning*) — Interactive AI-powered speech therapy game with personalized exercises, real-time feedback, and gamified progress tracking.
   - **Stack:** AI/ML, Speech Recognition, Unity, Node.js, MongoDB
   - [View Case Study](${BASE_URL}/projects/ai-speech-therapy-game) | [GitHub](https://github.com/Kawinkawin/AI-Speech-Therapy-Game)
7. **Surveillance System using Vision Transformers** (*Computer Vision*) — Real-time object detection and activity monitoring in video streams using Vision Transformers (ViT) and PyTorch.
   - **Stack:** Python, PyTorch, ViT, OpenCV, Computer Vision
   - [View Case Study](${BASE_URL}/projects/surveillance-vit) | [GitHub](https://github.com/Kawinkawin/Surveillance-Using-Vision-Transformers)
8. **Dream-PDF** (*Generative AI*) — AI-driven PDF application using BERT for sentiment analysis and RVC model for voice generation across Flutter and React.
   - **Stack:** ReactJS, ExpressJS, Python, Flask, Flutter
   - [View Case Study](${BASE_URL}/projects/dream-pdf)
9. **Text-Summarizer** (*Generative AI*) — Web-based text summarization application powered by the T5 Transformer model with a Flask backend and Streamlit frontend.
   - **Stack:** Python 3.x, Flask, T5, PyTorch, Streamlit
   - [View Case Study](${BASE_URL}/projects/text-summarizer)

---

## Technical Skills

- **Programming & Backend Development:** Python, Flask, REST APIs, Asyncio, API Integration
- **Generative AI & RAG Engineering:** LLM Integration, Prompt Engineering, Retrieval-Augmented Generation, Embeddings, Vector Search, Hugging Face Transformers, NeMo Guardrails
- **Agentic AI & System Integration:** Model Context Protocol (MCP), Python MCP SDK, Tool Integration, n8n Workflow Automation
- **Databases & Data Engineering:** PostgreSQL, MySQL, Vector Databases, SQL, Pandas, NumPy
- **Development, Cloud & Tools:** Git, GitHub, Docker, AWS, OpenRouter API, Claude Code, Power BI, Power Query, DAX

---

## Certifications

1. **01 (2022) — Udemy:** Mastering Data Structures & Algorithms in C/C++ (*C++, Algorithms, Competitive Programming*)
2. **02 (2023) — HackerRank:** Structured Query Language (SQL) (*MySQL, PostgreSQL, Query Optimization*)
3. **03 (2024) — Amazon:** AWS Cloud Practitioner (*EC2, S3, Cloud Security*)
4. **04 (2025) — IBM SkillsBuild:** Data Fundamentals (*Data Analysis, IBM Watson, Visualization*)
5. **05 (2025) — NPTEL (IIT Kanpur):** Cloud Computing & Distributed Systems (*AWS, Distributed Systems, Scalability*)
6. **06 (2025) — IIT Kanpur:** Advanced Algorithmic Trading & Portfolio Management (*Quantitative Finance, Python, Risk Management*)
7. **07 (2025) — Databricks:** Academy Accreditation - Generative AI Fundamentals (*Artificial Intelligence, Generative AI, LLMs*) — [Credential](https://credentials.databricks.com/2ea568a7-29c1-4a96-8929-6155b860268f#acc.6yjnYCUb)
8. **08 (2026) — HP LIFE:** AI for Business Professionals (*AI Strategy, Business Automation, Digital Transformation*) — [Credential](https://www.life-global.org/certificate/a0256290-3b3a-4665-b37b-24b0979dc609)
9. **09 (2026) — IBM:** Python for Data Science (*Data Analysis, Data Modeling, Python*) — [Credential](https://www.credly.com/badges/8fe5f87b-83d9-4106-8b1b-c876b91b6517/public_url)

---

## Achievements & Recognition

- **Best Paper Award:** "Smart Blind Belt" at BIT V-Prayukti
- **LeetCode Rating:** 1500+ Rating | 300+ Problems Solved
- **CodeChef:** 180+ Problems Solved
- **PSG iTech Hack Fest:** National Level Hackathon Participant

---

## Contact

- **Email:** kawinprabha08@gmail.com
- **Phone:** +91 99949 68155
- **GitHub:** https://github.com/Kawinkawin
- **LinkedIn:** https://www.linkedin.com/in/kawin-prahakaran/
`;

const MARKDOWN_ABOUT = `---
title: About Kawin Prabhakaran (Kawin P) | AI & Data Science Engineer
canonical: ${BASE_URL}/about
---

# Kawin Prabhakaran (Kawin P)

I am **Kawin Prabhakaran** (**Kawin P**), an **AI/ML Engineer, Generative AI Developer & LLM Application Developer** currently working at Teceze Ltd. I hold a completed B.Tech in Artificial Intelligence and Data Science from Sri Eshwar College of Engineering, Coimbatore (2022–2026).

## Who I Am & What I Do

I design and build intelligent, data-driven applications that combine Machine Learning, Deep Learning, Natural Language Processing (NLP), and modern Full-Stack Web Development. Previously, I gained hands-on industry experience as a Data Science Intern at V3 Analytics and a Django Framework Intern at RV Tech Learn.

## Areas of Expertise & Technologies

- **AI & Machine Learning:** Machine Learning, Deep Learning, NLP, Computer Vision, Generative AI, LLMs, RAG pipelines, PyTorch, BERT, T5, LSTM, Vision Transformers (ViT)
- **Web & Backend:** React.js, TypeScript, Python, Flask, Django, ExpressJS, Flutter, Streamlit
- **Data & Cloud:** MongoDB, MySQL, Docker, AWS Cloud, Google Cloud, Power BI, Tableau, n8n

## Featured Projects

- [Market Mind AI](${BASE_URL}/projects/market-mind-ai) — Multimodal stock market assistant with LLM-driven RAG pipelines and CNN diagnostics.
- [Arogyam.ai](${BASE_URL}/projects/arogyam-ai) — Personalized healthcare AI advisor with multilingual chat and ML consultation support.
- [Surveillance System using Vision Transformers](${BASE_URL}/projects/surveillance-vit) — Real-time object detection and activity monitoring using ViT.
- [AI Speech Therapy Game](${BASE_URL}/projects/ai-speech-therapy-game) — Gamified speech therapy with real-time AI feedback.

## Where to Find My Work & Contact

- **Email:** kawinprabha08@gmail.com
- **GitHub:** https://github.com/Kawinkawin
- **LinkedIn:** https://www.linkedin.com/in/kawin-prahakaran/
- [Back to Portfolio](${BASE_URL}/)
`;

const PROJECT_MARKDOWN: Record<string, string> = {
  'enterprise-rag-assistant': `# Enterprise RAG Assistant

**Category:** RAG Systems | **Author:** [Kawin Prabhakaran (Kawin P)](${BASE_URL}/about)

Enterprise Knowledge Assistant using Retrieval-Augmented Generation for site engineers querying SOPs and technical manuals.

**Technologies:** Python, RAG, LLMs, Embeddings, Vector Search, Prompt Engineering

## Problem Statement
Site engineers need fast, accurate access to Standard Operating Procedures (SOPs) and technical manuals. Manually searching through large operational documents is time-consuming and error-prone.

## Solution
Developed a RAG-based application that enables site engineers to ask natural-language questions and receive contextually grounded answers backed by relevant technical documentation.

## Architecture Flow
Technical Documentation & SOPs -> Document Processing & Text Chunking -> Embedding Generation & Vector Search -> User Query -> Similarity Retrieval -> Context Construction & Prompt Engineering -> LLM Generation & Response Validation -> Grounded Answer / Out-of-Scope Fallback

## Technical Implementation
- Document ingestion pipeline with text chunking and embedding generation for semantic retrieval.
- Context construction and prompt engineering to ground LLM responses strictly in retrieved documentation.
- Response validation, out-of-scope query detection, and fallback mechanisms to reduce unsupported answers.

## Challenges & Limitations
- **Challenges:** Balancing chunk size and retrieval overlap so technical procedures retain their step-by-step context without exceeding prompt context limits.
- **Limitations:** Internal enterprise deployment; public repository and live demo are not available.

## Future Improvements
Automated retrieval evaluation benchmarks, hybrid keyword + vector search, and citation highlighting.
`,
  'mcp-plane-integration': `# MCP-Based Plane Integration

**Category:** MCP Integration (Experimental) | **Author:** [Kawin Prabhakaran (Kawin P)](${BASE_URL}/about)

Experimental AI-powered project management integration using the Model Context Protocol (MCP) and Python MCP SDK.

**Technologies:** Python, Model Context Protocol, Python MCP SDK, Asyncio, REST APIs

## Problem Statement
Interacting with self-hosted project management environments (Plane) across multiple endpoints requires manual navigation or custom one-off scripts.

## Solution
Experimented with building an MCP harness in Python that exposes Plane REST API operations as structured MCP tools for AI applications.

## Architecture Flow
User -> AI Application / MCP Client -> MCP Server (Python MCP SDK) -> Registered Tools & Asyncio Handlers -> Plane REST API -> Self-Hosted Plane Instance -> Structured Tool Response -> AI Application

## Technical Implementation
- Built an experimental MCP server using the Python MCP SDK and asynchronous Python (Asyncio).
- Registered structured tools wrapping Plane REST API endpoints with error handling for API failures.
- Tested MCP client-server tool invocation for AI-assisted project management workflows.

## Challenges & Limitations
- **Challenges:** Designing clean tool schemas and handling asynchronous REST API errors gracefully within MCP tool responses.
- **Limitations:** Experimental implementation only — not claimed as production-ready or a fully autonomous agent.

## Future Improvements
Expanded tool coverage, stricter input/output validation, and automated integration tests.
`,
  'lms-automation-portal': `# LMS Automation & Assessment Portal

**Category:** Backend Development | **Author:** [Kawin Prabhakaran (Kawin P)](${BASE_URL}/about)

Internal workflow automation platform for candidate registration, LMS user creation, assessment assignment, and result retrieval.

**Technologies:** Python, REST APIs, SQL, Workflow Automation, Backend

## Problem Statement
Manual candidate registration, LMS account creation, assessment allocation, and result tracking involve repetitive administrative steps.

## Solution
Developed an internal portal that collects candidate information and automates registration, assessment assignment, and result retrieval via LMS REST APIs.

## Architecture Flow
Candidate Form Collection -> Python Backend Validation & Database Storage -> LMS REST API Integration (User Creation) -> Automated Assessment Assignment -> Result Retrieval & Evaluation Display

## Technical Implementation
- Candidate form collection and profile management backed by relational database storage.
- Automated LMS user creation and assessment allocation through REST API integration.
- Result retrieval and structured evaluation display for internal reviewers.

## Challenges & Limitations
- **Challenges:** Synchronizing local candidate records with external LMS API state and handling partial failures during multi-step registration.
- **Limitations:** Internal organizational tool; source code and live URL are private.

## Future Improvements
Retry queues for failed API calls and role-based audit logging.
`,
  'arogyam-ai': `# Arogyam.ai

**Category:** Generative AI | **Author:** [Kawin Prabhakaran (Kawin P)](${BASE_URL}/about)

AI-enabled doctor–patient consultation platform built with Python, Flask, MySQL, Hugging Face Transformers, and RBAC.

**Technologies:** Python, Flask, MySQL, Hugging Face Transformers, Google Cloud Translation, Docker, RBAC
**GitHub:** https://github.com/Kawinkawin/Arogyam.ai

## Problem Statement
Patients and doctors need structured consultation workflows, multilingual communication, and context-aware assistance without losing human clinical oversight.

## Solution
Built a Flask and MySQL healthcare application with Role-Based Access Control (RBAC), appointment scheduling, multilingual translation, and specialty-aware AI assistance.

## Architecture Flow
Doctor / Patient Registration (RBAC) -> Consultation & Patient History Context -> Hugging Face Transformers AI Assistance -> Google Cloud Translation API (Multilingual) -> Pharmacy & Follow-Up Reminder Workflows

## Technical Implementation
- Implemented doctor and patient registration with Role-Based Access Control (RBAC).
- Integrated Hugging Face Transformers for specialty-aware AI assistance alongside patient history context.
- Added Google Cloud Translation API for multilingual support, appointment scheduling, and Docker containerization.

## Challenges & Limitations
- **Challenges:** Ensuring AI-generated healthcare information remains strictly assistive with clear human-in-the-loop doctor oversight.
- **Limitations:** AI outputs are informational only and require clinical verification; full HIPAA-grade encryption and audit trails are future improvements.

## Future Improvements
End-to-end field-level encryption, comprehensive audit logging, and clinician feedback loops.
`,
  'market-mind-ai': `# Market Mind AI

**Category:** Machine Learning | **Author:** [Kawin Prabhakaran (Kawin P)](${BASE_URL}/about)

Intelligent stock market assistant combining LLM-driven RAG pipelines, LSTM forecasting, and CNN-based diagnostic analysis.

**Technologies:** React.js, MongoDB, NLP, LSTM, Machine Learning
**GitHub:** https://github.com/Kawinkawin/Market-Mind.AI
`,
  'ai-speech-therapy-game': `# AI Speech Therapy Game

**Category:** Machine Learning | **Author:** [Kawin Prabhakaran (Kawin P)](${BASE_URL}/about)

Interactive AI-powered speech therapy game with personalized exercises, real-time feedback, and gamified progress tracking.

**Technologies:** AI/ML, Speech Recognition, Unity, Node.js, MongoDB
**GitHub:** https://github.com/Kawinkawin/AI-Speech-Therapy-Game
`,
  'surveillance-vit': `# Surveillance System using Vision Transformers

**Category:** Computer Vision | **Author:** [Kawin Prabhakaran (Kawin P)](${BASE_URL}/about)

Real-time object detection and activity monitoring in video streams using Vision Transformers (ViT) and PyTorch.

**Technologies:** Python, PyTorch, ViT, OpenCV, Computer Vision
**GitHub:** https://github.com/Kawinkawin/Surveillance-Using-Vision-Transformers
`,
  'dream-pdf': `# Dream-PDF

**Category:** Generative AI | **Author:** [Kawin Prabhakaran (Kawin P)](${BASE_URL}/about)

AI-driven PDF application using BERT for sentiment analysis and RVC model for voice generation across Flutter and React.

**Technologies:** ReactJS, ExpressJS, Python, Flask, Flutter
`,
  'text-summarizer': `# Text-Summarizer

**Category:** Generative AI | **Author:** [Kawin Prabhakaran (Kawin P)](${BASE_URL}/about)

Web-based text summarization application powered by the T5 Transformer model with a Flask backend and Streamlit frontend.

**Technologies:** Python 3.x, Flask, T5, PyTorch, Streamlit
`,
};

function prefersMarkdown(acceptHeader: string): boolean {
  const lower = acceptHeader.toLowerCase();
  if (!lower.includes('text/markdown')) {
    return false;
  }
  // If client explicitly requests text/html with higher or equal priority before text/markdown, serve HTML
  if (lower.includes('text/html') && lower.indexOf('text/html') < lower.indexOf('text/markdown')) {
    return false;
  }
  return true;
}

function markdownResponse(body: string, canonicalUrl: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      Link: `<${canonicalUrl}>; rel="alternate"; type="text/html"`,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function onRequest(context: PagesContext): Promise<Response> {
  const { request } = context;
  const accept = request.headers.get('accept') || '';

  if (!prefersMarkdown(accept)) {
    return context.next();
  }

  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '') || '/';

  // Do not intercept static asset requests
  if (/\.[a-z0-9]+$/i.test(path) && path !== '/index.html') {
    return context.next();
  }

  if (path === '/' || path === '/index.html') {
    return markdownResponse(MARKDOWN_HOME, `${BASE_URL}/`);
  }

  if (path === '/about') {
    return markdownResponse(MARKDOWN_ABOUT, `${BASE_URL}/about`);
  }

  if (path.startsWith('/projects/')) {
    const id = path.slice('/projects/'.length);
    const md = PROJECT_MARKDOWN[id];
    if (md) {
      return markdownResponse(md, `${BASE_URL}/projects/${id}`);
    }
    return markdownResponse('# 404 — Project Not Found\n', `${BASE_URL}${path}`, 404);
  }

  return markdownResponse(MARKDOWN_HOME, `${BASE_URL}/`);
}
