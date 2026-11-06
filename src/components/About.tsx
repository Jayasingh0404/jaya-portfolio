import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Layers, Code2, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description:
        'Hands-on experience with NLP, multi-model emotion detection (VADER, GoEmotions), RAG pipelines, and predictive algorithms.',
      badge: 'Generative AI & LLMs',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Layers,
      title: 'Full-Stack Product Dev',
      description:
        'Architecting end-to-end applications with React, Vite, FastAPI, Flask, SQLite, and PostgreSQL, focusing on clean modularity.',
      badge: 'B2B & Web Architecture',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Code2,
      title: 'Problem Solving & DSA',
      description:
        'Disciplined practice in Java, mastering time/space complexity, two pointers, binary search, and dynamic programming.',
      badge: 'Java & Algorithms',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Compass,
      title: 'Innovation & Real Impact',
      description:
        'Focusing on products that solve genuine friction—from industrial scrap marketplaces to regulatory compliance intelligence.',
      badge: 'Product Thinking',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-[#0b101c]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Philosophy & Background</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            More Than Just Code.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-justify sm:text-center">
            {personalInfo.aboutText}
          </p>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl p-6 bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400">
                    {pillar.badge}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-80" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

