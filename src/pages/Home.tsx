import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { DSAJourney } from '../components/DSAJourney';
import { Education } from '../components/Education';
import { Certifications } from '../components/Certifications';
import { Philosophy } from '../components/Philosophy';
import { GitHubActivity } from '../components/GitHubActivity';
import { EngineeringNotes } from '../components/EngineeringNotes';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <DSAJourney />
        <Education />
        <Certifications />
        <Philosophy />
        <GitHubActivity />
        <EngineeringNotes />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

