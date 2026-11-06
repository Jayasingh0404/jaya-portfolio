import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, Code2, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const GitHubActivity: React.FC = () => {
  const verifiedRepositories = [
    {
      name: 'scraptrade-app',
      description: 'Production B2B & Circular Economy Scrap Marketplace with escrow & weighbridge discrepancy tolerance.',
      language: 'Python / Flask',
      langColor: 'bg-yellow-400',
      url: 'https://github.com/Jayasingh0404/scraptrade-app',
      topics: ['b2b-marketplace', 'flask', 'sqlite', 'docker', 'pytest'],
    },
    {
      name: 'BharatStandards-AI',
      description: 'AI-powered compliance research assistant for Indian Standards (BIS) with document chunking & RAG.',
      language: 'JavaScript / Python',
      langColor: 'bg-amber-500',
      url: 'https://github.com/Jayasingh0404/BharatStandards-AI',
      topics: ['react', 'fastapi', 'rag', 'bis-standards', 'docker'],
    },
    {
      name: 'income-prediction-system',
      description: 'Adult Census Income Prediction ML pipeline & interactive Streamlit web application (85.15% accuracy).',
      language: 'Python',
      langColor: 'bg-blue-400',
      url: 'https://github.com/Jayasingh0404/income-prediction-system',
      topics: ['scikit-learn', 'streamlit', 'classification', 'machine-learning'],
    },
    {
      name: 'Brokering-project',
      description: 'Enterprise waste brokering platform built on NestJS 11, Next.js 16, Prisma ORM, and PostgreSQL 15.',
      language: 'TypeScript',
      langColor: 'bg-blue-600',
      url: 'https://github.com/Jayasingh0404/Brokering-project',
      topics: ['nestjs', 'nextjs', 'prisma', 'postgresql', 'enterprise'],
    },
    {
      name: 'AI-Response-Quality-Dashboard',
      description: 'Analytics dashboard & automated answer evaluation engine with score distributions and domain breakdowns.',
      language: 'Python',
      langColor: 'bg-blue-400',
      url: 'https://github.com/Jayasingh0404/AI-Response-Quality-Dashboard',
      topics: ['fastapi', 'nlp', 'llm-evaluation', 'dashboard'],
    },
    {
      name: 'task-5-Dead-Letter-Queues-DLQ-',
      description: 'Research report and implementation patterns for Dead-Letter Queues (DLQ) in fault-tolerant microservices.',
      language: 'Documentation / Python',
      langColor: 'bg-emerald-500',
      url: 'https://github.com/Jayasingh0404/task-5-Dead-Letter-Queues-DLQ-',
      topics: ['fault-tolerance', 'dlq', 'queues', 'distributed-systems'],
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono font-medium text-slate-600 dark:text-slate-300 mb-3">
              <Github className="w-3.5 h-3.5" />
              <span>Open Source & Public Repositories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              GitHub Engineering Activity
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
              All codebases are publicly accessible, with clean commit histories and verified test suites.
            </p>
          </div>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white/10 dark:hover:bg-white/20 text-xs font-semibold font-mono hover:bg-slate-800 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>@Jayasingh0404 on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
          </a>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedRepositories.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              className="group rounded-2xl p-6 bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-500" />
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate max-w-[200px]"
                    >
                      {repo.name}
                    </a>
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    aria-label={`Open ${repo.name} on GitHub`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {repo.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.topics.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${repo.langColor}`}></span>
                  {repo.language}
                </span>
                <span className="text-[11px] text-slate-400">Public repo</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

