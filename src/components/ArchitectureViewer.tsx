import React, { useState } from 'react';
import { ProjectArchitecture } from '../types';
import {
  ArrowRight,
  Code,
  Layers,
  Server,
  Database,
  Cpu,
  ShieldCheck,
  Scale,
  Sparkles,
  Search,
  MessageSquare,
  Activity,
  BookOpen,
  Shield,
  CheckSquare,
  Award,
  AlertTriangle,
  FileCheck,
  Layout,
  Globe,
  Terminal,
  FileText,
  Sliders,
} from 'lucide-react';

interface Props {
  architecture: ProjectArchitecture;
}

export const ArchitectureViewer: React.FC<Props> = ({ architecture }) => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'code'>('diagram');

  const iconComponents: Record<string, React.ElementType> = {
    Layout,
    Globe,
    Terminal,
    FileText,
    Sliders,
    Server,
    Database,
    Cpu,
    ShieldCheck,
    Scale,
    Sparkles,
    Search,
    MessageSquare,
    Activity,
    BookOpen,
    Shield,
    CheckSquare,
    Award,
    AlertTriangle,
    FileCheck,
    Layers,
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg">
      {/* Header bar */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-white/[0.02]">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              System Architecture & Pipeline Flow
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {architecture.summary}
          </p>
        </div>

        {architecture.codeSnippet && (
          <div className="flex items-center rounded-lg bg-slate-200 dark:bg-white/5 p-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab('diagram')}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === 'diagram'
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Interactive Flow
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === 'code'
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Core Code Logic
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: Flowchart Diagram */}
      {activeTab === 'diagram' && (
        <div className="p-6 overflow-x-auto">
          <div className="min-w-[680px] flex items-center justify-between gap-3 py-4">
            {architecture.nodes.map((node, index) => {
              const Icon = (node.iconName && iconComponents[node.iconName]) || Cpu;
              return (
                <React.Fragment key={node.id}>
                  <div className="flex-1 min-w-[130px] max-w-[180px] rounded-xl p-3.5 bg-slate-50 dark:bg-[#111a2e] border border-slate-200 dark:border-white/10 hover:border-indigo-500/50 transition-all group flex flex-col justify-between h-[155px]">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                        {node.title}
                      </h5>
                      <span className="text-[10px] font-mono text-indigo-500 dark:text-indigo-400 block mb-1">
                        {node.subtitle}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                      {node.description}
                    </p>
                  </div>

                  {index < architecture.nodes.length - 1 && (
                    <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 px-1">
                      <ArrowRight className="w-4 h-4 text-indigo-400" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Code Snippet */}
      {activeTab === 'code' && architecture.codeSnippet && (
        <div className="p-4 bg-[#080d1a] text-slate-200 font-mono text-xs overflow-x-auto">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-slate-400 text-[11px]">
            <span>{architecture.codeSnippet.filename}</span>
            <span className="uppercase">{architecture.codeSnippet.language}</span>
          </div>
          <pre className="p-2 leading-relaxed text-indigo-200">
            <code>{architecture.codeSnippet.code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

