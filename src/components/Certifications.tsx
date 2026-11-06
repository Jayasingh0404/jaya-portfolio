import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';
import { certifications } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 relative overflow-hidden bg-slate-50/50 dark:bg-[#0b101c]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-xs font-mono font-medium text-amber-600 dark:text-amber-400 mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Certifications</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Certifications & Achievements
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300">
            Validated learning milestones across hackathons, core Java development, and AI engineering.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-2xl p-6 bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-white/10 hover:border-amber-500/40 shadow-sm hover:shadow-xl hover:shadow-amber-500/5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40 font-semibold uppercase">
                    {cert.badgeType}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {cert.title}
                </h3>

                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                  {cert.issuer}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skillsLearned.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-emerald-500 font-mono">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Credential
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

