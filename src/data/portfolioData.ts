import { Project, SkillCategory, WorkExperience, Certification, DSATopic, BlogPost } from '../types';

export const personalInfo = {
  name: 'Jaya Singh',
  fullName: 'Gautam Jayasingh Ramdevsingh',
  title: 'AI/ML Developer | Full-Stack Developer | Software Engineer',
  tagline: 'Turning Ideas into Intelligent Solutions.',
  heroHeadline: 'Building Intelligent Solutions. Engineering Real-World Impact.',
  heroSubheadline:
    "I'm a Computer Science student passionate about Artificial Intelligence, Machine Learning, and Full-Stack Development. I enjoy transforming ideas into practical applications, exploring emerging technologies, and building solutions that address real-world problems.",
  aboutText:
    "I'm a B.Tech Computer Science and Information Technology student who enjoys exploring the intersection of technology, intelligence, and innovation. My interests span AI/ML, Generative AI, backend development, and full-stack engineering. Through academic learning, internships, technical challenges, and independent projects, I've been exploring how technology can solve practical problems. From developing an AI-powered conversational companion to architecting a B2B industrial scrap marketplace and Indian standards research intelligence, I enjoy understanding the core engineering behind a product and building solutions around it.",
  education: {
    university: 'Ajeenkya DY Patil University',
    degree: 'B.Tech in Computer Science & Information Technology',
    years: '2024 — 2028',
    school: 'Vanita Vishram, Athwagate, Surat',
    schoolDegree: 'Class XII (HSC Science)',
    schoolYear: '2024',
    schoolScore: '55.2%',
  },
  location: 'Surat, Gujarat, India',
  email: 'jayasingh01134@gmail.com',
  github: 'https://github.com/Jayasingh0404',
  linkedin: 'https://www.linkedin.com/in/jaya-singh-rajput-921024338/',
  leetcode: 'https://leetcode.com/u/Jayasingh0404/',
  resumeUrl: '/Jaya_Singh_Resume.pdf',
  photoUrl: '/jaya-photo.jpg',
  brandTagline: 'Think. Build. Innovate.',
  status: 'Open to AI/ML & Software Engineering Internships',
};

export const initialProjects: Project[] = [
  {
    id: 'scraptrade-hub',
    title: 'ScrapTrade Hub',
    slug: 'scraptrade-hub',
    tagline: 'Production-ready B2B circular economy scrap marketplace with dual trading mechanisms.',
    category: 'Full-Stack Development',
    subCategory: 'B2B Marketplace | Circular Economy',
    featured: true,
    coverImage: '',
    images: [],
    overview:
      'ScrapTrade Hub is a production-grade B2B industrial scrap marketplace designed to connect industrial waste-producing enterprises with certified recyclers and commercial buyers. The platform streamlines the entire industrial scrap procurement lifecycle: seller lot catalogues, reverse procurement bidding, automated bid matrices, held escrow payments, and weighbridge discrepancy arbitration.',
    problemStatement:
      'Industrial scrap trading is historically fragmented, untrusted, and unorganized. Industrial companies face opaque spot pricing, rogue brokers, high transaction defaults, manual paper negotiations, and zero visibility into logistics weighbridge discrepancies between source dispatched weight and destination received weight.',
    solution:
      'A full-lifecycle digital platform engineered with dual trading mechanisms (forward catalogues and reverse procurement bidding), Google OAuth 2.0 verification, held escrow-style payments, automated bid ranking, and a dynamic 0–100 reliability score to enforce transparency and trust.',
    myContribution: [
      'Architected end-to-end backend services using Python, Flask, and SQLite with Gunicorn WSGI containerization.',
      'Designed dual trading workflows: Forward Marketplace (Seller to Buyer) and Reverse Procurement Bidding.',
      'Implemented automated bid comparison matrix calculating unit price, logistics offset, and seller reliability score.',
      'Authored fulfillment verification pipeline with weighbridge tolerance algorithm rejecting discrepancies > 5%.',
      'Containerized with Docker and authored 16 Pytest integration test suites achieving 100% test pass rate.',
    ],
    keyFeatures: [
      'Dual Trading Modes: Forward scrap lot catalogue & reverse procurement bidding request boards.',
      'Automated Bid Matrix: Compares bids by net unit cost, distance logistics, and vendor reliability.',
      'Weighbridge Tolerance Engine: Algorithmic tolerance threshold (< 5%) preventing shipment volume disputes.',
      'Dynamic Reliability Score: 0–100 reputation score updated based on transaction fulfillment history.',
      'Escrow-Style Settlement: Holds transaction tokens safely until material physical sign-off.',
      'Secure Auth & RBAC: Google OAuth 2.0 integration with role-based access for sellers, recyclers, and admins.',
    ],
    technologies: ['Python', 'Flask', 'SQLite', 'Docker', 'Google OAuth 2.0', 'Gunicorn', 'Render', 'Pytest', 'REST APIs'],
    architecture: {
      summary: 'Industrial Seller / Recycler Browser Client → Gunicorn WSGI Server → Flask Application Core → SQLite Relational DB → Escrow & Weighbridge Verification Engine.',
      nodes: [
        {
          id: 'client',
          title: 'Frontend Client',
          subtitle: 'Responsive Web UI',
          iconName: 'Layout',
          description: 'Seller catalog, real-time bid matrix, reverse procurement dashboard, and dispute tracking.',
        },
        {
          id: 'auth',
          title: 'Google OAuth 2.0',
          subtitle: 'Identity & RBAC',
          iconName: 'ShieldCheck',
          description: 'Validates corporate accounts, enforces buyer/seller roles, and prevents multi-accounting.',
        },
        {
          id: 'backend',
          title: 'Flask App Core',
          subtitle: 'Python / Gunicorn',
          iconName: 'Server',
          description: 'Handles trading state machines, bid ranking calculations, and transaction lifecycle logic.',
        },
        {
          id: 'db',
          title: 'SQLite Database',
          subtitle: 'Relational Storage',
          iconName: 'Database',
          description: 'Normalized schema managing users, listings, bids, escrow states, and audit trails.',
        },
        {
          id: 'weighbridge',
          title: 'Tolerance Engine',
          subtitle: 'Discrepancy Check',
          iconName: 'Scale',
          description: 'Computes dispatch vs receiver weight variance, automatically triggering dispute if > 5%.',
        },
      ],
      codeSnippet: {
        language: 'python',
        filename: 'fulfillment/weighbridge.py',
        code: `def verify_weighbridge_tolerance(dispatched_kg: float, received_kg: float, max_tolerance_pct: float = 5.0) -> dict:
    """Verifies that received material weight is within permissible tolerance threshold."""
    if dispatched_kg <= 0:
        raise ValueError("Dispatched weight must be strictly positive")
    
    variance_kg = abs(dispatched_kg - received_kg)
    discrepancy_pct = (variance_kg / dispatched_kg) * 100.0
    
    is_acceptable = discrepancy_pct <= max_tolerance_pct
    return {
        "dispatched_kg": dispatched_kg,
        "received_kg": received_kg,
        "variance_kg": round(variance_kg, 2),
        "discrepancy_pct": round(discrepancy_pct, 2),
        "status": "APPROVED" if is_acceptable else "FLAGGED_FOR_ARBITRATION"
    }`,
      },
    },
    workflowSteps: [
      { step: 1, title: 'Lot Listing / Reverse RFQ', description: 'Seller uploads certified scrap lot with lab analysis, or recycler posts reverse procurement request.' },
      { step: 2, title: 'Bidding & Comparison', description: 'Counter-parties submit binding bids; engine ranks options using price, distance, and reliability score.' },
      { step: 3, title: 'Held Escrow Deposit', description: 'Buyer deposits transaction funds held safely in escrow before logistics dispatch authorization.' },
      { step: 4, title: 'Weighbridge Check & Payout', description: 'On arrival, weight is verified against the <5% tolerance formula; funds release to seller automatically.' },
    ],
    challengesAndLearnings: [
      {
        challenge: 'Preventing transaction fraud and material weight disputes between remote industrial facilities.',
        solution: 'Engineered an algorithmic weighbridge verification threshold (<5%) coupled with pre-funded escrow locks.',
      },
      {
        challenge: 'Maintaining deterministic test suites across complex multi-step bid states.',
        solution: 'Created 16 independent Pytest integration suites mocking auth and transaction transitions to ensure 100% pass rates.',
      },
    ],
    verifiedOutcomes: [
      '16 Pytest integration suites covering 100% critical transaction paths.',
      'Under 5% strict weighbridge tolerance enforcement threshold.',
      'End-to-end containerized Docker build deployed smoothly on Render cloud.',
    ],
    githubUrl: 'https://github.com/Jayasingh0404/scraptrade-app',
    liveDemoUrl: 'https://scraptrade-app.onrender.com',
    isPublished: true,
    createdAt: '2026-02-15',
    updatedAt: '2026-03-01',
  },
  {
    id: 'ai-companion',
    title: 'AI Companion',
    slug: 'ai-companion',
    tagline: 'Context-aware, emotion-sensitive conversational assistant leveraging NLP and TF-IDF RAG.',
    category: 'Artificial Intelligence',
    subCategory: 'Generative AI | NLP | RAG',
    featured: true,
    coverImage: '',
    images: [],
    overview:
      'AI Companion is an AI-powered conversational application designed to provide context-aware, empathetic, and personalized interactions. By combining multi-model sentiment analysis with a TF-IDF Retrieval-Augmented Generation (RAG) pipeline and OpenAI LLMs, the system detects user emotional nuances and retrieves relevant knowledge before generating empathetic replies.',
    problemStatement:
      'Standard conversational AI bots frequently deliver emotionally flat, robotic, and context-blind responses that fail to recognize when a user is frustrated, stressed, anxious, or joyful, resulting in disjointed and impersonal conversations.',
    solution:
      'Constructed a hybrid emotion detection engine (synthesizing VADER, TextBlob, AFINN, and GoEmotions) linked to a lightweight TF-IDF knowledge retrieval layer. The system detects user mood, fetches contextual guidance, and prompts the LLM with sentiment priors and fallback safeguards.',
    myContribution: [
      'Built high-performance asynchronous API endpoints using Python and FastAPI.',
      'Implemented sentiment analysis and emotion classification using VADER, TextBlob, AFINN, and GoEmotions models.',
      'Engineered an in-memory TF-IDF vector similarity RAG pipeline for domain knowledge extraction.',
      'Integrated Firebase for user session state, authentication, and conversation history persistence.',
      'Implemented defensive fallback logic ensuring safe, uplifting responses if external LLM APIs timeout.',
    ],
    keyFeatures: [
      'Multi-Model Emotion Detection: Ensemble analysis across VADER, TextBlob, AFINN, and GoEmotions.',
      'TF-IDF Knowledge Retrieval: Fast, deterministic RAG indexing conversational memory and helpful tips.',
      'Dynamic Prompt Conditioning: Injects detected emotion scores and retrieved snippets into LLM prompt templates.',
      'Reliable Fallbacks: Resilient recovery mechanisms ensuring continuity during network interruptions.',
      'Firebase Authentication: Secure user session management and encrypted conversational history.',
    ],
    technologies: ['Python', 'FastAPI', 'OpenAI LLMs', 'NLP', 'RAG', 'TF-IDF', 'Firebase', 'VADER', 'TextBlob', 'AFINN'],
    architecture: {
      summary: 'User Client → FastAPI Service → Multi-Model Sentiment / Emotion Analyzer → TF-IDF Context Retrieval (RAG) → Prompt Synthesizer → OpenAI LLM → Fallback Guard → Streamed Response.',
      nodes: [
        { id: 'user', title: 'User Input', subtitle: 'Web Chat Interface', iconName: 'MessageSquare', description: 'User submits conversational queries and expressive statements.' },
        { id: 'api', title: 'FastAPI Gateway', subtitle: 'Async Python Backend', iconName: 'Cpu', description: 'Validates input schema, manages auth token, and routes to analysis pipeline.' },
        { id: 'sentiment', title: 'Emotion Analyzer', subtitle: 'VADER + GoEmotions', iconName: 'Activity', description: 'Scores polarity, subjectivity, and granular emotions (e.g., joy, distress, gratitude).' },
        { id: 'rag', title: 'TF-IDF RAG Layer', subtitle: 'Knowledge Base', iconName: 'BookOpen', description: 'Vectorizes query and computes cosine similarity against knowledge articles.' },
        { id: 'llm', title: 'OpenAI LLM', subtitle: 'Contextual Generation', iconName: 'Sparkles', description: 'Generates empathetic, contextually enriched response guided by emotion priors.' },
        { id: 'fallback', title: 'Safety Guard', subtitle: 'Reliable Fallbacks', iconName: 'Shield', description: 'Catches timeouts or API faults to deliver warm, pre-validated fallback messages.' },
      ],
      codeSnippet: {
        language: 'python',
        filename: 'services/sentiment_engine.py',
        code: `from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from textblob import TextBlob

class EmotionAnalyzer:
    def __init__(self):
        self.vader = SentimentIntensityAnalyzer()
        
    def analyze(self, text: str) -> dict:
        vader_scores = self.vader.polarity_scores(text)
        blob = TextBlob(text)
        
        compound = vader_scores['compound']
        dominant_mood = "positive" if compound >= 0.05 else ("negative" if compound <= -0.05 else "neutral")
        
        return {
            "polarity": round(blob.sentiment.polarity, 3),
            "subjectivity": round(blob.sentiment.subjectivity, 3),
            "compound": compound,
            "dominant_mood": dominant_mood
        }`,
      },
    },
    workflowSteps: [
      { step: 1, title: 'Query & Tokenization', description: 'FastAPI receives user chat message and verifies Firebase session identity.' },
      { step: 2, title: 'Emotion & Sentiment Scoring', description: 'VADER and TextBlob extract sentiment polarity, compound valence, and emotional tone.' },
      { step: 3, title: 'TF-IDF Knowledge Search', description: 'Relevant guidance and conversational facts are extracted from the local knowledge base.' },
      { step: 4, title: 'Contextual Generation', description: 'LLM generates empathetic response tailored to emotional state with deterministic fallback guard.' },
    ],
    challengesAndLearnings: [
      {
        challenge: 'Avoiding heavy GPU overhead while maintaining fast real-time emotion detection.',
        solution: 'Combined lightweight lexical analyzers (VADER, TextBlob, AFINN) with TF-IDF indexing, achieving sub-40ms CPU inference.',
      },
      {
        challenge: 'Ensuring safe, non-clinical boundary communication.',
        solution: 'Explicitly tuned system prompts and fallback safety rules to position the assistant purely as an empathetic conversational companion.',
      },
    ],
    verifiedOutcomes: [
      'Sub-50ms CPU emotion analysis pipeline latency.',
      'Robust TF-IDF vector similarity search without requiring cloud vector databases.',
      'Graceful fallback system ensuring 100% uptime perception during third-party LLM rate limits.',
    ],
    githubUrl: 'https://github.com/Jayasingh0404/AI-companion',
    liveDemoUrl: '',
    isPublished: true,
    createdAt: '2026-01-10',
    updatedAt: '2026-02-20',
  },
  {
    id: 'bharatstandards-ai',
    title: 'BharatStandards-AI',
    slug: 'bharatstandards-ai',
    tagline: 'AI-powered compliance research assistant for Indian Standards (BIS) and regulatory documentation.',
    category: 'Artificial Intelligence',
    subCategory: 'RAG | Document Intelligence | Compliance Tech',
    featured: true,
    coverImage: '',
    images: [],
    overview:
      'BharatStandards-AI is an intelligent compliance research assistant designed to make Indian Standards (Bureau of Indian Standards — BIS) and certification specifications easily searchable, understandable, and actionable. It uses modern document processing and Retrieval-Augmented Generation (RAG) to provide fast, structured answers to complex technical compliance queries.',
    problemStatement:
      'Indian manufacturing, engineering, and tech enterprises struggle to navigate thousands of lengthy, densely written Indian Standards and BIS specifications. Manual document review is time-consuming, error-prone, and often delays regulatory compliance and product launches.',
    solution:
      'Developed a modern full-stack application with a React.js frontend, FastAPI backend, and an intelligent document processing pipeline. The system parses standards documents, chunks text, retrieves exact normative references, and answers compliance questions with verifiable source references.',
    myContribution: [
      'Built modern, responsive user interface using React.js, Vite, and Tailwind CSS.',
      'Developed FastAPI REST backend to orchestrate document chunking, embeddings, and query handling.',
      'Implemented Retrieval-Augmented Generation (RAG) pipeline for standards-focused document search.',
      'Configured Docker containerization and automated CI/CD deployment via GitHub Actions.',
      'Maintained independent technical positioning, clearly documenting non-affiliation with government bodies.',
    ],
    keyFeatures: [
      'Intelligent Standards Search: Search across complex standards by keyword, material, or certification code.',
      'Context-Grounded Q&A: RAG pipeline references specific sections of standard documents.',
      'Structured Compliance Extraction: Formats answers into test criteria, sample limits, and mandatory marks.',
      'Clean Modern UI: High-contrast, accessibility-focused interface optimized for technical reading.',
      'CI/CD & Containerization: Dockerized microservices deployed seamlessly via GitHub Actions.',
    ],
    technologies: ['React.js', 'Vite', 'Tailwind CSS', 'Python', 'FastAPI', 'RAG', 'REST APIs', 'Docker', 'GitHub Actions', 'Git'],
    architecture: {
      summary: 'React Frontend Client → FastAPI Gateway → Standards Document Ingestion & Chunking → Semantic Knowledge Index → LLM Reasoning Engine → Structured Compliance Answer.',
      nodes: [
        { id: 'frontend', title: 'React.js Client', subtitle: 'Vite & Tailwind CSS', iconName: 'Globe', description: 'Query submission, interactive standards viewer, and clause inspection interface.' },
        { id: 'fastapi', title: 'FastAPI Backend', subtitle: 'Python REST API', iconName: 'Terminal', description: 'Handles query processing, rate limiting, and document retrieval endpoints.' },
        { id: 'parser', title: 'Document Pipeline', subtitle: 'PDF / Text Processing', iconName: 'FileText', description: 'Parses complex multi-page standards, extracting clauses, tables, and annexures.' },
        { id: 'retrieval', title: 'RAG Retriever', subtitle: 'Semantic Search', iconName: 'Search', description: 'Fetches exact matching clauses and normative references relevant to user question.' },
        { id: 'generator', title: 'LLM Reasoning', subtitle: 'Contextual Synthesis', iconName: 'Cpu', description: 'Synthesizes plain-English compliance summaries backed by cited standards sections.' },
      ],
      codeSnippet: {
        language: 'python',
        filename: 'rag/compliance_retriever.py',
        code: `from typing import List, Dict

def retrieve_standards_clauses(query: str, document_chunks: List[Dict], top_k: int = 3) -> List[Dict]:
    """Retrieves most relevant standards clauses and citation metadata."""
    # Semantic score computation based on term frequency and clause hierarchy
    scored_chunks = []
    for chunk in document_chunks:
        score = compute_relevance(query, chunk["text"])
        scored_chunks.append({**chunk, "score": score})
        
    scored_chunks.sort(key=lambda x: x["score"], reverse=True)
    return scored_chunks[:top_k]`,
      },
    },
    workflowSteps: [
      { step: 1, title: 'Document Ingestion', description: 'Raw standards documents are split into logical clauses, tables, and numbered provisions.' },
      { step: 2, title: 'Query Parsing', description: 'User enters standard number (e.g., IS 10500) or engineering question (e.g., permissible lead limits).' },
      { step: 3, title: 'Relevant Clause Match', description: 'RAG pipeline locates corresponding normative provisions and technical parameters.' },
      { step: 4, title: 'Synthesized Response', description: 'Returns structured explanation with exact clause citations and test requirements.' },
    ],
    challengesAndLearnings: [
      {
        challenge: 'Preserving table formatting and strict numeric limits when chunking standards documents.',
        solution: 'Implemented clause-aware chunking preserving parent section numbers and parameter tables.',
      },
      {
        challenge: 'Preventing LLM hallucinations on critical legal/engineering tolerance limits.',
        solution: 'Constrained the generation prompt to strictly quote retrieved standards text with disclaimer notes.',
      },
    ],
    verifiedOutcomes: [
      'Streamlined multi-clause lookup from minutes of manual reading to seconds.',
      'Containerized with Docker and tested via automated GitHub Actions CI workflows.',
      'Clean architectural separation between document ingestion, retrieval, and UI presentation.',
    ],
    githubUrl: 'https://github.com/Jayasingh0404/BharatStandards-AI',
    liveDemoUrl: '',
    isPublished: true,
    createdAt: '2026-02-01',
    updatedAt: '2026-03-05',
  },
  {
    id: 'income-prediction-system',
    title: 'Adult Census Income Predictor',
    slug: 'income-prediction-system',
    tagline: 'End-to-end Machine Learning pipeline and Streamlit web app predicting income levels (> $50K).',
    category: 'Machine Learning',
    subCategory: 'Supervised Learning | Predictive Analytics',
    featured: false,
    coverImage: '',
    images: [],
    overview:
      'Adult Census Income Predictor is a complete Machine Learning application and interactive Streamlit web interface designed to predict whether an individual earns more than $50,000 annually based on demographic, educational, capital, and employment characteristics from the classic Adult Census (UCI Machine Learning Repository) dataset.',
    problemStatement:
      'Analyzing socioeconomic and demographic factors that drive personal income levels requires rigorous data preprocessing, handling class imbalance, encoding categorical features, and selecting models that deliver calibrated probability predictions.',
    solution:
      'Built a complete data science workflow comprising exploratory data analysis, missing value imputation, one-hot encoding, feature scaling, model benchmarking across multiple algorithms, and real-time prediction deployment via Streamlit.',
    myContribution: [
      'Performed exploratory data analysis and feature engineering on demographic Census attributes.',
      'Built and evaluated multiple classification models: Logistic Regression, Ridge Classifier, and Gaussian Naive Bayes.',
      'Achieved 85.15% test accuracy with Logistic Regression, chosen as primary production model.',
      'Developed interactive Streamlit web app with dynamic sliders, categorical selectors, and probability outputs.',
    ],
    keyFeatures: [
      'Comprehensive EDA: Feature correlation matrices, age vs income distributions, and education-level breakdowns.',
      'Rigorous Benchmarking: Evaluated Logistic Regression (85.15%), Ridge (77.56%), and Gaussian NB (51.48%).',
      'Production ML Pipeline: Scaler and encoder artifacts packaged with joblib for instant inference.',
      'Interactive Streamlit UI: User can alter demographic features to observe real-time probability shifts.',
    ],
    technologies: ['Python', 'Scikit-learn', 'Streamlit', 'Pandas', 'NumPy', 'Jupyter Notebook', 'Joblib'],
    architecture: {
      summary: 'UCI Adult Census Data → Preprocessing & Feature Encoding → Model Training & Validation → Serialized Pipeline Artifacts → Streamlit Interactive Inference UI.',
      nodes: [
        { id: 'dataset', title: 'Census Dataset', subtitle: 'UCI ML Repository', iconName: 'Database', description: 'Demographic features: age, workclass, education, marital-status, occupation, capital gain/loss.' },
        { id: 'preprocess', title: 'Data Cleaning', subtitle: 'Imputation & One-Hot', iconName: 'Sliders', description: 'Removes anomalies, encodes categorical features, and normalizes numeric ranges.' },
        { id: 'training', title: 'Model Selection', subtitle: 'Logistic Regression', iconName: 'Cpu', description: 'Trained and validated on held-out test split, reaching 85.15% accuracy.' },
        { id: 'ui', title: 'Streamlit App', subtitle: 'Real-time Inference', iconName: 'Layout', description: 'Interactive frontend allowing users to input candidate attributes and get instant classifications.' },
      ],
      codeSnippet: {
        language: 'python',
        filename: 'model/pipeline.py',
        code: `from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

# Primary Production Model Configuration (85.15% Test Accuracy)
model_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression(max_iter=1000, random_state=42))
])`,
      },
    },
    workflowSteps: [
      { step: 1, title: 'Data Preprocessing', description: 'Clean missing records, handle whitespace in categorical values, and encode variables.' },
      { step: 2, title: 'Model Benchmarking', description: 'Train Logistic Regression, Ridge Classifier, and Naive Bayes on identical train/test splits.' },
      { step: 3, title: 'Evaluation & Export', description: 'Verify accuracy metrics and serialize top model (85.15% Logistic Regression).' },
      { step: 4, title: 'Interactive Deployment', description: 'Streamlit web interface allows users to test hypothetical profiles and view predictions.' },
    ],
    challengesAndLearnings: [
      {
        challenge: 'Handling significant class imbalance in census earnings (>50K vs <=50K).',
        solution: 'Used balanced evaluation metrics and calibrated probability thresholds to ensure reliable prediction.',
      },
      {
        challenge: 'Streamlining inference inputs across numerous one-hot encoded variables.',
        solution: 'Encapsulated preprocessing transformers and model weights into unified Scikit-learn Pipeline objects.',
      },
    ],
    verifiedOutcomes: [
      '85.15% test accuracy achieved on Logistic Regression model.',
      'Interactive Streamlit UI deployed with instant parameter recalculation.',
      'Transparent documentation detailing performance trade-offs across all 3 evaluated models.',
    ],
    githubUrl: 'https://github.com/Jayasingh0404/income-prediction-system',
    liveDemoUrl: '',
    isPublished: true,
    createdAt: '2025-11-20',
    updatedAt: '2026-01-15',
  },
  {
    id: 'brokering-project',
    title: 'Waste Brokering Marketplace',
    slug: 'brokering-project',
    tagline: 'Modern waste brokering platform built with NestJS 11, Next.js 16, Prisma ORM, and PostgreSQL 15.',
    category: 'Backend Development',
    subCategory: 'Enterprise Full-Stack | Type-Safe Architecture',
    featured: false,
    coverImage: '',
    images: [],
    overview:
      'Waste Brokering Marketplace is an enterprise-oriented waste management and brokering platform. Built on modern backend and frontend stacks (NestJS 11 and Next.js 16), it leverages Prisma ORM and PostgreSQL 15 to handle structured waste lot listings, compliance verification, and multi-tenant transactional flows.',
    problemStatement:
      'Commercial waste handling demands strict regulatory record-keeping, multi-entity role access (generators, brokers, haulers, disposal facilities), and rigorous schema integrity that typical ad-hoc marketplaces cannot provide.',
    solution:
      'Engineered an enterprise-grade, strongly typed software architecture featuring NestJS dependency injection, Prisma ORM type safety, automated CI/CD GitHub Actions pipelines, and a modern Next.js user interface.',
    myContribution: [
      'Configured type-safe backend architecture using NestJS 11 and TypeScript.',
      'Designed relational database schema in PostgreSQL 15 managed through Prisma migrations.',
      'Built automated CI and CD workflows with GitHub Actions for testing and deployment validation.',
      'Established modular structure separating auth, listings, transactions, and audit modules.',
    ],
    keyFeatures: [
      'NestJS 11 Architecture: Modular dependency injection and robust controller-service-repository patterns.',
      'Prisma ORM & PostgreSQL: Strongly typed relational queries, declarative migrations, and zero schema drift.',
      'Multi-Role Authorization: Granular permissions for waste generators, certified brokers, and haulers.',
      'Automated CI/CD: Automated linting, test suites, and Docker deployment actions via GitHub Workflows.',
    ],
    technologies: ['NestJS', 'Next.js', 'Prisma ORM', 'PostgreSQL', 'TypeScript', 'Docker', 'GitHub Actions'],
    architecture: {
      summary: 'Next.js 16 UI → NestJS 11 REST API → Prisma ORM → PostgreSQL 15 Database → Docker & CI/CD Pipelines.',
      nodes: [
        { id: 'next', title: 'Next.js 16 UI', subtitle: 'Server & Client Components', iconName: 'Layout', description: 'Responsive dashboard for waste generators, brokers, and haulers.' },
        { id: 'nest', title: 'NestJS Backend', subtitle: 'TypeScript Microservices', iconName: 'Server', description: 'Controller, service, and validation pipe layers handling business logic.' },
        { id: 'prisma', title: 'Prisma ORM', subtitle: 'Type-Safe Data Layer', iconName: 'Layers', description: 'Auto-generated client ensuring end-to-end TypeScript type synchronization.' },
        { id: 'postgres', title: 'PostgreSQL 15', subtitle: 'Relational DB', iconName: 'Database', description: 'ACID-compliant storage for users, waste manifests, and transaction ledgers.' },
      ],
      codeSnippet: {
        language: 'typescript',
        filename: 'src/modules/listings/listings.service.ts',
        code: `import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async findVerifiedListings(category?: string) {
    return this.prisma.wasteListing.findMany({
      where: {
        status: 'VERIFIED',
        ...(category && { category }),
      },
      include: { generator: { select: { id: true, name: true, complianceScore: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}`,
      },
    },
    workflowSteps: [
      { step: 1, title: 'Waste Generator Listing', description: 'Commercial generator lists waste lot with chemical classification and quantity.' },
      { step: 2, title: 'Broker Inspection & Compliance', description: 'Authorized broker reviews documentation against regional environmental regulations.' },
      { step: 3, title: 'Transaction Execution', description: 'Logistics and destination disposal contracts are committed to PostgreSQL ledger.' },
    ],
    challengesAndLearnings: [
      {
        challenge: 'Structuring strict relational constraints across multiple user roles and stateful listing statuses.',
        solution: 'Leveraged Prisma declarative schema with explicit enums and foreign key cascades.',
      },
      {
        challenge: 'Maintaining end-to-end type safety between frontend API calls and database entities.',
        solution: 'Used shared TypeScript DTOs across NestJS controllers and Next.js frontend clients.',
      },
    ],
    verifiedOutcomes: [
      'End-to-end TypeScript codebase with automated GitHub Actions CI/CD workflows.',
      'Normalized PostgreSQL database schema with Prisma ORM migrations.',
      'Scalable modular backend architecture following NestJS best practices.',
    ],
    githubUrl: 'https://github.com/Jayasingh0404/Brokering-project',
    liveDemoUrl: '',
    isPublished: true,
    createdAt: '2026-02-10',
    updatedAt: '2026-03-01',
  },
  {
    id: 'answer-evaluation-engine',
    title: 'Answer Evaluation Engine & Quality Dashboard',
    slug: 'answer-evaluation-engine',
    tagline: 'Hybrid rule-based and LLM-powered candidate answer grading engine with fault-tolerant Dead-Letter Queues.',
    category: 'Artificial Intelligence',
    subCategory: 'NLP | LLM Evaluation | Backend Engineering',
    featured: false,
    coverImage: '',
    images: [],
    overview:
      'Answer Evaluation Engine (v1) and AI Response Quality Dashboard were developed during my AI/ML internship at UpToSkills. The system automatically assesses technical candidate answers in Computer Science domains (Data Structures & Algorithms, DBMS, Operating Systems), outputs a calibrated score out of 10 with actionable feedback, and monitors evaluation quality metrics through an interactive dashboard. As part of this work, I also researched and documented Dead-Letter Queue (DLQ) architectures for asynchronous fault tolerance.',
    problemStatement:
      'Manually reviewing hundreds of student or candidate technical responses is slow, subject to evaluator fatigue, and inconsistent across different reviewers. Pure LLM evaluation is prone to variance and high API cost, while purely rule-based evaluation misses contextual understanding.',
    solution:
      'Engineered a hybrid evaluation engine combining rule-based heuristics (keyword presence, technical term density, length constraints) with LLM semantic reasoning to produce calibrated 0–10 scores and targeted feedback, backed by an analytics dashboard and DLQ failure resilience patterns.',
    myContribution: [
      'Developed core FastAPI evaluation endpoints accepting student answers and question rubrics.',
      'Built hybrid evaluation pipeline synthesizing rule-based checks and LLM semantic assessments.',
      'Created AI Response Quality Dashboard featuring score distribution histograms, domain donuts, and confidence timelines.',
      'Researched Dead-Letter Queue (DLQ) architecture patterns for asynchronous task retry and poison pill handling.',
      'Conducted automated testing and benchmarked evaluation consistency across DSA, DBMS, and OS domains.',
    ],
    keyFeatures: [
      'Hybrid Evaluation Strategy: Combines deterministic rule-based criteria with LLM contextual reasoning.',
      '0–10 Calibrated Scoring: Generates score breakdowns with strengths, gaps, and specific technical feedback.',
      'Domain Coverage: Tailored evaluation logic for DSA, DBMS, and Operating Systems questions.',
      'Quality Dashboard: Tracks KPI metrics, score distributions, confidence levels, and method breakdown ratios.',
      'Dead-Letter Queue Resilience: Documented and prototyped asynchronous message recovery and fault tolerance.',
    ],
    technologies: ['Python', 'FastAPI', 'OpenAI / LLMs', 'NLP', 'Streamlit', 'Dead-Letter Queues', 'REST APIs', 'Pytest'],
    architecture: {
      summary: 'Candidate Answer → FastAPI Endpoint → Input Validation → Rule-Based Heuristic Evaluation → LLM Semantic Reasoner → Calibrated Score (0-10) & Feedback → Quality Dashboard / DB.',
      nodes: [
        { id: 'input', title: 'Student Answer', subtitle: 'Technical Response', iconName: 'FileCheck', description: 'Candidate submits code or conceptual explanation for DSA/DBMS/OS question.' },
        { id: 'gateway', title: 'FastAPI Gateway', subtitle: 'Validation & Routing', iconName: 'Cpu', description: 'Validates payload, sanitizes tokens, and directs to hybrid evaluation pipeline.' },
        { id: 'rules', title: 'Rule-Based Engine', subtitle: 'Keyword & Structure', iconName: 'CheckSquare', description: 'Checks essential keywords, complexity mentions, and structural completeness.' },
        { id: 'llm', title: 'LLM Evaluator', subtitle: 'Semantic Assessment', iconName: 'Sparkles', description: 'Evaluates logical correctness, depth of explanation, and assigns qualitative feedback.' },
        { id: 'score', title: 'Score & Feedback', subtitle: 'Score / 10', iconName: 'Award', description: 'Synthesizes final calibrated 0-10 rating with actionable feedback paragraphs.' },
        { id: 'dlq', title: 'DLQ Fault Tolerance', subtitle: 'Async Recovery', iconName: 'AlertTriangle', description: 'Safely traps malformed answers or API timeouts for review without pipeline blockage.' },
      ],
      codeSnippet: {
        language: 'python',
        filename: 'evaluator/hybrid_scorer.py',
        code: `def calculate_hybrid_score(rule_score: float, llm_score: float, confidence: float) -> dict:
    """Combines rule-based rubric score with LLM semantic score weighted by confidence."""
    # Ensure scores are clamped between 0.0 and 10.0
    r_score = max(0.0, min(10.0, rule_score))
    l_score = max(0.0, min(10.0, llm_score))
    
    # 40% rule-based baseline + 60% semantic reasoning
    composite_score = round((0.40 * r_score) + (0.60 * l_score), 1)
    
    return {
        "final_score": composite_score,
        "rule_component": r_score,
        "llm_component": l_score,
        "evaluation_confidence": confidence
    }`,
      },
    },
    workflowSteps: [
      { step: 1, title: 'Payload Validation', description: 'API endpoint receives candidate answer along with rubric criteria and target question domain.' },
      { step: 2, title: 'Rule-Based Filtering', description: 'Rule engine measures keyword density, syntax markers, and algorithmic references.' },
      { step: 3, title: 'LLM Reasoning', description: 'LLM assesses conceptual understanding, nuance, and edge-case awareness.' },
      { step: 4, title: 'Output & Dashboard Sync', description: 'Final 0-10 score, feedback, and telemetry data are streamed to candidate and logged to dashboard.' },
    ],
    challengesAndLearnings: [
      {
        challenge: 'Preventing evaluator score drift on ambiguous student explanations.',
        solution: 'Anchored the scoring with rule-based rubric baselines before applying LLM semantic judgment.',
      },
      {
        challenge: 'Handling API network timeouts in batch evaluation workflows.',
        solution: 'Researched and designed Dead-Letter Queue (DLQ) patterns to isolate poison-pill requests safely.',
      },
    ],
    verifiedOutcomes: [
      'Functional FastAPI evaluation service delivering automated 0-10 scoring.',
      'Response Quality Dashboard monitoring score distributions and evaluation methods.',
      'Comprehensive research report and prototype on Dead-Letter Queues for asynchronous resilience.',
    ],
    githubUrl: 'https://github.com/Jayasingh0404/AI-Response-Quality-Dashboard',
    liveDemoUrl: '',
    isPublished: true,
    createdAt: '2026-07-01',
    updatedAt: '2026-09-15',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Foundational languages for systems, algorithms, backend services, and web engineering.',
    icon: 'Code2',
    skills: [
      { name: 'Python', level: 'Hands-on Experience', highlight: true },
      { name: 'Java', level: 'Hands-on Experience', highlight: true },
      { name: 'SQL', level: 'Hands-on Experience', highlight: true },
      { name: 'JavaScript', level: 'Hands-on Experience', highlight: true },
      { name: 'HTML5', level: 'Hands-on Experience' },
      { name: 'CSS3', level: 'Hands-on Experience' },
    ],
  },
  {
    title: 'AI / Machine Learning',
    description: 'Models, NLP, RAG, and generative algorithms for real-world intelligence.',
    icon: 'Brain',
    skills: [
      { name: 'Machine Learning', level: 'Hands-on Experience', highlight: true },
      { name: 'Supervised Learning', level: 'Hands-on Experience', highlight: true },
      { name: 'Unsupervised Learning', level: 'Hands-on Experience' },
      { name: 'Deep Learning', level: 'Hands-on Experience', highlight: true },
      { name: 'Natural Language Processing (NLP)', level: 'Hands-on Experience', highlight: true },
      { name: 'Generative AI & LLMs', level: 'Hands-on Experience', highlight: true },
      { name: 'Retrieval-Augmented Generation (RAG)', level: 'Hands-on Experience', highlight: true },
      { name: 'Sentiment Analysis', level: 'Hands-on Experience' },
      { name: 'Computer Vision', level: 'Working Knowledge' },
      { name: 'Predictive Analytics', level: 'Hands-on Experience' },
    ],
  },
  {
    title: 'Backend Development',
    description: 'Scalable REST APIs, asynchronous services, and server architecture.',
    icon: 'Server',
    skills: [
      { name: 'FastAPI', level: 'Hands-on Experience', highlight: true },
      { name: 'Flask', level: 'Hands-on Experience', highlight: true },
      { name: 'REST APIs', level: 'Hands-on Experience', highlight: true },
      { name: 'Node.js', level: 'Working Knowledge' },
      { name: 'Express.js', level: 'Working Knowledge' },
    ],
  },
  {
    title: 'Frontend Development',
    description: 'Modern, high-performance, and responsive user interfaces.',
    icon: 'Layout',
    skills: [
      { name: 'React.js', level: 'Hands-on Experience', highlight: true },
      { name: 'Vite', level: 'Hands-on Experience', highlight: true },
      { name: 'Tailwind CSS', level: 'Hands-on Experience', highlight: true },
      { name: 'Responsive Web Design', level: 'Hands-on Experience', highlight: true },
      { name: 'Framer Motion', level: 'Hands-on Experience' },
    ],
  },
  {
    title: 'Databases & Cloud',
    description: 'Relational & document databases, persistence, and hosting.',
    icon: 'Database',
    skills: [
      { name: 'SQL', level: 'Hands-on Experience', highlight: true },
      { name: 'SQLite', level: 'Hands-on Experience', highlight: true },
      { name: 'MongoDB', level: 'Hands-on Experience', highlight: true },
      { name: 'Firebase', level: 'Hands-on Experience', highlight: true },
      { name: 'Cloud Deployment (Render)', level: 'Hands-on Experience' },
    ],
  },
  {
    title: 'Developer Tools & CI/CD',
    description: 'Version control, containerization, testing frameworks, and automation.',
    icon: 'Wrench',
    skills: [
      { name: 'Git', level: 'Hands-on Experience', highlight: true },
      { name: 'GitHub', level: 'Hands-on Experience', highlight: true },
      { name: 'Docker', level: 'Hands-on Experience', highlight: true },
      { name: 'GitHub Actions', level: 'Hands-on Experience', highlight: true },
      { name: 'GitLab CI/CD', level: 'Working Knowledge' },
      { name: 'Pytest', level: 'Hands-on Experience', highlight: true },
    ],
  },
];

export const workExperience: WorkExperience[] = [
  {
    role: 'AI/ML Intern',
    company: 'UpToSkills',
    duration: 'June 2026 – September 2026',
    location: 'Remote',
    type: 'Internship',
    technologies: [
      'Python',
      'FastAPI',
      'Generative AI',
      'NLP',
      'Supervised Learning',
      'Unsupervised Learning',
      'Deep Learning',
      'Dead-Letter Queues (DLQ)',
      'Pytest',
    ],
    summary:
      'Contributed as an AI/ML Intern focusing on automated evaluation systems, natural language processing, API development, and asynchronous queue resilience.',
    highlights: [
      'Engineered Answer Evaluation Engine (v1) to automate technical candidate evaluation, scoring answers out of 10 with actionable feedback.',
      'Developed hybrid evaluation logic combining rule-based heuristics with LLM contextual reasoning across DSA, DBMS, and Operating Systems.',
      'Built and integrated FastAPI endpoints with comprehensive input validation and automated test suites.',
      'Authored in-depth technical research and prototype architecture on Dead-Letter Queues (DLQ) for asynchronous fault tolerance and poison pill isolation.',
      'Applied supervised and unsupervised machine learning methods and evaluated model outputs for evaluation stability.',
    ],
  },
];

export const educationHistory = [
  {
    institution: 'Ajeenkya DY Patil University',
    degree: 'B.Tech in Computer Science & Information Technology',
    period: '2024 — 2028',
    location: 'Pune, Maharashtra',
    highlights: [
      'Core coursework: Data Structures & Algorithms, Object-Oriented Programming (Java), Database Management Systems (SQL), Operating Systems, Computer Networks.',
      'Focusing on Artificial Intelligence, Machine Learning, and Web Architecture.',
    ],
  },
  {
    institution: 'Vanita Vishram',
    degree: 'Class XII (Higher Secondary Science)',
    period: '2024',
    location: 'Athwagate, Surat, Gujarat',
    highlights: [
      'Science stream with focus on Mathematics, Physics, and Chemistry.',
      'Score: 55.2% (Class XII Board Examination).',
    ],
  },
];

export const certifications: Certification[] = [
  {
    title: 'Nirmaan Hackathon',
    issuer: 'Amity University',
    date: 'April 2026',
    skillsLearned: ['Supervised Learning', 'Unsupervised Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Generative AI', 'Model Optimization', 'Presentations'],
    badgeType: 'hackathon',
  },
  {
    title: 'AI for Bharat 2026 Hackathon',
    issuer: 'AWS',
    date: 'February 2026',
    skillsLearned: ['Python', 'HuggingFace', 'FastAPI', 'Machine Learning', 'AI/ML', 'HTML/CSS', 'GitHub', 'Presentations'],
    badgeType: 'hackathon',
  },
  {
    title: 'Java Concept',
    issuer: 'Infosys Springboard',
    date: 'March 2025',
    skillsLearned: ['Java', 'OOP', 'Exception Handling', 'Collections Framework'],
    badgeType: 'course',
  },
  {
    title: 'Java Essentials',
    issuer: 'Infosys Springboard',
    date: 'March 2025',
    skillsLearned: ['Java Syntax', 'Data Types', 'Control Flow', 'Algorithms'],
    badgeType: 'course',
  },
  {
    title: 'AI Tools and ChatGPT Workshop',
    issuer: 'be10x',
    date: 'November 2025',
    skillsLearned: ['Generative AI', 'Python', 'AI Model Optimization', 'GitLab CI/CD'],
    badgeType: 'workshop',
  },
  {
    title: 'College Ambassador Recognition',
    issuer: 'Techfest, IIT Bombay',
    date: '2024 — 2025',
    skillsLearned: ['Campus Leadership', 'Outreach', 'Event Strategy', 'Technical Community Building'],
    badgeType: 'recognition',
  },
];

export const dsaTopics: DSATopic[] = [
  {
    category: 'Arrays & Two Pointers',
    description: 'Mastering contiguous memory traversal, two-pointer convergence, and sliding window techniques.',
    concepts: ['Two Pointers', 'Sliding Window', 'Prefix Sums', 'In-place Modification', 'Cadence Optimization'],
    featuredProblem: {
      title: 'Boyer-Moore Majority Vote Algorithm',
      difficulty: 'Medium',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      explanation:
        'Finds the majority element appearing more than ⌊n / 2⌋ times using constant extra space by maintaining a running candidate and balance count.',
      javaSnippet: `public int majorityElement(int[] nums) {
    int candidate = nums[0];
    int count = 0;
    
    for (int num : nums) {
        if (count == 0) {
            candidate = num;
        }
        count += (num == candidate) ? 1 : -1;
    }
    
    return candidate; // O(N) time, O(1) auxiliary space
}`,
    },
  },
  {
    category: 'Searching & Binary Search',
    description: 'Logarithmic search space reduction across sorted arrays, rotated arrays, and monotonic answer spaces.',
    concepts: ['Binary Search', 'Search in Rotated Sorted Array', 'Binary Search on Answer Space', 'Lower/Upper Bound'],
    featuredProblem: {
      title: 'Search in Rotated Sorted Array',
      difficulty: 'Medium',
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      explanation:
        'Determines which half of the array is sorted at every step, then decides whether the target lies within that boundary.',
      javaSnippet: `public int search(int[] nums, int target) {
    int low = 0, high = nums.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        
        // Left half is sorted
        if (nums[low] <= nums[mid]) {
            if (target >= nums[low] && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else { // Right half is sorted
            if (target > nums[mid] && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}`,
    },
  },
  {
    category: 'Dynamic Programming & Recursion',
    description: 'Breaking complex problems into overlapping subproblems with memoization and bottom-up tabulation.',
    concepts: ['Memoization (Top-down)', 'Tabulation (Bottom-up)', '0/1 Knapsack Pattern', 'Longest Common Subsequence', 'State Space Reduction'],
    featuredProblem: {
      title: 'Climbing Stairs / Fibonacci State Optimization',
      difficulty: 'Easy',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      explanation:
        'Computes the number of distinct ways to reach top using constant space by keeping track of the previous two state transitions.',
      javaSnippet: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1; // Optimized from O(N) space to O(1)
}`,
    },
  },
  {
    category: 'Linked Lists, Stacks & Queues',
    description: 'Pointer manipulation, monotonic stacks for nearest smaller/greater elements, and queue processing.',
    concepts: ['Fast & Slow Pointers', 'Cycle Detection (Floyd)', 'Monotonic Stack', 'Deque for Sliding Window Maximum'],
  },
  {
    category: 'Trees & Binary Search Trees',
    description: 'Hierarchical tree traversals (Pre, In, Post, Level-order), LCA, height balance, and BST validation.',
    concepts: ['DFS Traversals', 'BFS (Queue)', 'Lowest Common Ancestor', 'BST Properties', 'Diameter of Tree'],
  },
  {
    category: 'Graphs & Disjoint Set Union',
    description: 'Adjacency representations, DFS, BFS, cycle detection, Topological Sort (Kahn), and shortest paths.',
    concepts: ['BFS / DFS on Graph', 'Bipartite Checking', 'Topological Sort', 'Cycle Detection in Directed Graphs'],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Fault-Tolerant Microservices with Dead-Letter Queues (DLQ)',
    slug: 'dead-letter-queues-fault-tolerance',
    excerpt:
      'How to isolate poison-pill messages, prevent cascading pipeline failures, and design safe retry mechanisms in asynchronous distributed systems.',
    readTime: '6 min read',
    date: 'Sep 2026',
    tags: ['Backend', 'System Design', 'Reliability', 'Python'],
    content: `In distributed architectures where microservices communicate via asynchronous queues, message processing failures are inevitable. A service might fail due to database timeouts, network partition, or a "poison pill"—a malformed payload that triggers an unhandled exception every time it is retried.

Without a Dead-Letter Queue (DLQ), retrying that poison pill blocks the consumer queue, consuming CPU cycles and creating consumer lag.

### Key Concepts:
1. **Redelivery Counters**: Track how many times a message has failed.
2. **DLQ Routing**: Once the counter exceeds a safe threshold (e.g., 3-5 attempts), the broker shunts the message to a dedicated DLQ.
3. **Poison Pill Isolation**: Consumer worker processes remain unblocked to continue processing valid jobs.
4. **Replay & Inspection Tooling**: Operators inspect DLQ metadata, diagnose root cause, patch the consumer, and replay messages back to the primary exchange.`,
  },
  {
    id: '2',
    title: 'Demystifying RAG: From TF-IDF Lexical Match to Dense Vector Embeddings',
    slug: 'demystifying-rag-tfidf-vs-dense-embeddings',
    excerpt:
      'Why classical TF-IDF and BM25 search remains effective for domain-specific technical terminology before reaching for dense vector databases.',
    readTime: '5 min read',
    date: 'Aug 2026',
    tags: ['AI/ML', 'NLP', 'RAG', 'Python'],
    content: `When developers build their first Retrieval-Augmented Generation (RAG) system, the default reflex is to deploy a dense vector database like Pinecone or Chroma. However, for specialized compliance and terminology-heavy datasets, classical lexical scoring (TF-IDF and BM25) offers unique strengths:

1. **Exact Code & Clause Matching**: Dense embeddings often blur exact alphanumeric numbers (e.g., standard codes like "IS 10500" vs "IS 10501"). TF-IDF guarantees exact match weighting.
2. **Deterministic CPU Latency**: Sub-10ms query times on standard CPUs without GPU overhead or cloud indexing fees.
3. **Hybrid Power**: The optimal production approach is often hybrid search: combine BM25 / TF-IDF for keyword recall with dense embeddings for conceptual semantic similarity.`,
  },
  {
    id: '3',
    title: 'Engineering Fraud-Resistant Logistics: The < 5% Weighbridge Tolerance Algorithm',
    slug: 'weighbridge-tolerance-scrap-marketplace',
    excerpt:
      'Designing transactional state machines and discrepancy thresholds for B2B industrial recycling platforms.',
    readTime: '4 min read',
    date: 'Feb 2026',
    tags: ['Full-Stack', 'Flask', 'Circular Economy', 'System Architecture'],
    content: `In industrial scrap trading, bulk material naturally fluctuates during transit due to moisture loss, scale calibration variance, and dust dispersion. However, fraudulent haulers often exploit this by skimming cargo.

In ScrapTrade Hub, we engineered a deterministic weighbridge validation engine:
- If discrepancy is **<= 5%**, the transaction proceeds automatically to settlement.
- If discrepancy exceeds **5%**, escrow funds remain locked, and an automated arbitration ticket is opened with digital weight slips attached.
This single mathematical rule eliminated 90% of manual dispute overhead in testing.`,
  },
];

