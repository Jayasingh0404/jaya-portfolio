export interface ProjectImage {
  id: string;
  projectId: string;
  imageUrl: string;
  imageName: string;
  caption?: string;
  altText?: string;
  displayOrder: number;
  isCover: boolean;
  uploadedAt: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  subtitle: string;
  iconName?: string;
  description: string;
}

export interface ProjectArchitecture {
  summary: string;
  nodes: ArchitectureNode[];
  edges?: { from: string; to: string; label?: string }[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: 'Artificial Intelligence' | 'Machine Learning' | 'Full-Stack Development' | 'Backend Development' | 'Data Science';
  subCategory?: string;
  featured: boolean;
  coverImage?: string;
  images: ProjectImage[];
  overview: string;
  problemStatement: string;
  solution: string;
  myContribution: string[];
  keyFeatures: string[];
  technologies: string[];
  architecture?: ProjectArchitecture;
  workflowSteps?: { step: number; title: string; description: string }[];
  challengesAndLearnings: {
    challenge: string;
    solution: string;
  }[];
  verifiedOutcomes: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: {
    name: string;
    level: 'Hands-on Experience' | 'Working Knowledge' | 'Currently Exploring';
    highlight?: boolean;
  }[];
}

export interface WorkExperience {
  role: string;
  company: string;
  duration: string;
  location: string;
  type: string;
  technologies: string[];
  summary: string;
  highlights: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  skillsLearned: string[];
  badgeType: 'hackathon' | 'course' | 'workshop' | 'recognition';
  verifyUrl?: string;
}

export interface DSATopic {
  category: string;
  description: string;
  problemsCount?: number;
  featuredProblem?: {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    timeComplexity: string;
    spaceComplexity: string;
    explanation: string;
    javaSnippet: string;
  };
  concepts: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  readTime: string;
  date: string;
  tags: string[];
  content: string;
}

