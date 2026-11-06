import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { getStoredProjects } from '../lib/storage';
import { ProjectCard } from './ProjectCard';
import { Sparkles, Filter, Layers, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getStoredProjects();
      setProjects(data.filter((p) => p.isPublished));
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const categories = [
    'All',
    'Artificial Intelligence',
    'Machine Learning',
    'Full-Stack Development',
    'Backend Development',
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'All') return true;
    return (
      project.category === activeCategory ||
      project.subCategory?.toLowerCase().includes(activeCategory.toLowerCase())
    );
  });

  const flagshipProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-50/40 dark:bg-[#090e1b]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project-Driven Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Featured Systems & Case Studies
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-xl">
              Authentic applications engineered to solve domain friction across B2B marketplaces, compliance intelligence, and AI analytics.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Explore all repository architectures</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-slate-200/60 dark:border-white/5">
          <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Flagship Projects Section */}
        {flagshipProjects.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                Flagship Implementations
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {flagshipProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* Additional Projects Section */}
        {otherProjects.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-slate-400" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                Additional Projects & Research Systems
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured={false} />
              ))}
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-white/10">
            <p className="text-sm text-slate-500">No projects found matching the selected filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

