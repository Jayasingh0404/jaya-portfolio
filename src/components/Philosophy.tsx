import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Hammer, RefreshCw, Compass } from 'lucide-react';

export const Philosophy: React.FC = () => {
  const principles = [
    {
      step: '01',
      title: 'Learn',
      quote: 'Stay curious. Explore emerging technologies. Build strong fundamentals.',
      description:
        'Continuous inquiry into machine learning algorithms, distributed systems, and modern paradigms. Understanding why an approach works, not just how to copy it.',
      icon: BookOpen,
      accent: 'from-blue-500 to-indigo-500',
    },
    {
      step: '02',
      title: 'Build',
      quote: 'Turn ideas into practical solutions through experimentation and engineering.',
      description:
        'Taking theory into concrete, working software. Building end-to-end B2B marketplaces, compliance RAG engines, and testing under real constraints.',
      icon: Hammer,
      accent: 'from-indigo-500 to-purple-500',
    },
    {
      step: '03',
      title: 'Improve',
      quote: 'Learn from challenges, refine the approach and keep moving forward.',
      description:
        'Auditing performance bottlenecks, eliminating failure points with patterns like Dead-Letter Queues, and holding code to high verification standards.',
      icon: RefreshCw,
      accent: 'from-purple-500 to-cyan-500',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-slate-50/40 dark:bg-[#0b101c]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400 mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Guiding Principles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Development Philosophy
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            A developer's mindset focused on curiosity, disciplined execution, and continuous refinement.
          </p>
        </div>

        {/* 3 Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative rounded-2xl p-8 bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-300 dark:text-slate-700">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>

                  <blockquote className="text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 italic mb-4">
                    "{item.quote}"
                  </blockquote>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

