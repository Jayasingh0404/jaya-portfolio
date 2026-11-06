import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-6 pt-28">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mx-auto mb-6">
            <Compass className="w-8 h-8" />
          </div>
          <span className="text-xs font-mono text-indigo-500 uppercase tracking-widest font-bold">
            404 Error
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 mb-3">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
            The page you are looking for doesn't exist or has been relocated.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

