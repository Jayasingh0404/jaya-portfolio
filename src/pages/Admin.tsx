import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Shield,
  Lock,
  LogOut,
  UploadCloud,
  Trash2,
  Star,
  CheckCircle2,
  AlertCircle,
  Eye,
  Plus,
  ArrowLeft,
  MoveUp,
  MoveDown,
  Layers,
  Database,
  ExternalLink,
  Save,
  Key,
  Copy,
  Check,
} from 'lucide-react';
import { Project, ProjectImage } from '../types';
import {
  getStoredProjects,
  saveProjects,
  uploadProjectImage,
  deleteProjectImage,
  setProjectCoverImage,
  updateImageMetadata,
  verifyAdminSession,
  loginAdmin,
  logoutAdmin,
  updateAdminPassword,
} from '../lib/storage';
import { isSupabaseConfigured, SUPABASE_SETUP_SQL } from '../lib/supabase';

export const Admin: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'screenshots' | 'edit-project' | 'new-project' | 'supabase' | 'security'>('screenshots');

  // Upload state
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadCaption, setUploadCaption] = useState<string>('');
  const [uploadAltText, setUploadAltText] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Edit Project State
  const [editFormData, setEditFormData] = useState<Partial<Project>>({});

  // New Project State
  const [newProjectData, setNewProjectData] = useState({
    title: '',
    slug: '',
    tagline: '',
    category: 'Full-Stack Development' as Project['category'],
    githubUrl: '',
    liveDemoUrl: '',
    overview: '',
  });

  // Password update state
  const [newPasswordInput, setNewPasswordInput] = useState<string>('');
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check existing session
  useEffect(() => {
    const auth = verifyAdminSession();
    setIsAuthenticated(auth);
    if (auth) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    const data = await getStoredProjects();
    setProjects(data);

    // If URL has ?project=..., select it; otherwise default to first project
    const requestedProject = searchParams.get('project');
    if (requestedProject && data.some((p) => p.id === requestedProject)) {
      setSelectedProjectId(requestedProject);
    } else if (data.length > 0 && !selectedProjectId) {
      setSelectedProjectId(data[0].id);
    }
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  useEffect(() => {
    if (selectedProject) {
      setEditFormData({ ...selectedProject });
    }
  }, [selectedProjectId, projects]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setIsAuthenticated(true);
      setAuthError('');
      loadData();
    } else {
      setAuthError('Incorrect passcode. (Default: jaya-portfolio-2026)');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  // Drag and Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const valid = files.filter((f) =>
      ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(f.type)
    );
    if (valid.length === 0) {
      setStatusMessage({ type: 'error', text: 'Please select valid images (PNG, JPG, JPEG, WebP).' });
      return;
    }

    setSelectedFiles(valid);

    // Generate previews
    const previews: string[] = [];
    valid.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          previews.push(e.target.result as string);
          if (previews.length === valid.length) {
            setFilePreviews([...previews]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleExecuteUpload = async () => {
    if (!selectedProject || selectedFiles.length === 0) return;

    setIsUploading(true);
    setStatusMessage(null);

    try {
      for (const file of selectedFiles) {
        await uploadProjectImage(
          selectedProject.id,
          file,
          uploadCaption || file.name.replace(/\.[^/.]+$/, ''),
          uploadAltText || `${selectedProject.title} screenshot`
        );
      }

      await loadData();
      setSelectedFiles([]);
      setFilePreviews([]);
      setUploadCaption('');
      setUploadAltText('');
      setStatusMessage({
        type: 'success',
        text: `Successfully uploaded ${selectedFiles.length} screenshot(s) to ${selectedProject.title}!`,
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Upload failed: ${err.message || 'Unknown error occurred'}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!selectedProject) return;
    if (confirm('Are you sure you want to delete this screenshot?')) {
      await deleteProjectImage(selectedProject.id, imageId);
      await loadData();
      setStatusMessage({ type: 'success', text: 'Screenshot removed successfully.' });
    }
  };

  const handleSetCover = async (imageId: string) => {
    if (!selectedProject) return;
    await setProjectCoverImage(selectedProject.id, imageId);
    await loadData();
    setStatusMessage({ type: 'success', text: 'Cover image updated successfully.' });
  };

  const handleReorderImage = async (index: number, direction: 'up' | 'down') => {
    if (!selectedProject) return;
    const images = [...selectedProject.images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= images.length) return;

    const temp = images[index];
    images[index] = images[targetIndex];
    images[targetIndex] = temp;

    const updated = projects.map((p) =>
      p.id === selectedProject.id ? { ...p, images } : p
    );

    await saveProjects(updated);
    await loadData();
  };

  const handleSaveProjectEdits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const updated = projects.map((p) =>
      p.id === selectedProject.id ? { ...p, ...editFormData, updatedAt: new Date().toISOString().split('T')[0] } : p
    );

    await saveProjects(updated as Project[]);
    await loadData();
    setStatusMessage({ type: 'success', text: 'Project metadata saved successfully.' });
  };

  const handleCreateNewProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectData.title.trim()) return;

    const slug =
      newProjectData.slug.trim() ||
      newProjectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newProj: Project = {
      id: 'proj_' + Math.random().toString(36).substring(2, 9),
      title: newProjectData.title,
      slug,
      tagline: newProjectData.tagline,
      category: newProjectData.category,
      featured: false,
      coverImage: '',
      images: [],
      overview: newProjectData.overview || newProjectData.tagline,
      problemStatement: '',
      solution: '',
      myContribution: [],
      keyFeatures: [],
      technologies: [],
      challengesAndLearnings: [],
      verifiedOutcomes: [],
      githubUrl: newProjectData.githubUrl,
      liveDemoUrl: newProjectData.liveDemoUrl,
      isPublished: true,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    const updated = [newProj, ...projects];
    await saveProjects(updated);
    await loadData();
    setSelectedProjectId(newProj.id);
    setActiveTab('screenshots');
    setStatusMessage({ type: 'success', text: `Project "${newProj.title}" created successfully!` });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordInput.trim().length >= 6) {
      updateAdminPassword(newPasswordInput.trim());
      setNewPasswordInput('');
      setStatusMessage({ type: 'success', text: 'Admin passcode updated successfully.' });
    } else {
      setStatusMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
    }
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // If not authenticated, render login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#090d16] text-white">
        <div className="w-full max-w-md rounded-2xl p-8 bg-[#0e1628] border border-white/10 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold">Admin Portal</h1>
            <p className="text-xs text-slate-400 mt-1">
              Authenticate to manage project screenshots, galleries, and portfolio content.
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin passcode"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 font-mono">
                Default: <code className="text-indigo-400">jaya-portfolio-2026</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-600/20"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard
  const totalScreenshots = projects.reduce((acc, p) => acc + (p.images?.length || 0), 0);
  const publishedProjects = projects.filter((p) => p.isPublished).length;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      {/* Top Admin Nav */}
      <header className="border-b border-white/10 bg-[#0c1322] sticky top-0 z-40 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            title="View Public Portfolio"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="font-bold text-sm text-white tracking-tight">
              Portfolio Studio & CMS
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hidden sm:inline-block">
            {isSupabaseConfigured ? 'Supabase Cloud Connected' : 'Persistent Storage Active'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/project/${selectedProject?.slug}`}
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Project</span>
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-grow p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {/* KPI Statistics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[#0e1628] border border-white/10">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">Total Managed Projects</span>
            <p className="text-2xl font-bold text-white">{projects.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0e1628] border border-white/10">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">Published Online</span>
            <p className="text-2xl font-bold text-emerald-400">{publishedProjects}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0e1628] border border-white/10">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">Uploaded Screenshots</span>
            <p className="text-2xl font-bold text-cyan-400">{totalScreenshots}</p>
          </div>
        </div>

        {/* Global Toast Status Message */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs flex items-center justify-between gap-3 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border border-red-500/30 text-red-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Project Selector & Actions Bar */}
        <div className="rounded-2xl bg-[#0e1628] border border-white/10 p-4 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-xs font-mono text-slate-400 flex-shrink-0">
              Select Active Project:
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#111a2e] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.images?.length || 0} images)
                </option>
              ))}
            </select>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-[#111a2e] p-1 rounded-xl text-xs font-mono">
            <button
              onClick={() => setActiveTab('screenshots')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'screenshots'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Screenshots ({selectedProject?.images?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('edit-project')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'edit-project'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Edit Project Info
            </button>
            <button
              onClick={() => setActiveTab('new-project')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'new-project'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              + Add Project
            </button>
            <button
              onClick={() => setActiveTab('supabase')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'supabase'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Supabase Cloud
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'security'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Security
            </button>
          </div>
        </div>

        {/* TAB 1: Screenshots & Gallery Manager */}
        {activeTab === 'screenshots' && selectedProject && (
          <div className="space-y-8">
            
            {/* Drag and Drop Upload Card */}
            <div className="rounded-2xl bg-[#0e1628] border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <UploadCloud className="w-5 h-5 text-indigo-400" />
                    <span>Upload Screenshots for {selectedProject.title}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Drag and drop or select PNG, JPG, JPEG, and WebP images. They persist immediately.
                  </p>
                </div>
              </div>

              {/* Dropzone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  dragActive
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-white/15 bg-white/[0.01] hover:bg-white/[0.03]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 mb-3">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-white">
                    Click to browse or drag and drop screenshots here
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports PNG, JPG, JPEG, WebP • Auto-optimizes on upload
                  </p>
                </div>
              </div>

              {/* Selected Files Preview & Metadata Form */}
              {selectedFiles.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                    Selected Files ({selectedFiles.length}):
                  </h4>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {filePreviews.map((src, i) => (
                      <div
                        key={i}
                        className="relative w-24 h-16 rounded-lg overflow-hidden border border-white/20 bg-slate-900"
                      >
                        <img src={src} alt="Preview" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 text-[9px] font-mono px-1 rounded bg-black/70 text-white">
                          #{i + 1}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Caption (Optional)
                      </label>
                      <input
                        type="text"
                        value={uploadCaption}
                        onChange={(e) => setUploadCaption(e.target.value)}
                        placeholder="e.g., Forward B2B Auction Dashboard"
                        className="w-full px-3 py-2 rounded-lg bg-[#111a2e] border border-white/10 text-xs text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Alt Text (Accessibility)
                      </label>
                      <input
                        type="text"
                        value={uploadAltText}
                        onChange={(e) => setUploadAltText(e.target.value)}
                        placeholder="e.g., Screenshot of reverse bidding matrix"
                        className="w-full px-3 py-2 rounded-lg bg-[#111a2e] border border-white/10 text-xs text-white placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFiles([]);
                        setFilePreviews([]);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 text-xs text-slate-400 hover:text-white"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={handleExecuteUpload}
                      className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md disabled:opacity-50 flex items-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Publishing...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>Save & Publish Screenshots</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Current Gallery Management */}
            <div className="rounded-2xl bg-[#0e1628] border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  <span>Current Project Gallery ({selectedProject.images.length})</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Drag / reorder / set cover
                </span>
              </div>

              {selectedProject.images.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-white/10 rounded-xl">
                  <p className="text-xs text-slate-400">
                    No screenshots currently uploaded for this project.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedProject.images.map((img, idx) => (
                    <div
                      key={img.id}
                      className="rounded-xl bg-[#111a2e] border border-white/10 overflow-hidden flex flex-col justify-between"
                    >
                      <div className="relative aspect-video w-full bg-slate-900">
                        <img
                          src={img.imageUrl}
                          alt={img.altText || img.caption}
                          className="w-full h-full object-cover"
                        />
                        {img.isCover && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-500 text-black text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                            <Star className="w-3 h-3 fill-black" />
                            COVER IMAGE
                          </span>
                        )}
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[10px]">
                          #{idx + 1}
                        </span>
                      </div>

                      <div className="p-3">
                        <p className="text-xs font-semibold text-white truncate">
                          {img.caption || img.imageName}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          Alt: {img.altText || 'None'}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="px-3 pb-3 pt-2 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            disabled={idx === 0}
                            onClick={() => handleReorderImage(idx, 'up')}
                            className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20"
                            title="Move Up"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={idx === selectedProject.images.length - 1}
                            onClick={() => handleReorderImage(idx, 'down')}
                            className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20"
                            title="Move Down"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          {!img.isCover && (
                            <button
                              onClick={() => handleSetCover(img.id)}
                              className="text-[11px] font-mono text-amber-400 hover:underline flex items-center gap-1"
                            >
                              <Star className="w-3 h-3" />
                              <span>Set Cover</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteImage(img.id)}
                            className="p-1.5 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                            title="Delete image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: Edit Project Information */}
        {activeTab === 'edit-project' && selectedProject && (
          <div className="rounded-2xl bg-[#0e1628] border border-white/10 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-6">
              Edit Project: {selectedProject.title}
            </h3>

            <form onSubmit={handleSaveProjectEdits} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={editFormData.title || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Slug / URL Path
                  </label>
                  <input
                    type="text"
                    value={editFormData.slug || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Tagline / Short Summary
                </label>
                <input
                  type="text"
                  value={editFormData.tagline || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={editFormData.githubUrl || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={editFormData.liveDemoUrl || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, liveDemoUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Overview
                </label>
                <textarea
                  rows={4}
                  value={editFormData.overview || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, overview: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                  <input
                    type="checkbox"
                    checked={editFormData.isPublished ?? true}
                    onChange={(e) => setEditFormData({ ...editFormData, isPublished: e.target.checked })}
                    className="rounded bg-[#111a2e] border-white/10 text-indigo-600 focus:ring-0"
                  />
                  <span>Published on public portfolio</span>
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Project Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: Add New Project */}
        {activeTab === 'new-project' && (
          <div className="rounded-2xl bg-[#0e1628] border border-white/10 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-2">
              Add New Project to Portfolio
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Create a new case study entry. You can immediately upload screenshots for it right afterwards.
            </p>

            <form onSubmit={handleCreateNewProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProjectData.title}
                    onChange={(e) => setNewProjectData({ ...newProjectData, title: e.target.value })}
                    placeholder="e.g., IntelliView Orchestrator"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Domain / Category
                  </label>
                  <select
                    value={newProjectData.category}
                    onChange={(e) => setNewProjectData({ ...newProjectData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white"
                  >
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Full-Stack Development">Full-Stack Development</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={newProjectData.tagline}
                  onChange={(e) => setNewProjectData({ ...newProjectData, tagline: e.target.value })}
                  placeholder="One sentence description of the product"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={newProjectData.githubUrl}
                    onChange={(e) => setNewProjectData({ ...newProjectData, githubUrl: e.target.value })}
                    placeholder="https://github.com/Jayasingh0404/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={newProjectData.liveDemoUrl}
                    onChange={(e) => setNewProjectData({ ...newProjectData, liveDemoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Overview
                </label>
                <textarea
                  rows={3}
                  value={newProjectData.overview}
                  onChange={(e) => setNewProjectData({ ...newProjectData, overview: e.target.value })}
                  placeholder="Comprehensive description of the application..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Project</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: Supabase Cloud Setup */}
        {activeTab === 'supabase' && (
          <div className="rounded-2xl bg-[#0e1628] border border-white/10 p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <span>Supabase Cloud Integration & Storage</span>
                </h3>
                <span className={`text-xs font-mono px-2.5 py-1 rounded ${
                  isSupabaseConfigured ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {isSupabaseConfigured ? 'Cloud Active' : 'Local Storage Mode'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                By default, all uploaded screenshots and project modifications are stored persistently in browser storage so the website works immediately. To connect Supabase for remote multi-device cloud storage, follow the 2 steps below:
              </p>
            </div>

            {/* Step 1: SQL Editor */}
            <div className="p-4 rounded-xl bg-[#111a2e] border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-white">
                  Step 1: Execute SQL in Supabase Dashboard
                </span>
                <button
                  onClick={copySqlToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-slate-200 transition-colors"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Script'}</span>
                </button>
              </div>

              <pre className="p-3 rounded-lg bg-black/50 text-[11px] font-mono text-indigo-300 overflow-x-auto max-h-48">
                <code>{SUPABASE_SETUP_SQL}</code>
              </pre>
            </div>

            {/* Step 2: Environment Variables */}
            <div className="p-4 rounded-xl bg-[#111a2e] border border-white/10">
              <span className="text-xs font-mono font-bold text-white block mb-2">
                Step 2: Add credentials to your .env or deployment host
              </span>
              <pre className="p-3 rounded-lg bg-black/50 text-[11px] font-mono text-slate-300">
                <code>{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 5: Security Settings */}
        {activeTab === 'security' && (
          <div className="rounded-2xl bg-[#0e1628] border border-white/10 p-6 sm:p-8 max-w-xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Key className="w-5 h-5 text-indigo-400" />
              <span>Change Admin Passcode</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Update the passcode required to access the /admin portal.
            </p>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  New Passcode (min 6 characters)
                </label>
                <input
                  type="password"
                  required
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Enter new secret passcode"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111a2e] border border-white/10 text-sm text-white"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
              >
                Update Passcode
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};

