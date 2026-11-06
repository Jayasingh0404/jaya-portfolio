import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProjectCard } from '../components/ProjectCard';
import { Project } from '../types';
import { getStoredProjects } from '../lib/storage';
import { Sparkles, ArrowLeft, Filter, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb & Navigation */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Complete Portfolio Index</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              All Systems & Architecture
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Explore in-depth case studies, dataflow architectures, and verified implementation outcomes across AI/ML and full-stack software development.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200/60 dark:border-white/5">
            <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filter by Domain:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured={project.featured} />
            ))}
          </div>

          {filteredProjects.length === 0 && !loading && (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-white/10">
              <p className="text-sm text-slate-500">No projects found in this domain.</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

