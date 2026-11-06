import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, MapPin, Sparkles, Terminal, Code2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status & Location Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.status}</span>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <MapPin className="w-3 h-3 text-indigo-500" />
                {personalInfo.location}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-5">
              Building{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400">
                Intelligent Solutions.
              </span>
              <br />
              Engineering Real-World Impact.
            </h1>

            {/* Professional Identity Subtitle */}
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
              <span>AI/ML Developer</span>
              <span className="text-slate-400">•</span>
              <span>Full-Stack Engineer</span>
              <span className="text-slate-400">•</span>
              <span>Problem Solver</span>
            </div>

            {/* Supporting Bio */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
              {personalInfo.heroSubheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md hover:shadow-indigo-500/25 transition-all duration-200 group"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={personalInfo.resumeUrl}
                download="Jaya_Singh_Resume.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all duration-200"
              >
                <Download className="w-4 h-4 text-indigo-500" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors"
              >
                Let's Connect
              </a>
            </div>

            {/* Social Links & Highlights */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex items-center gap-6 text-slate-500 dark:text-slate-400 text-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Profiles:</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="font-mono text-xs">GitHub</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span className="font-mono text-xs">LinkedIn</span>
              </a>
              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-white transition-colors"
              >
                <Code2 className="w-4 h-4 text-amber-500" />
                <span className="font-mono text-xs">LeetCode</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Portrait Frame & Architectural Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer decorative ambient ring */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 opacity-30 blur-xl"></div>

              {/* Card Container */}
              <div className="relative rounded-2xl p-2.5 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/15 shadow-2xl overflow-hidden">
                
                {/* Photo Frame with subtle dark vignette */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src={personalInfo.photoUrl}
                    alt="Jaya Singh"
                    className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02] transition-transform duration-500 hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Name overlay at the base of portrait */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold tracking-tight">{personalInfo.name}</p>
                        <p className="text-[11px] text-slate-300 font-mono">B.Tech CS & IT • 2028</p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center">
                        <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Badge */}
                <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span className="font-mono text-slate-600 dark:text-slate-300">
                      {personalInfo.brandTagline}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Ajeenkya DY Patil Univ
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

