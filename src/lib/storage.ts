import { Project, ProjectImage } from '../types';
import { initialProjects } from '../data/portfolioData';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_PROJECTS_KEY = 'jaya_portfolio_projects_v1';
const STORAGE_ADMIN_SESSION_KEY = 'jaya_portfolio_admin_auth';
const STORAGE_ADMIN_SECRET_KEY = 'jaya_portfolio_admin_secret';

// Default initial password is customizable in admin settings
const DEFAULT_ADMIN_PASSWORD = 'jaya-portfolio-2026';

export const getStoredProjects = async (): Promise<Project[]> => {
  // If Supabase is configured, attempt fetch from cloud database
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: dbProjects, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_images (*)
        `)
        .order('created_at', { ascending: false });

      if (!error && dbProjects && dbProjects.length > 0) {
        // Map Supabase rows to Project interface
        return dbProjects.map((row: any) => ({
          id: row.id,
          title: row.project_name,
          slug: row.slug,
          tagline: row.description || '',
          category: row.category,
          featured: Boolean(row.is_published),
          coverImage: row.featured_image || '',
          images: (row.project_images || []).map((img: any) => ({
            id: img.id,
            projectId: img.project_id,
            imageUrl: img.image_url,
            imageName: img.image_name,
            caption: img.caption,
            altText: img.alt_text,
            displayOrder: img.display_order,
            isCover: Boolean(img.is_cover),
            uploadedAt: img.uploaded_at,
          })),
          overview: row.description || '',
          problemStatement: '',
          solution: '',
          myContribution: [],
          keyFeatures: [],
          technologies: [],
          challengesAndLearnings: [],
          verifiedOutcomes: [],
          githubUrl: row.github_url || '',
          liveDemoUrl: row.demo_url || '',
          isPublished: row.is_published,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        }));
      }
    } catch (err) {
      console.warn('Falling back to local storage after Supabase error:', err);
    }
  }

  // Fallback to local persistent storage
  try {
    const raw = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Project[];
      // Merge with initial projects to guarantee any new initial project fields remain intact
      const merged = initialProjects.map((init) => {
        const found = parsed.find((p) => p.id === init.id);
        if (found) {
          return {
            ...init,
            ...found,
            images: found.images || init.images || [],
            coverImage: found.coverImage || init.coverImage || '',
          };
        }
        return init;
      });

      // Add any custom projects created via admin
      const customOnes = parsed.filter(
        (p) => !initialProjects.some((init) => init.id === p.id)
      );
      return [...merged, ...customOnes];
    }
  } catch (e) {
    console.error('Error loading projects from storage:', e);
  }

  // First time initialization: populate storage with initial projects
  try {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(initialProjects));
  } catch (e) {}

  return initialProjects;
};

export const saveProjects = async (projects: Project[]): Promise<boolean> => {
  try {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
    return false;
  }
  return true;
};

export const uploadProjectImage = async (
  projectId: string,
  file: File,
  caption?: string,
  altText?: string
): Promise<ProjectImage | null> => {
  const imageId = 'img_' + Math.random().toString(36).substring(2, 10);
  const fileExt = file.name.split('.').pop() || 'png';
  const fileName = `${projectId}_${Date.now()}.${fileExt}`;

  let imageUrl = '';

  // 1. If Supabase is available, upload directly to Supabase Storage
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.storage
        .from('project-screenshots')
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from('project-screenshots')
          .getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }
    } catch (e) {
      console.warn('Supabase upload failed, falling back to local storage URL:', e);
    }
  }

  // 2. If no cloud URL, convert to local base64 data URL
  if (!imageUrl) {
    imageUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const newImage: ProjectImage = {
    id: imageId,
    projectId,
    imageUrl,
    imageName: file.name,
    caption: caption || file.name.replace(/\.[^/.]+$/, ''),
    altText: altText || `${projectId} screenshot`,
    displayOrder: 999,
    isCover: false,
    uploadedAt: new Date().toISOString(),
  };

  // Update in stored projects
  const allProjects = await getStoredProjects();
  const updated = allProjects.map((p) => {
    if (p.id === projectId) {
      const existingImages = p.images || [];
      const isFirst = existingImages.length === 0;
      const finalImage = { ...newImage, isCover: isFirst, displayOrder: existingImages.length + 1 };
      return {
        ...p,
        coverImage: isFirst ? finalImage.imageUrl : p.coverImage,
        images: [...existingImages, finalImage],
        updatedAt: new Date().toISOString().split('T')[0],
      };
    }
    return p;
  });

  await saveProjects(updated);
  return newImage;
};

export const deleteProjectImage = async (projectId: string, imageId: string): Promise<boolean> => {
  const allProjects = await getStoredProjects();
  const updated = allProjects.map((p) => {
    if (p.id === projectId) {
      const remainingImages = (p.images || []).filter((img) => img.id !== imageId);
      const wasCover = (p.images || []).find((img) => img.id === imageId)?.isCover;
      let newCover = p.coverImage;
      if (wasCover) {
        newCover = remainingImages.length > 0 ? remainingImages[0].imageUrl : '';
        if (remainingImages.length > 0) {
          remainingImages[0].isCover = true;
        }
      }
      return {
        ...p,
        coverImage: newCover,
        images: remainingImages,
      };
    }
    return p;
  });

  return saveProjects(updated);
};

export const setProjectCoverImage = async (projectId: string, imageId: string): Promise<boolean> => {
  const allProjects = await getStoredProjects();
  const updated = allProjects.map((p) => {
    if (p.id === projectId) {
      let coverUrl = p.coverImage;
      const updatedImages = (p.images || []).map((img) => {
        if (img.id === imageId) {
          coverUrl = img.imageUrl;
          return { ...img, isCover: true };
        }
        return { ...img, isCover: false };
      });
      return {
        ...p,
        coverImage: coverUrl,
        images: updatedImages,
      };
    }
    return p;
  });

  return saveProjects(updated);
};

export const updateImageMetadata = async (
  projectId: string,
  imageId: string,
  caption: string,
  altText: string
): Promise<boolean> => {
  const allProjects = await getStoredProjects();
  const updated = allProjects.map((p) => {
    if (p.id === projectId) {
      return {
        ...p,
        images: (p.images || []).map((img) =>
          img.id === imageId ? { ...img, caption, altText } : img
        ),
      };
    }
    return p;
  });

  return saveProjects(updated);
};

// Admin Session Management
export const verifyAdminSession = (): boolean => {
  try {
    const session = sessionStorage.getItem(STORAGE_ADMIN_SESSION_KEY);
    return session === 'authenticated_active';
  } catch {
    return false;
  }
};

export const loginAdmin = (password: string): boolean => {
  const storedSecret = localStorage.getItem(STORAGE_ADMIN_SECRET_KEY) || DEFAULT_ADMIN_PASSWORD;
  if (password.trim() === storedSecret.trim()) {
    sessionStorage.setItem(STORAGE_ADMIN_SESSION_KEY, 'authenticated_active');
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  sessionStorage.removeItem(STORAGE_ADMIN_SESSION_KEY);
};

export const updateAdminPassword = (newPassword: string): void => {
  localStorage.setItem(STORAGE_ADMIN_SECRET_KEY, newPassword);
};

