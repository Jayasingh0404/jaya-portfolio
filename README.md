# Jaya Singh — World-Class Developer Portfolio & Studio

> **"Building Intelligent Solutions. Engineering Real-World Impact."**  
> Turning Ideas into Intelligent Solutions.

A world-class, premium personal engineering portfolio and interactive project management system for **Jaya Singh (Gautam Jayasingh Ramdevsingh)** — AI/ML Developer, Full-Stack Engineer, and Computer Science undergraduate at Ajeenkya DY Patil University.

---

## 🌟 Highlights & Architecture

- **Visual Engineering Aesthetic**: Designed with an editorial, Awwwards-quality aesthetic combining Linear-style clarity, Vercel-inspired typography, and Apple-grade whitespace.
- **Project-Driven Core**: Dedicated case studies for flagship and research projects with interactive system architecture diagrams, dataflows, code snippets, and verified metrics.
- **Dynamic Screenshot Studio & Admin CMS (`/admin`)**:
  - Authenticated admin dashboard with passcode protection (default: `jaya-portfolio-2026`).
  - Drag-and-drop screenshot uploads (PNG, JPG, JPEG, WebP).
  - Captions, accessibility alt-text, cover image selection, and visual reordering.
  - Add and edit project metadata on the fly without touching code.
  - Out-of-the-box persistent storage + seamless one-click Supabase cloud database/storage synchronization.
- **Interactive Lightbox Experience**: Fullscreen modal with previous/next controls, keyboard navigation (Escape, Arrow keys), and thumbnails.
- **Problem-Solving & DSA Journey**: Algorithmic deep dives into Java solutions (Boyer-Moore Voting, Binary Search, Dynamic Programming) with Big-O complexity analysis and ALTA APEX 151 challenge focus.
- **Engineering Notes & Journal**: In-depth architectural write-ups covering Dead-Letter Queues (DLQ), TF-IDF RAG lexical search, and B2B weighbridge tolerance algorithms.
- **Authentic Assets**: Real resume PDF download (`/Jaya_Singh_Resume.pdf`) and unretouched portrait photo (`/jaya-photo.jpg`).
- **Dark & Light Mode**: Smooth theme transitions persisting across visits.
- **Recruiter-First UX**: Immediate 30-second clarity on skills, projects, contact points, and resume download.

---

## 🗂️ Project Structure

```
jaya_portfolio/
├── public/
│   ├── favicon.svg             # Monogram JS vector favicon
│   ├── jaya-photo.jpg          # Original high-res portrait photograph
│   ├── Jaya_Singh_Resume.pdf   # Authentic PDF resume
│   ├── robots.txt              # Search engine crawler policies
│   └── sitemap.xml             # SEO sitemap with all routes
├── src/
│   ├── assets/                 # Brand assets
│   ├── components/             # Reusable UI modules
│   │   ├── Navbar.tsx          # Sticky glassmorphic navbar with theme & resume actions
│   │   ├── Hero.tsx            # Confident hero section with portrait & CTAs
│   │   ├── About.tsx           # 4-pillar architectural foundation
│   │   ├── Skills.tsx          # Categorized technical capabilities & verified tools
│   │   ├── Projects.tsx        # Flagship & research project showcase with domain filters
│   │   ├── ProjectCard.tsx     # Modern project cards with live metrics
│   │   ├── ArchitectureViewer.tsx # Interactive node-based system architecture diagram & code tabs
│   │   ├── ImageGallery.tsx    # Responsive screenshot gallery
│   │   ├── Lightbox.tsx        # Fullscreen screenshot viewer with keyboard controls
│   │   ├── Experience.tsx      # UpToSkills AI/ML internship timeline & contributions
│   │   ├── DSAJourney.tsx      # Problem-solving journey in Java with Big-O analysis
│   │   ├── Education.tsx       # Ajeenkya DY Patil University & high school education
│   │   ├── Certifications.tsx # Hackathon honors, Infosys Java, and be10x credentials
│   │   ├── Philosophy.tsx      # Learn, Build, Improve development ethos
│   │   ├── GitHubActivity.tsx  # Public GitHub repositories & verified tools
│   │   ├── EngineeringNotes.tsx# Technical blog modal & architectural articles
│   │   ├── Contact.tsx         # Interactive contact form & one-click email copy
│   │   └── Footer.tsx          # Monogram branding, back-to-top, & admin link
│   ├── context/
│   │   └── ThemeContext.tsx    # Light/Dark mode provider with persistence
│   ├── data/
│   │   └── portfolioData.ts    # Centralized content source of truth
│   ├── lib/
│   │   ├── storage.ts          # Persistent storage engine & admin session management
│   │   └── supabase.ts         # Supabase cloud client & SQL migration schema
│   ├── pages/
│   │   ├── Home.tsx            # Main portfolio page
│   │   ├── ProjectsPage.tsx    # Comprehensive projects directory
│   │   ├── ProjectDetails.tsx  # Detailed case study page
│   │   ├── Admin.tsx           # Dynamic screenshot management & CMS dashboard
│   │   └── NotFound.tsx        # 404 error page
│   ├── styles/
│   │   └── globals.css         # Tailwind styles, glassmorphism, & scrollbars
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Client-side router configuration
│   └── main.tsx                # React root mount
├── .env.example                # Sample environment variables
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Quickstart & Local Development

### Prerequisites
- Node.js 18+ (tested on Node.js 24)
- npm 9+

### 1. Clone & Install Dependencies
```bash
cd jaya_portfolio
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to explore the live website.

### 3. Build for Production
```bash
npm run build
```
This compiles TypeScript and outputs an optimized bundle in `dist/`.

---

## 🔐 Admin Dashboard & Screenshot Management

Navigate to `/admin` in your browser.

- **Default Admin Passcode**: `jaya-portfolio-2026`
- **Features**:
  - Drag and drop screenshots onto any project.
  - Reorder screenshots with arrow controls.
  - Set cover images with one click.
  - Add captions and accessibility alt-text.
  - Edit project titles, summaries, GitHub links, and live demos.
  - Add completely new projects dynamically.
  - Update your admin passcode directly from the **Security** tab.

### Optional: Supabase Cloud Database & Storage Setup

All uploads persist locally out of the box. To connect Supabase for remote cloud hosting across multiple machines:

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in Supabase and run the SQL migration script (found in `/admin` under the **Supabase Cloud** tab, or in `src/lib/supabase.ts`).
3. Copy your **Project URL** and **Anon Key** into `.env`:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Re-run `npm run build` or deploy to your hosting provider.

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Install the Vercel CLI: `npm i -g vercel` or import the GitHub repository in the Vercel dashboard.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. If using Supabase, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Environment Variables.

### Deploy to Netlify
1. Connect the repository in Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Ensure redirects for Single Page Apps (SPA) are set up via a `_redirects` file:
   ```
   /*    /index.html   200
   ```

### Deploy to GitHub Pages
Since the app uses client-side routing, you can deploy using `gh-pages`:
```bash
npm run build
npx gh-pages -d dist
```

---

## 👤 Contact & Author

- **Name**: Jaya Singh (Gautam Jayasingh Ramdevsingh)
- **Role**: AI/ML Developer | Full-Stack Developer | Software Engineer
- **Email**: [jayasingh01134@gmail.com](mailto:jayasingh01134@gmail.com)
- **GitHub**: [@Jayasingh0404](https://github.com/Jayasingh0404)
- **LinkedIn**: [jaya-singh-rajput](https://www.linkedin.com/in/jaya-singh-rajput-921024338/)

