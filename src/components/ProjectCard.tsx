import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { Github, ExternalLink, ArrowRight, Layers, Star, CheckCircle, ShieldAlert } from 'lucide-react';

interface Props {
  project: Project;
  featured?: boolean;
}

export const ProjectCard: React.FC<Props> = ({ project, featured = false }) => {
  return (
    <div
      className={`group rounded-2xl bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-500/40 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        featured ? 'ring-1 ring-indigo-500/20' : ''
      }`}
    >
      <div>
        {/* Visual Top Preview */}
        <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden border-b border-slate-100 dark:border-white/10">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            // Clean architectural fallback preview
            <div className="w-full h-full flex flex-col justify-between p-5 bg-gradient-to-br from-[#0c1222] via-[#090e1a] to-[#121a30] text-white">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 border border-white/10 text-indigo-300">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    Flagship
                  </span>
                )}
              </div>

              <div className="my-auto py-2">
                <h4 className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {project.tagline}
                </p>
              </div>

              {/* Verified Outcome Metric Pill */}
              {project.verifiedOutcomes && project.verifiedOutcomes.length > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md">
                  <CheckCircle className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{project.verifiedOutcomes[0]}</span>
                </div>
              )}
            </div>
          )}

          {/* Category Tag if cover image exists */}
          {project.coverImage && (
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-white">
                {project.category}
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider">
              {project.subCategory || project.category}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {project.images.length > 0 ? `${project.images.length} screenshots` : 'Case Study Ready'}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <Link to={`/project/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
            {project.overview}
          </p>

          {/* Technologies Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              title="GitHub Repository"
              aria-label={`${project.title} GitHub Repository`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              title="Live Demo"
              aria-label={`${project.title} Live Demo`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <Link
          to={`/project/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group/link"
        >
          <span>Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

