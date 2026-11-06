import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase environment variables if configured
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && 
  SUPABASE_ANON_KEY && 
  SUPABASE_URL !== 'https://your-project.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/**
 * SQL Schema migration script for user to execute in Supabase SQL editor:
 */
export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor to initialize tables and storage bucket:

-- 1. Create Projects Table
create table if not exists public.projects (
  id text primary key,
  project_name text not null,
  slug text not null unique,
  description text,
  category text not null,
  github_url text,
  demo_url text,
  featured_image text,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Project Images Table
create table if not exists public.project_images (
  id text primary key,
  project_id text references public.projects(id) on delete cascade,
  image_url text not null,
  image_name text not null,
  caption text,
  alt_text text,
  display_order integer default 0,
  is_cover boolean default false,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS)
alter table public.projects enable row level security;
alter table public.project_images enable row level security;

-- Public can read published projects and images
create policy "Public can view published projects"
  on public.projects for select
  using (is_published = true);

create policy "Public can view project images"
  on public.project_images for select
  using (true);

-- Authenticated admin can perform all operations
create policy "Authenticated admin can modify projects"
  on public.projects for all
  using (auth.role() = 'authenticated');

create policy "Authenticated admin can modify images"
  on public.project_images for all
  using (auth.role() = 'authenticated');

-- 4. Create Storage Bucket for Screenshots
insert into storage.buckets (id, name, public)
values ('project-screenshots', 'project-screenshots', true)
on conflict (id) do nothing;

create policy "Public can read project screenshots"
  on storage.objects for select
  using (bucket_id = 'project-screenshots');

create policy "Authenticated users can upload screenshots"
  on storage.objects for insert
  with check (bucket_id = 'project-screenshots' and auth.role() = 'authenticated');
`;

