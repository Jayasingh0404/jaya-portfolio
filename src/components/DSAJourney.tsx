import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, ExternalLink, Cpu, CheckCircle, Terminal, Layers, Sparkles, BookOpen } from 'lucide-react';
import { dsaTopics, personalInfo } from '../data/portfolioData';

export const DSAJourney: React.FC = () => {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const activeTopic = dsaTopics[selectedTopicIndex];

  return (
    <section id="dsa" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-[#0b101c]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>Problem-Solving Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Consistency Over Everything.
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            I believe strong engineering begins with strong problem-solving fundamentals. I regularly practice DSA using Java and work on improving my understanding of algorithms, optimization, and computational complexity.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>LeetCode Profile</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ALTA APEX 151 DSA Challenge</span>
            </div>
          </div>
        </div>

        {/* Interactive DSA Topic Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Topics selector */}
          <div className="lg:col-span-4 space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 px-1">
              Core Algorithmic Domains:
            </h3>
            {dsaTopics.map((topic, idx) => (
              <button
                key={topic.category}
                onClick={() => setSelectedTopicIndex(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                  selectedTopicIndex === idx
                    ? 'bg-white dark:bg-[#111a2e] border-indigo-500 shadow-md shadow-indigo-500/5 dark:shadow-black/20'
                    : 'bg-white/60 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10'
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {topic.category}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {topic.description}
                  </p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    selectedTopicIndex === idx ? 'bg-indigo-500' : 'bg-transparent'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right Column: Code and Complexity Breakdown */}
          <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-white/10 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/10">
              <div>
                <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Algorithmic Focus
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {activeTopic.category}
                </h3>
              </div>

              {activeTopic.featuredProblem && (
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                    Time: {activeTopic.featuredProblem.timeComplexity}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/40">
                    Space: {activeTopic.featuredProblem.spaceComplexity}
                  </span>
                </div>
              )}
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 my-4 leading-relaxed">
              {activeTopic.description}
            </p>

            {/* Sub-concepts Pills */}
            <div className="mb-6">
              <span className="text-xs font-mono text-slate-400 block mb-2">Techniques Practiced:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeTopic.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Problem & Java Code */}
            {activeTopic.featuredProblem && (
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-[#080d1a]">
                <div className="px-4 py-3 bg-white/[0.03] border-b border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-bold">{activeTopic.featuredProblem.title}</span>
                  </div>
                  <span className="text-amber-400 font-medium">Java Solution</span>
                </div>

                <div className="p-3 text-[11px] text-slate-300 bg-white/[0.01] border-b border-white/5">
                  <span className="text-indigo-400 font-semibold font-mono">Approach: </span>
                  {activeTopic.featuredProblem.explanation}
                </div>

                <pre className="p-4 text-xs font-mono text-indigo-200 overflow-x-auto leading-relaxed">
                  <code>{activeTopic.featuredProblem.javaSnippet}</code>
                </pre>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

