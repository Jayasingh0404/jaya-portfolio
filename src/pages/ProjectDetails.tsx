import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArchitectureViewer } from '../components/ArchitectureViewer';
import { ImageGallery } from '../components/ImageGallery';
import { Project } from '../types';
import { getStoredProjects } from '../lib/storage';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProject = async () => {
      const data = await getStoredProjects();
      setAllProjects(data);
      const found = data.find((p) => p.slug === slug || p.id === slug);
      if (found) {
        setProject(found);
      }
      setLoading(false);
    };
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-mono text-slate-400">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
            <p className="text-sm text-slate-500 mb-6">
              The requested project case study could not be located.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Projects</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Prev / Next Project navigation
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                {project.category}
              </span>
              {project.subCategory && (
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40 hidden sm:inline-block">
                  {project.subCategory}
                </span>
              )}
            </div>
          </div>

          {/* Hero Case Study Header */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-indigo-600 dark:text-indigo-400 font-medium mb-6">
              {project.tagline}
            </p>

            {/* CTAs Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white/10 dark:hover:bg-white/20 text-xs font-mono font-semibold transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                </a>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-semibold shadow-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Platform</span>
                </a>
              )}

              <Link
                to={`/admin?project=${project.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors ml-auto"
              >
                <span>Manage Screenshots & Info</span>
              </Link>
            </div>
          </div>

          {/* Verified Outcomes Metrics Banner */}
          {project.verifiedOutcomes && project.verifiedOutcomes.length > 0 && (
            <div className="rounded-2xl p-6 bg-emerald-500/5 border border-emerald-500/20 mb-12">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                  Verified Outcomes & Metrics
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.verifiedOutcomes.map((metric, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/60 dark:bg-white/[0.03] border border-emerald-500/15">
                    <p className="text-xs text-slate-700 dark:text-slate-200 font-mono font-medium leading-relaxed">
                      {metric}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Overview, Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-rose-500 mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold">
                    The Problem Statement
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.problemStatement || project.overview}
                </p>
              </div>
            </div>

            <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-indigo-500 mb-3">
                  <Lightbulb className="w-4 h-4" />
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold">
                    The Engineered Solution
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.solution || project.overview}
                </p>
              </div>
            </div>
          </div>

          {/* Section: System Architecture Diagram */}
          {project.architecture && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-4 h-4 text-indigo-500" />
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                  Engineering Architecture
                </h3>
              </div>
              <ArchitectureViewer architecture={project.architecture} />
            </div>
          )}

          {/* Section: Dynamic Screenshot Showcase */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-500" />
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                  Interface Demonstrations & Screenshots
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {project.images.length} screenshots
              </span>
            </div>
            <ImageGallery
              images={project.images}
              projectTitle={project.title}
              projectId={project.id}
            />
          </div>

          {/* Section: My Contribution & Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            {/* My Contribution */}
            <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-white/10 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                <span>My Individual Contributions</span>
              </h3>
              <div className="space-y-3">
                {project.myContribution.map((contrib, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{contrib}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-white/10 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Key Platform Features</span>
              </h3>
              <div className="space-y-3">
                {project.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Workflow Steps */}
          {project.workflowSteps && project.workflowSteps.length > 0 && (
            <div className="mb-14 rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-white/10 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                End-to-End User & Data Workflow
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.workflowSteps.map((step) => (
                  <div key={step.step} className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center mb-3">
                      {step.step}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Engineering Challenges & Approach */}
          {project.challengesAndLearnings && project.challengesAndLearnings.length > 0 && (
            <div className="mb-14 rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-white/10 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Engineering Challenges & Technical Solutions
              </h3>
              <div className="space-y-6">
                {project.challengesAndLearnings.map((item, idx) => (
                  <div key={idx} className="pb-6 border-b border-slate-100 dark:border-white/5 last:pb-0 last:border-none">
                    <p className="text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 mb-1.5 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>Challenge: {item.challenge}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-6 leading-relaxed">
                      <span className="font-semibold text-indigo-500 dark:text-indigo-400">Resolution: </span>
                      {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used Badges */}
          <div className="mb-14">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
              Full Technology Stack:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white dark:bg-[#0e1628] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Next / Previous Project Navigation */}
          <div className="pt-10 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevProject ? (
              <Link
                to={`/project/${prevProject.slug}`}
                className="w-full sm:w-auto p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:border-indigo-500 transition-colors flex items-center gap-3 text-left"
              >
                <ArrowLeft className="w-4 h-4 text-indigo-500" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Previous Project</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                    {prevProject.title}
                  </p>
                </div>
              </Link>
            ) : <div />}

            {nextProject && (
              <Link
                to={`/project/${nextProject.slug}`}
                className="w-full sm:w-auto p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:border-indigo-500 transition-colors flex items-center justify-end gap-3 text-right"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Next Project</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                    {nextProject.title}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-500" />
              </Link>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

